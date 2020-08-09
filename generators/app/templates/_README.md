# <%= appName %>

<% if (includeCI) { %>[![Build Status][build-status-image]][build-status-url]<% } %><% if (includeFunctionsTests) { %>
[![Code Coverage][coverage-image]][coverage-url]<% } %>
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Table of Contents

1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
   1. [Routing](#routing)<% if (includeComponentTests || includeUiTests) { %>
1. [Testing](#testing)<% } %>
1. [Configuration](#configuration)
1. [Production](#production)
1. [Deployment](#deployment)

## Requirements

- node `^12.18.0`
- npm `^6.0.0`

## Getting Started

1. Install app and functions dependencies: <% if (useYarn) { %>`npm i && npm i --prefix functions`<% } else { %>`yarn install && yarn install --cwd functions`<% } %>
1. Create `.env.local` file that looks like so if it does not already exist:

   ```shell
    # Needed to skip warnings from jest@beta in package.json
    SKIP_PREFLIGHT_CHECK=true

    FIREBASE_PROJECT_ID="<- projectId from Firebase Console ->"
    FIREBASE_API_KEY="<- apiKey from Firebase Console ->"

    # App environment
    REACT_APP_FIREBASE_apiKey=$FIREBASE_API_KEY
    REACT_APP_FIREBASE_authDomain="<- authdomain from Firebase Console ->"
    REACT_APP_FIREBASE_databaseURL="<- databaseURL from Firebase Console ->"
    REACT_APP_FIREBASE_projectId=$FIREBASE_PROJECT_ID
    REACT_APP_FIREBASE_storageBucket="<- storageBucket from Firebase Console ->"<% if(messagingSenderId) { %>
    REACT_APP_FIREBASE_messagingSenderId="<- messagingSenderId from Firebase Console ->"<% } %><% if(includeAnalytics && measurementId) { %>
    REACT_APP_FIREBASE_measurementId="<- measurementId from Firebase Console ->"<% } %><% if(appId) { %>
    REACT_APP_FIREBASE_appId="<- appId from Firebase Console ->"<% } %><% if (includeMessaging) { %>
    REACT_APP_PUBLIC_VAPID_KEY="<- public vapid key from messaging tab of Firebase Console ->"<% } %><% if (includeSentry) { %>
    REACT_APP_SENTRY_DSN="<%= sentryDsn %>"<% } %><% if (includeUiTests) { %>

    # Cypress Environment
    CYPRESS_FIREBASE_projectId=$FIREBASE_PROJECT_ID
    CYPRESS_FIREBASE_apiKey=$FIREBASE_API_KEY<% } %>
   ```

1. Start Development server: `<% if (useYarn) { %>yarn<% } else { %>npm<% } %> start`

While developing, you will probably rely mostly on `<% if (useYarn) { %>yarn<% } else { %>npm<% } %> start`; however, there are additional scripts at your disposal:

| `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> <script>` <% if (useYarn) { %>  <% } %>  | Description                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `start`             | Serves your app at `localhost:3000` with automatic refreshing and hot module replacement                                |
| `start:dist`        | Builds the application to `./build` then serves at `localhost:3000` using firebase hosting emulator                     |
| `start:emulate`     | Same as `start`, but pointed to database emulators (make sure to call `emulators` first to boot up emulators)           |
| `build`             | Builds the application to `./build`                                                                                     |<% if (includeComponentTests) { %>
| `emulators`         | Starts database and pubsub emulators for use with `start:emulate`                                                       |<% } %><% if (includeUiTests) { %>
| `emulators:hosting` | Starts database and hosting emulators (used in verify workflow by Cypress)                                              |<% } %>
| `test`              | Runs unit tests with Jest. See [testing](#testing)                                                                      |
| `test:watch`        | Runs `test` in watch mode to re-run tests when changed                                                                  |<% if (includeUiTests) { %>
| `test:ui:run`       | Runs UI tests with Cypress. See [testing](#testing)                                                                     |
| `test:ui`           | Opens UI tests runner (Cypress Dashboard). See [testing](#testing)                                                      |
| `test:ui:emulate`   | Same as `test:ui` but with tests pointed at emulators                                                                   |<% } %>
| `lint`              | [Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors                    |
| `lint:fix`          | Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix) |

[Husky](https://github.com/typicode/husky) is used to enable `prepush` hook capability. The `prepush` script currently runs `eslint`, which will keep you from pushing if there is any lint within your code. If you would like to disable this, remove the `prepush` script from the `package.json`.

## Config Files

There are multiple configuration files:

- Firebase Project Configuration - `.firebaserc`
- Local Project Configuration - `.env.local`
- Local Cloud Functions Configuration - `functions/.runtimeconfig.json`

More details in the [Application Structure Section](#application-structure)

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications.

```
├── .github                      # All Github configuration
│   ├── workflows                # Github Actions CI Workflows
│   │  ├── deploy.yml            # Deploy workflow (deploys when pushing to specific branches)
│   │  └── verify.yml            # Paths for application routes
│   └── PULL_REQUEST_TEMPLATE.md # Main HTML page container for app<% if (includeUiTests) { %>
├── cypress                      # UI Integration Tests<% } %><% if (includeFunctions) { %>
├── functions                    # Cloud Functions
│   ├── src                      # Cloud Functions Source code (each folder represents a function)
│   ├── .runtimeconfig.json      # Cloud Functions local configuration
│   └── index.js                 # Mount point of Cloud Functions (loads functions by name)<% } %>
├── public                       # All build-related configuration<% if (includeMessaging) { %>
│   ├── firebase-messaging-sw.js # Service worker for Firebase Cloud Messaging<% } %>
│   └── index.html               # Main HTML page container for app
├── src                          # Application source code
│   ├── components               # Global Reusable Presentational Components
│   ├── constants                # Project constants such as firebase paths and form names
│   │  ├── firebasePaths.js      # Paths within Firebase (i.e. Collections + Sub-Collections)
│   │  └── paths.js              # Paths for application routes
│   ├── containers               # Global Reusable Container Components
│   ├── layouts                  # Components that dictate major page structure
│   │   └── CoreLayout           # Global application layout in which routes are rendered
│   ├── routes                   # Main route definitions and async split points
│   │   ├── index.js             # Bootstrap main application routes
│   │   └── Home                 # Fractal route
│   │       ├── index.js         # Route definitions and async split points
│   │       ├── components       # Presentational React Components
│   │       └── routes/**        # Fractal sub-routes (** optional)<% if (includeRedux) { %>
│   ├── store                    # Redux-specific pieces
│   │   ├── createStore.js       # Create and instrument redux store
│   │   └── reducers.js          # Reducer registry and injection<% } %>
│   └── utils                    # General Utilities (used throughout application)<% if (includeRedux) { %>
│       ├── components.js        # Utilities for building/implementing React components<% } %>
│       ├── form.js              # Utilities for forms (validation)
│       └── router.js            # Utilities for routing such as those that redirect back to home if not logged in
├── .env.local                   # Local Environment settings (automatically loaded up by react-scripts commands)
├── .eslintignore                # ESLint ignore file
├── .eslintrc.js                 # ESLint configuration
├── .firebaserc                  # Firebase Project configuration settings (including ci settings)
├── database.rules.json          # Rules for Firebase Real Time Database
├── firebase.json                # Firebase Service settings (Hosting, Functions, etc)
├── firestore.indexes.json       # Indexes for Cloud Firestore
├── firestore.rules              # Rules for Cloud Firestore
└── storage.rules                # Rules for Cloud Storage For Firebase
```

## Routing

We use `react-router-dom` [route matching](https://reacttraining.com/react-router/web/guides/basic-components/route-matching) (`<route>/index.js`) to define units of logic within our application. The application routes are defined within `src/routes/index.js`, which loads route settings which live in each route's `index.js`. The component with the suffix `Page` is the top level component of each route (i.e. `HomePage` is the top level component for `Home` route).

There are two types of routes definitions:

### Sync Routes

The most simple way to define a route is a simple object with `path` and `component`:

_src/routes/Home/index.js_

```js
import HomePage from "./components/HomePage";

// Sync route definition
export default {
  path: "/",
  component: HomePage,
};
```

### Async Routes

Routes can also be seperated into their own bundles which are only loaded when visiting that route, which helps decrease the size of your main application bundle. Routes that are loaded asynchronously are defined using `loadable` function which uses `React.lazy` and `React.Suspense`:

_src/routes/NotFound/index.js_

```js
import loadable from "utils/components";

// Async route definition
export default {
  path: "*",
  component: loadable(() =>
    import(/* webpackChunkName: 'NotFound' */ "./components/NotFoundPage")
  ),
};
```

With this setting, the name of the file (called a "chunk") is defined as part of the code as well as a loading spinner showing while the bundle file is loading.

More about how routing works is available in [the react-router-dom docs](https://reacttraining.com/react-router/web/guides/quick-start).
<% if (includeComponentTests || includeUiTests) { %>
## Testing<% } %><% if (includeComponentTests) { %>

### Component Tests

To add a unit test, create a `.spec.js` or `.test.js` file anywhere inside of `src`. Jest will automatically find these files and generate snapshots to the `__snapshots` folder.<% } %><% if (includeUiTests) { %>

### UI Tests

Cypress is used to write and run UI tests which live in the `cypress` folder. [`cypress-firebase`](https://github.com/prescottprue/cypress-firebase) is used to generate a custom auth token for the test user and to communicate with Firebase databases with admin privileges.

#### Tests Setup

1. Visit the [Firebase Console](https://console.firebase.google.com/)
1. Select your project
1. Navigate to Project Settings (gear icon button at the top left of the page).
1. Navigate to "Service Accounts" tab
1. Click "Generate New Private Key"
1. Save the service account file to the root of the repo under `serviceAccount.json`

#### Running Tests

The following npm scripts can be used to run tests:

- Run using Cypress run: `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> test:ui:run`
- Open Test Runner UI (`cypress open`): `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> test:ui`

To run tests against emulators:

1. Start database emulators: `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> emulators`
1. Start React app pointed at emulators: `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> start:emulate`
1. Open Cypress test runner with test utils pointed at emulators: `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> test:ui:emulate`

To Run tests in CI add the following environment variables within your CI provider:

- `SERVICE_ACCOUNT` - Used to create custom auth tokens for test user login
- `TEST_UID` - UID of the user used for testing

<% } %>## Deployment

Build code before deployment by running `<% if (useYarn) { %>yarn<% } else { %>npm run<% } %> build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

Before starting make sure to install Firebase Command Line Tool: `npm i -g firebase-tools`<% if (includeCI) { %>

#### CI Deploy (recommended)

**Note**: Config for this is located within `.github/workflows`

`firebase-ci` has been added to simplify the CI deployment process. All that is required is providing authentication with Firebase:

1. Login: `firebase login:ci` to generate an authentication token (will be used to give CI rights to deploy on your behalf)
1. Set `FIREBASE_TOKEN` environment variable within CI environment
1. Run a build on CI

If you would like to deploy to different Firebase instances for different branches (i.e. `prod`), change `ci` settings within `.firebaserc`.

For more options on CI settings checkout the [firebase-ci docs](https://github.com/prescottprue/firebase-ci)<% } %>

#### Manual deploy

1. Run `firebase:login`
1. Initialize project with `firebase init` then answer:
   - What file should be used for Database Rules? -> `database.rules.json`
   - What do you want to use as your public directory? -> `build`
   - Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
   - What Firebase project do you want to associate as default? -> **your Firebase project name**
1. Build Project: `<% if (useYarn) { %>yarn<% } else { %>npm<% } %> build`
1. Confirm Firebase config by running locally: `yarn emulators:hosting`
1. Deploy to Firebase (everything including Hosting and Functions): `firebase deploy`

**NOTE:** You can use `yarn emulators:hosting` to test how your application will work when deployed to Firebase, but make sure you run `<% if (useYarn) { %>yarn<% } else { %>npm<% } %> build` first.

## FAQ

1. Why node `12` instead of a newer version?

[Cloud Functions runtime runs on `12`](https://cloud.google.com/functions/docs/concepts/nodejs-runtime), which is why that is what is used for the CI build version.

<% if (includeCI) { %>[build-status-image]: https://img.shields.io/github/workflow/status/<%= githubUser %>/<%= appName %>/Deploy?style=flat-square
[build-status-url]: https://github.com/<%= githubUser %>/<%= appName %>/actions<% } %><% if (includeFunctionsTests) { %>
[coverage-image]: https://img.shields.io/codecov/c/github/<%= githubUser %>/<%= appName %>.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/<%= githubUser %>/<%= appName %><% } %>
[license-image]: https://img.shields.io/github/license/<%= githubUser %>/<%= appName %>?style=flat-square
[license-url]: https://github.com/<%= githubUser %>/<%= appName %>/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
