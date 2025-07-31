# Roman Numerals Converter Frontend

Frontend for converting an integer between 1 and 3,999 to its Roman numeral equivalent. It is intended to interact with a
NestJS backend, which should be in a sibling of this directory. More details may be found in the main `README.md`
located in the parent of this directory.

## Running the project

First, run `npm install`.

From the root of the project, you can get the project running with `npm run dev`, which will launch the vite server
and make it available at http://localhost:5173.

## Development

Other development tools can be found in the `package.json` file's `scripts` field. Some of the interesting ones are:

```bash
# Build the project but don't run it
npm run build

# Run the development version, which updates as changes are made to the files
npm run dev

# Run the linter
npm run lint

# Run unit tests
npm run test

# Preview the production version
npm run preview
```

### E2E Tests

This project contains some [Playwright](https://playwright.dev/) E2E tests that are configured to run against the docker
container on port 8080. You will need to start the container as described in the main README (parent directory). Once it
is up and running, you can execute the tests by running

```bash
npx playwright test
# or
npm run test:e2e
```

The tests are located in `tests/e2e.spec.ts`. For help setting up playwright, please refer to their documentation.
