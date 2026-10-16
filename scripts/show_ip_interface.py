#!/usr/bin/env python3
"""Automate "show ip interface" on one or more switches.

Connects over SSH with Netmiko (``pip install netmiko``), runs
``show ip interface`` (or ``show ip interface brief``), parses the output and
prints it as a table, JSON or CSV.

Examples:
    # One switch, password prompted interactively
    python scripts/show_ip_interface.py -H 10.0.0.1 -u admin

    # Several switches, JSON output, password from environment
    SWITCH_PASSWORD=secret python scripts/show_ip_interface.py \
        -H 10.0.0.1 10.0.0.2 -u admin --format json

    # Only one interface
    python scripts/show_ip_interface.py -H 10.0.0.1 -u admin -i Vlan10

    # Parse a saved output file (no connection needed)
    python scripts/show_ip_interface.py --input-file output.txt

The password is never taken from the command line; it is read from the
SWITCH_PASSWORD (and SWITCH_ENABLE_SECRET) environment variables or prompted.
"""

import argparse
import csv
import getpass
import io
import json
import os
import re
import sys

COMMAND = "show ip interface"

_HEADER_RE = re.compile(
    r"^(?P<name>\S+) is (?P<status>[^,]+), line protocol is (?P<protocol>\S+)"
)
_ADDRESS_RE = re.compile(
    r"Internet address is (?P<ip>\d+\.\d+\.\d+\.\d+)/(?P<mask>\d+)"
)
_ADDRESS_NOMASK_RE = re.compile(r"Internet address is (?P<ip>\d+\.\d+\.\d+\.\d+)\b")
_MTU_RE = re.compile(r"MTU is (?P<mtu>\d+) bytes")
_HELPER_RE = re.compile(r"Helper address is (?P<helper>.+)")
_ACL_IN_RE = re.compile(r"Inbound\s+access list is (?P<acl>.+)")
_ACL_OUT_RE = re.compile(r"Outgoing\s+access list is (?P<acl>.+)")
_PROXY_RE = re.compile(r"Proxy ARP is (?P<v>\w+)")
_DIRECTED_RE = re.compile(r"Directed broadcast forwarding is (?P<v>\w+)")


def parse_show_ip_interface(text):
    """Parse IOS-style ``show ip interface`` output into a list of dicts."""
    interfaces = []
    current = None
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        header = _HEADER_RE.match(line)
        if header and not raw[:1].isspace():
            current = {
                "interface": header.group("name"),
                "status": header.group("status").strip(),
                "protocol": header.group("protocol").strip(","),
                "ip_address": None,
                "prefix_length": None,
                "mtu": None,
                "helper_address": None,
                "inbound_acl": None,
                "outbound_acl": None,
                "proxy_arp": None,
                "directed_broadcast": None,
            }
            interfaces.append(current)
            continue
        if current is None:
            continue
        if "Internet protocol processing disabled" in line:
            current["ip_address"] = "disabled"
            continue
        match = _ADDRESS_RE.search(line)
        if match:
            current["ip_address"] = match.group("ip")
            current["prefix_length"] = int(match.group("mask"))
            continue
        match = _ADDRESS_NOMASK_RE.search(line)
        if match:
            current["ip_address"] = match.group("ip")
            continue
        for regex, key, group in (
            (_MTU_RE, "mtu", "mtu"),
            (_HELPER_RE, "helper_address", "helper"),
            (_ACL_IN_RE, "inbound_acl", "acl"),
            (_ACL_OUT_RE, "outbound_acl", "acl"),
            (_PROXY_RE, "proxy_arp", "v"),
            (_DIRECTED_RE, "directed_broadcast", "v"),
        ):
            match = regex.search(line)
            if match:
                value = match.group(group).strip()
                current[key] = int(value) if key == "mtu" else value
                break
    return interfaces


def filter_interfaces(interfaces, name):
    """Keep interfaces whose name equals ``name`` (case-insensitive)."""
    if not name:
        return interfaces
    wanted = name.lower()
    return [i for i in interfaces if i["interface"].lower() == wanted]


COLUMNS = [
    "interface",
    "status",
    "protocol",
    "ip_address",
    "prefix_length",
    "mtu",
    "inbound_acl",
    "outbound_acl",
]


def format_table(interfaces):
    rows = [[("" if i.get(c) is None else str(i.get(c))) for c in COLUMNS] for i in interfaces]
    widths = [max(len(c), *(len(r[n]) for r in rows)) if rows else len(c) for n, c in enumerate(COLUMNS)]
    lines = ["  ".join(c.upper().ljust(w) for c, w in zip(COLUMNS, widths))]
    lines += ["  ".join(v.ljust(w) for v, w in zip(r, widths)).rstrip() for r in rows]
    return "\n".join(lines)


def format_csv(interfaces):
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=COLUMNS, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(interfaces)
    return buf.getvalue().rstrip("\n")


def run_command(host, username, password, secret, device_type, command, port, timeout):
    """Log in to a switch over SSH and return the command output."""
    try:
        from netmiko import ConnectHandler
    except ImportError:
        raise SystemExit("netmiko is required for live connections: pip install netmiko")
    params = {
        "device_type": device_type,
        "host": host,
        "username": username,
        "password": password,
        "port": port,
        "timeout": timeout,
    }
    if secret:
        params["secret"] = secret
    with ConnectHandler(**params) as conn:
        if secret:
            conn.enable()
        return conn.send_command(command)


def build_parser():
    p = argparse.ArgumentParser(description="Run 'show ip interface' on switches.")
    p.add_argument("-H", "--host", nargs="+", help="switch hostname(s) or IP(s)")
    p.add_argument("-u", "--username", help="SSH username")
    p.add_argument("-p", "--port", type=int, default=22)
    p.add_argument("-d", "--device-type", default="cisco_ios", help="Netmiko device type (default: cisco_ios)")
    p.add_argument("-i", "--interface", help="only show this interface, e.g. Vlan10")
    p.add_argument("--brief", action="store_true", help="run 'show ip interface brief' and print it raw")
    p.add_argument("--raw", action="store_true", help="print raw device output instead of parsing")
    p.add_argument("-f", "--format", choices=["table", "json", "csv"], default="table")
    p.add_argument("--timeout", type=int, default=30, help="connection timeout in seconds")
    p.add_argument("--input-file", help="parse this saved output instead of connecting")
    return p


def main(argv=None):
    args = build_parser().parse_args(argv)
    outputs = {}  # host -> raw text

    if args.input_file:
        with open(args.input_file, encoding="utf-8") as fh:
            outputs[args.input_file] = fh.read()
    else:
        if not args.host or not args.username:
            print("error: --host and --username are required (or use --input-file)", file=sys.stderr)
            return 2
        password = os.environ.get("SWITCH_PASSWORD") or getpass.getpass("SSH password: ")
        secret = os.environ.get("SWITCH_ENABLE_SECRET")
        command = COMMAND + (" brief" if args.brief else "")
        for host in args.host:
            try:
                outputs[host] = run_command(
                    host, args.username, password, secret,
                    args.device_type, command, args.port, args.timeout,
                )
            except Exception as exc:  # report and continue with other switches
                print(f"{host}: connection failed: {exc}", file=sys.stderr)
                outputs[host] = None

    failures = sum(1 for v in outputs.values() if v is None)
    results = {}
    for host, text in outputs.items():
        if text is None:
            continue
        if args.raw or args.brief:
            results[host] = text
        else:
            results[host] = filter_interfaces(parse_show_ip_interface(text), args.interface)

    if args.format == "json":
        print(json.dumps(results, indent=2))
    else:
        for host, data in results.items():
            print(f"=== {host} ===")
            if isinstance(data, str):
                print(data)
            elif args.format == "csv":
                print(format_csv(data))
            else:
                print(format_table(data))
            print()
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
