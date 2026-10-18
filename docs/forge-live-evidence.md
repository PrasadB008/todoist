# Forge live helper-test evidence

A short guide to running the helper tests in this repository and where they live.

## Helper-test command

The repository has no dedicated helper-test script. The helper tests run through the existing `test` script in `package.json` (`react-scripts test --watchAll`), filtered by file name:

```sh
yarn test helpers
```

This runs the Jest suite in watch mode and matches `src/__tests__/helpers.spec.js`. For a single non-interactive run, such as in CI, pass `--watchAll=false`:

```sh
CI=true yarn test helpers --watchAll=false
```

Install dependencies first with `yarn install --frozen-lockfile` (the repository uses `yarn.lock`).

## Where the helper tests live

- Tests: `src/__tests__/helpers.spec.js`
- Code under test: `src/helpers/index.js`

All other test files are in the same `src/__tests__/` directory.

## Evidence log

- Initial Forge documentation change.

External GitHub edit marker: LIVE-101-REMOTE-COMMIT.
