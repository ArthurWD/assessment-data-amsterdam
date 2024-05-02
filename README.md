# Technical assessment

[![codecov](https://codecov.io/gh/ArthurWD/assessment-data-amsterdam/graph/badge.svg?token=BRKT4NI3IA)](https://codecov.io/gh/ArthurWD/assessment-data-amsterdam)

[See live demo](https://assessment-data-amsterdam.onrender.com)

## Features

- Shows a list of districts on the homepage.
- Shows details of a district on /stadsdeel/:identifier.
- Shows details of a quarter on /wijk/:identifier.
- Data is fetched from https://api.data.amsterdam.nl/v1/gebieden.
- Data is stored in a context, so it doesn't have to be refetched when remounting a component.
- A basic router enables navigation without triggering a full page reload, so the data in the context stays available (except when clicking the logo in the navbar, I couldn't override that behaviour).
- Uses no external dependencies, except for the packages of @amsterdam, linters, tests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm lint`

Runs Typescript check, ESLint and Prettier to check if the code is formatted correctly.
