# Roman Numerals Converter Backend

Backend for converting an integer between 1 and 3,999 into Roman numerals. It is intended to work with a frontend which
is a sibling to this directory.

## Details
Once the project has been started (see below), it will be available at http://localhost:3000/romannumeral. The project is set up
to provide the frontend at http://localhost:3000/; see the main `README.md` in the parent of this directory for more details.

The service provides a health check endpoint at `/health` which responds with 200 and `OK` in the body.

The `/romannumeral` endpoint expects exactly one query parameter, `query`, which accepts a number between 1 and 3,999. Failing to
include the parameter, leaving it empty, or including something other than a number in the stated range will result in a 400 Bad Request.

The response to a successful `/romannumeral` query with example `query` value of `123` is of the form below, where input is the same
as the value provided in the `query` parameter and output is the Roman numeral equivalent.

```json
{
    "input": "123",
    "output": "CXXIII"
}
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
