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

- Install dependencies first. The repo tracks `yarn.lock` (there is no `package-lock.json`), so use `yarn install --frozen-lockfile`.
- Setting `CI=true` in the environment also disables watch mode in `react-scripts`. The explicit `--watchAll=false` flag works either way.
- No new script or config was added. This is the existing test script with extra arguments.
- The command was first documented from reading `package.json`; it was run later, see "Recheck result" below.

## Recheck result

LIVE-19EAA67: helper recheck completed.

Command (run with `CI=true`): `npm test -- --watchAll=false --coverage=false src/__tests__/helpers.spec.js` — exit code 0.

Forge prepared dependencies automatically before the first run. Its note began: "Installed dependencies with yarn install --frozen-lockfile --ignore-scripts (yarn.lock)." The rest of that note is not quoted here because it was not kept. The probes below show that `src/firebase.js` was created by that preparation and is gitignored.

Config probes:

- Before the run: `test -e src/firebase.js` exited 1 (missing).
- After the run: `test -e src/firebase.js` exited 0 (present); `git check-ignore src/firebase.js` exited 0 and printed `src/firebase.js` (ignored); `git status --short` exited 0 with empty output.

Runner summary:

Latest run (second run, dependencies already prepared, exit code 0):

```
PASS src/__tests__/helpers.spec.js
Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        0.977s, estimated 2s
Ran all test suites matching /src\/__tests__\/helpers.spec.js/i.
```
