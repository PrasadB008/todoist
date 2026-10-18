# Forge targeted recheck

How to rerun only the helper spec, `src/__tests__/helpers.spec.js`, without watch mode and without coverage.

## Command

```sh
npm test -- --watchAll=false --coverage=false src/__tests__/helpers.spec.js
```

## What each part does

- `npm test` runs the `test` script from `package.json`: `react-scripts test --watchAll`.
- `--watchAll=false` turns off watch mode, so the run is noninteractive and exits when finished.
- `--coverage=false` skips coverage. The `jest` config in `package.json` sets a 90% global coverage threshold. A single-file run would otherwise be measured against that threshold.
- `src/__tests__/helpers.spec.js` limits Jest to that one spec file.

## Notes

- Install dependencies first (`npm ci`, since the repo uses `package-lock.json`).
- Setting `CI=true` in the environment also disables watch mode in `react-scripts`. The explicit `--watchAll=false` flag works either way.
- No new script or config was added. This is the existing test script with extra arguments.
- This command was documented from reading `package.json`. It has not been run as part of this change.

## Recheck result

LIVE-19EAA67: helper recheck completed.

Command (run with `CI=true`): `npm test -- --watchAll=false --coverage=false src/__tests__/helpers.spec.js` — exit code 0.

Forge prepared dependencies automatically before the run: "Installed dependencies with yarn install --frozen-lockfile --ignore-scripts (yarn.lock). The first install failed building native code, so it ran again with --ignore-scripts: native build of node-sass, node-gyp skipped; tests that need it can't run. Copied src/firebase.js.example to src/firebase.js inside the sandbox only (gitignored, never committed)."

Config probes:

- Before the run: `test -e src/firebase.js` exited 1 (missing).
- After the run: `test -e src/firebase.js` exited 0 (present); `git check-ignore src/firebase.js` exited 0 and printed `src/firebase.js` (ignored); `git status --short` exited 0 with empty output.

Runner summary:

```
PASS src/__tests__/helpers.spec.js
Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2.869s
Ran all test suites matching /src\/__tests__\/helpers.spec.js/i.
```
