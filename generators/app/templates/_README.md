# <%= appName %>

<% if (includeCI && ciProvider == 'githubActions') { %>
[![Build Status][build-status-image]][build-status-url]<% } %><% if (includeCI && ciProvider == 'travis') { %>
[![Dependency Status][daviddm-image]][daviddm-url]<% } %><% if (codeClimate && includeComponentTests) { %>
[![Code Coverage][coverage-image]][coverage-url]
[![Code Climate][climate-image]][climate-url]<% } %>
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

- node `^10.15.0`
- npm `^6.0.0`

## Getting Started

1. Install app and functions dependencies: <% if (useYarn) { %>`npm i && npm i --prefix functions`<% } else { %>`yarn install && yarn install --cwd functions`<% } %>
1. Create `src/config.js` file that looks like so if it does not already exist:

   ```js
   const firebase = {
     // Config from Firebase console
   }

   // Overrides for for react-redux-firebase/redux-firestore config
   export const reduxFirebase = {}<% if (includeAnalytics) { %>

   export const segmentId = '<- Segment ID ->'<% } %><% if (firebasePublicVapidKey) { %>

   export const publicVapidKey = '<- publicVapidKey from Firebase console ->'<% } %><% if (sentryDsn) { %>

   export const sentryDsn = '<- DSN From Sentry.io ->'<% } %>

   export default {
     env,
     firebase,
     reduxFirebase<% if (sentryDsn) { %>,
     sentryDsn<% } %><% if (firebasePublicVapidKey) { %>,
     publicVapidKey<% } %><% if (includeAnalytics) { %>,
     segmentId<% } %>
   }
   ```

1. Start Development server: `<% if (useYarn) { %>npm<% } else { %>yarn<% } %> start`

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

| `<% if (useYarn) { %>npm<% } else { %>yarn<% } %> run <script>` | Description                                                                                                             |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `start`                                                         | Serves your app at `localhost:3000` with automatic refreshing and hot module replacement                                |
| `start:dist`                                                    | Builds the application to `./dist` then serves at `localhost:3000` using firebase hosting emulator                      |
| `start:emulate`                                                 | Same as `start`, but pointed to database emulators (make sure to call `emulators` first to boot up emulators)           |
| `build`                                                         | Builds the application to `./dist`                                                                                      | <% if (includeComponentTests) { %> |
| `emulators`                                                     | Starts database emulators for use with `start:emulate`                                                                  | <% if (includeUiTests) { %> |
| `emulators:all`                                                 | Starts database and hosting emulators (used in verify workflow by Cypress)                                              | <% } %> |
| `test`                                                          | Runs unit tests with Jest. See [testing](#testing)                                                                      |
| `test:watch`                                                    | Runs `test` in watch mode to re-run tests when changed                                                                  | <% } %><% if (includeUiTests) { %> |
| `test:ui`                                                       | Runs ui tests with Cypress. See [testing](#testing)                                                                     |
| `test:ui:open`                                                  | Opens ui tests runner (Cypress Dashboard). See [testing](#testing)                                                      |
| `test:ui:emulate`                                               | Same as `test:ui:open` but with tests pointed at emulators                                                              | <% } %> |
| `lint`                                                          | [Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors                    |
| `lint:fix`                                                      | Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix) |

[Husky](https://github.com/typicode/husky) is used to enable `prepush` hook capability. The `prepush` script currently runs `eslint`, which will keep you from pushing if there is any lint within your code. If you would like to disable this, remove the `prepush` script from the `package.json`.

## Config Files

There are multiple configuration files:

- Firebase Project Configuration (including settings for how `src/config.js` is built on CI) - `.firebaserc`
- Project Configuration used within source (can change based on environment variables on CI) - `src/config.js`
- Cloud Functions Local Configuration - `functions/.runtimeconfig.json`

More details in the [Application Structure Section](#application-structure)

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications.

```
├── public                   # All build-related configuration
│   └── index.html           # Main HTML page container for app
├── src                      # Application source code
│   ├── components           # Global Reusable Presentational Components
│   ├── constants            # Project constants such as firebase paths and form names
│   │  └── paths.js          # Paths for application routes
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout       # Global application layout in which routes are rendered
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes
│   │   └── Home             # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── components   # Presentational React Components (state connect and handler logic in enhancers)
│   │       └── routes/**    # Fractal sub-routes (** optional)
│   ├── static               # Static assets
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   ├── styles               # Application-wide styles (generally settings)
│   └── utils                # General Utilities (used throughout application)
│   │   ├── components.js    # Utilities for building/implementing react components (often used in enhancers)
│   │   ├── form.js          # For forms
│   │   └── router.js        # Utilities for routing such as those that redirect back to home if not logged in
├── tests                    # Unit tests
├── .env.local               # Environment settings for when running locally
├── .eslintignore            # ESLint ignore file
├── .eslintrc.js             # ESLint configuration
├── .firebaserc              # Firebase Project configuration settings (including ci settings)
├── database.rules.json      # Rules for Firebase Real Time Database
├── firebase.json            # Firebase Service settings (Hosting, Functions, etc)
├── firestore.indexes.json   # Indexes for Cloud Firestore
├── firestore.rules          # Rules for Cloud Firestore
└── storage.rules            # Rules for Cloud Storage For Firebase
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

## Testing

<% } %><% if (includeComponentTests) { %>

### Component Tests

To add a unit test, create a `.spec.js` or `.test.js` file anywhere inside of `src`. Jest will automatically find these files and generate snapshots to the `__snapshots` folder.<% } %><% if (includeUiTests) { %>

### UI Tests

Cypress is used to write and run UI tests which live in the `cypress` folder. The following npm scripts can be used to run tests:

- Run using Cypress run: `npm run test:ui`
- Open Test Runner UI (`cypress open`): `npm run test:ui:open`

To run tests against emulators:

1. Start database emulators: `npm run emulate`
1. Start React app pointed at emulators: `npm run start:emulate`
1. Open Cypress test runner with test utils pointed at emulators: `npm run test:ui:emulate`

To Run tests in CI add the following environment variables within your CI provider:

- `SERVICE_ACCOUNT` - Used to create custom auth tokens for test user login
- `FIREBASE_APP_NAME` - name of Firebase app (used to load SDK config)
- `TEST_UID` - UID of the user used for testing

<% } %>## Deployment

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

<% if (deployTo === 'firebase') { %>Before starting make sure to install Firebase Command Line Tool: `npm i -g firebase-tools`<% } %><% if (includeCI) { %>

#### CI Deploy (recommended)

**Note**: Config for this is located within<% } %><% if (ciProvider == 'travis') { %>`.travis.yml`<% } %><% if (ciProvider == 'gitlab') { %>`.gitlab-ci.yml`<% } %>
<% if (includeCI) { %>`firebase-ci` has been added to simplify the CI deployment process. All that is required is providing authentication with Firebase:

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
1. Build Project: `npm run build`
1. Confirm Firebase config by running locally: `firebase serve`
1. Deploy to Firebase (everything including Hosting and Functions): `firebase deploy`

**NOTE:** You can use `firebase serve` to test how your application will work when deployed to Firebase, but make sure you run `npm run build` first.<% if (deployTo === 's3') { %>
Selecting AWS S3 from the deploy options when running the generator adds deploy configs in <% if (ciProvider == 'travis') { %>`travis.yml`<% } %><% if (ciProvider == 'travis') { %>`gitlab-ci.yml`<% } %>.

1. Get your AWS Key and Secret from the AWS Console Credentials page
2. Set the following environment vars within the Travis-CI repo settings page:
   - AWS_KEY - Your AWS key
   - AWS_SECRET - Your AWS secret
   - BUCKET - Your S3 Bucket<% } %><% if (deployTo === 'heroku') { %>

Selecting [Heroku](http://heroku.com) from the deploy options when running the generator adds a `Procfile` as well as deploy configs in `.travis.yml` for out of the box deployment.

To deploy to [Heroku](http://heroku.com) through [Travis-CI](http://travis-ci.org):

1. Select yes to question `Would to include config for Travis CI?` when generating
1. Select `Heroku` under deploy options
1. Enable Repo on Travis-CI Account
1. Get API Key from Heroku Dashboard
1. Create a new App (this name will be used in travis env var)
1. Set the following environment vars within the Travis-CI repo settings page:

- `HEROKU_KEY` - Your Heroku API key
- `HEROKU_APP` - Your Heroku App name<% } %>

## FAQ

1. Why node `10` instead of a newer version?

[Cloud Functions runtime runs on `10`](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the CI build version.

<% if (includeCI && ciProvider == 'travis') { %>[build-status-image]: https://img.shields.io/travis/<%= githubUser %>/<%= appName %>/master.svg?style=flat-square
[build-status-url]: https://travis-ci.org/<%= githubUser %>/<%= appName %>
[daviddm-image]: https://img.shields.io/david/<%= githubUser %>/<%= appName %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= githubUser %>/<%= appName %><% } %><% if (includeCI && ciProvider == 'githubActions') { %>[build-status-image]: https://img.shields.io/github/workflow/status/<%= githubUser %>/<%= appName %>/Verify?style=flat-square
[build-status-url]: https://github.com/<%= githubUser %>/<%= appName %>/actions<% } %>
<% if (codeClimate) { %>[climate-image]: https://img.shields.io/codeclimate/github/<%= githubUser %>/<%= appName %>.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/<%= githubUser %>/<%= appName %>
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/<%= githubUser %>/<%= appName %>.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/<%= githubUser %>/<%= appName %><% } %>
[license-image]: https://img.shields.io/npm/l/<%= appName %>.svg?style=flat-square
[license-url]: https://github.com/<%= githubUser %>/<%= appName %>/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
