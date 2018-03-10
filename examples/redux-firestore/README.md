# redux-firestore

[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Code Climate][climate-image]][climate-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Routing](#routing)
1. [Testing](#testing)
1. [Configuration](#configuration)
1. [Production](#production)
1. [Deployment](#deployment)

## Requirements
* node `^6.11.5`
* yarn `^0.23.0` or npm `^3.0.0`

## Getting Started

1. Install dependencies: `yarn install` (or `npm install`)
1. Create `src/config.js` file that looks like so:
    ```js
    const firebase = {
      // Config from Firebase console
    }

    export default { firebase }
    ```
1. Start Development server: `yarn start` (or `npm start`)

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000` and displays [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)|
|`start:simple`     |Serves your app at `localhost:3000` without [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)|
|`build`            |Builds the application to ./dist|
|`test`             |Runs unit tests with Karma. See [testing](#testing)|
|`test:watch`       |Runs `test` in watch mode to re-run tests when changed|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`         |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|

[Husky](https://github.com/typicode/husky) is used to enable `prepush` hook capability. The `prepush` script currently runs `eslint`, which will keep you from pushing if there is any lint within your code. If you would like to disable this, remove the `prepush` script from the `package.json`.


## Config Files

There are multiple configuration files:

* Project Path Configuration - `project.config.js`
* Firebase Project Configuration (including how `src/config.js` is built on CI) - `.firebaserc`
* Project Configuration used within source (can change based on environment variables on CI) - `src/config.js`

More details in the [Application Structure Section](#application-structure)

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── build                    # All build-related configuration
│   ├── scripts              # Scripts used within the building process
│   ├── karma.config.js      # Test configuration for Karma
│   └── webpack.config.js    # Environment-specific configuration files for webpack
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── normalize.js         # Browser normalization and polyfills
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components (connected to redux state)
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout       # Global application layout in which to render routes
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   └── Home             # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── assets       # Assets required to render components
│   │       ├── components   # Presentational React Components (state connect and handler logic in enhancers)
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── static               # Static assets
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   ├── styles               # Application-wide styles (generally settings)
│   └── utils                 # General Utilities (used throughout application)
│   │   ├── components.js   # Utilities for building/implementing react components (often used in enhancers)
│   │   ├── form.js         # For forms (often used in enhancers that use redux-form)
│   │   └── router.js       # Utilities for routing such as those that redirect back to home if not logged in
├── project.config.js        # Project configuration settings
├── .firebaserc              # Firebase Project configuration settings (including ci settings)
└── tests                    # Unit tests
```

### Routing
We use `react-router` [route definitions](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, create a `.spec.js` file anywhere inside of `./tests`. Karma and webpack will automatically find these files, and Mocha and Chai will be available within your test without the need to import them.

## Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

### Deployment

1. Install Firebase Command Line Tool: `npm i -g firebase-tools`

#### CI Deploy (recommended)
**Note**: Config for this is located within `travis.yml`
`firebase-ci` has been added to simplify the CI deployment process. All that is required is providing authentication with Firebase:

1. Login: `firebase login:ci` to generate an authentication token (will be used to give Travis-CI rights to deploy on your behalf)
1. Set `FIREBASE_TOKEN` environment variable within Travis-CI environment
1. Run a build on Travis-CI

If you would like to deploy to different Firebase instances for different branches (i.e. `prod`), change `ci` settings within `.firebaserc`.

For more options on CI settings checkout the [firebase-ci docs](https://github.com/prescottprue/firebase-ci)

#### Manual deploy

1. Run `firebase:login`
1. Initialize project with `firebase init` then answer:
  * What file should be used for Database Rules?  -> `database.rules.json`
  * What do you want to use as your public directory? -> `build`
  * Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
  * What Firebase project do you want to associate as default?  -> **your Firebase project name**
1. Build Project: `npm run build`
1. Confirm Firebase config by running locally: `firebase serve`
1. Deploy to firebase: `firebase deploy`
**NOTE:** You can use `firebase serve` to test how your application will work when deployed to Firebase, but make sure you run `npm run build` first.


## FAQ

1. Why node `6.11.5` instead of a newer version?

  [Cloud Functions runtime is still on `6.11.5`](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the travis build version. This will be switched when the functions runtime is updated.

1. Why Yarn over node's `package-lock.json`?

  Relates to previous question. Node `6.*.*` and equivalent npm didn't include lock files by default.

1. Why `enhancers` over `containers`? - For many reasons, here are just a few:
    * separates concerns to have action/business logic move to enhancers (easier for future modularization + optimization)
    * components remain "dumb" by only receiving props which makes them more portable
    * smaller files which are easier to parse
    * functional components can be helpful (along with other tools) when attempting to optimize things

[travis-image]: https://img.shields.io/travis/testuser/redux-firestore/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/testuser/redux-firestore
[daviddm-image]: https://img.shields.io/david/testuser/redux-firestore.svg?style=flat-square
[daviddm-url]: https://david-dm.org/testuser/redux-firestore
[climate-image]: https://img.shields.io/codeclimate/github/testuser/redux-firestore.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/testuser/redux-firestore
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/testuser/redux-firestore.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/testuser/redux-firestore
[license-image]: https://img.shields.io/npm/l/redux-firestore.svg?style=flat-square
[license-url]: https://github.com/testuser/redux-firestore/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
