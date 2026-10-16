import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
import show_ip_interface as s  # noqa: E402

SAMPLE = """Vlan1 is up, line protocol is up
  Internet address is 192.168.1.2/24
  Broadcast address is 255.255.255.255
  MTU is 1500 bytes
  Helper address is 10.0.0.5
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is MGMT
  Proxy ARP is enabled
GigabitEthernet0/1 is down, line protocol is down
  Internet protocol processing disabled
Vlan10 is administratively down, line protocol is down
  Internet address is 10.10.10.1/24
  MTU is 1500 bytes
"""


class ParseTests(unittest.TestCase):
    def test_parse(self):
        r = s.parse_show_ip_interface(SAMPLE)
        self.assertEqual([i["interface"] for i in r], ["Vlan1", "GigabitEthernet0/1", "Vlan10"])
        self.assertEqual(r[0]["ip_address"], "192.168.1.2")
        self.assertEqual(r[0]["prefix_length"], 24)
        self.assertEqual(r[0]["mtu"], 1500)
        self.assertEqual(r[0]["inbound_acl"], "MGMT")
        self.assertEqual(r[0]["outbound_acl"], "not set")
        self.assertEqual(r[0]["helper_address"], "10.0.0.5")
        self.assertEqual(r[1]["ip_address"], "disabled")
        self.assertEqual(r[2]["status"], "administratively down")

    def test_filter_and_format(self):
        r = s.filter_interfaces(s.parse_show_ip_interface(SAMPLE), "vlan10")
        self.assertEqual(len(r), 1)
        self.assertIn("10.10.10.1", s.format_table(r))
        self.assertTrue(s.format_csv(r).startswith("interface,"))

    def test_main_input_file(self):
        import tempfile
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
            f.write(SAMPLE)
        try:
            self.assertEqual(s.main(["--input-file", f.name, "-f", "json"]), 0)
        finally:
            os.unlink(f.name)

    def test_missing_args(self):
        self.assertEqual(s.main([]), 2)


if __name__ == "__main__":
    unittest.main()
