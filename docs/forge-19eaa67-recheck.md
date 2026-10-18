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
