# generator-react-firebase

> Yeoman generator for starting projects using React and Firebase (Redux optional)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Quality][quality-image]][quality-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Installation

Install [Yeoman](http://yeoman.io) and generator-react-firebase using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo generator-react-firebase
```

## Before Starting
1. Do the following in the Firebase Console:
    1. Create both a Firestore Database and Real Time Database within your project
    1. Enable Google and/or Email Sign In Methods in the Authentication tab (required to enable login/signup within your application)

## Getting Started
1. Create a project folder and enter it: `mkdir myProject && cd myProject`
1. Generate project: `yo react-firebase` (project will be named after current folder)
1. Confirm dependencies are installed: `npm i && npm i --prefix functions`
1. Start application: `npm start`

    Project will default to being named with the name of the folder that it is generated within (in this case `myProject`)

#### Whats Next
1. Deploy your application either [manually through firebase-tools](#manual) or by [setting up CI Deployment](#ci)
1. Enable APIs for features which were opted into:
    * [Firebase Cloud Messaging API](https://console.cloud.google.com/apis/api/fcm.googleapis.com/overview)
1. Checkout and understand `src/config.js`. This was generated for you for your local development environment, but is is ignored from git tracking (within `.gitignore`). You can have different settings within this file based on environment or if multiple developers are running the same code.
1. Tryout the [Sub Generators](#sub-generators) to add new features to your project quickly
1. Tryout Firestore (you can generate a new project with `yes` as the answer to `Do you want to use Firestore`). Things work mostly the same, but it runs through [`redux-firestore`](https://github.com/prescottprue/redux-firestore).

## Features

* React v16.6
* Material-UI application styling including Navbar
* Full Authentication with validation (through Email, Google or Github)
* Async route loading (using [react-loadable][react-loadable-url])
* Route protection (only view certain pages when logged in)
* Firebase Functions Setup with function splitting for faster cold-starts (including support within function sub-generator)
* Account Management Page
* Automatic Build/Deploy config for multiple CI Providers including:
    * Gitlab (uses pipelines)
    * Travis
* Component Testing With Jest
* UI Testing with Cypress

## Uses

* [react](https://facebook.github.io/react/) - Rendering + Components
* [react-router](https://github.com/ReactTraining/react-router) - Routing (including async route loading)
* [material-ui](https://material-ui.com) - Google Material Styling React Components
* [eslint](http://eslint.org/) - Linting (also implements [`prettier`](https://github.com/prettier/prettier-eslint))
* [react-loadable](https://github.com/jamiebuilds/react-loadable) - HOC for async route/component chunk loading

*When opting into redux*

* [redux](http://redux.js.org/) - Client Side state *optional*
* [react-redux-firebase](https://react-redux-firebase.com) - Easily Persist results of Firebase queries to redux state
* [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) - Easily create HOCs for route/component protection based on auth state
* [redux-form](redux-form.com) - Form input validation + state
* [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) - Material UI components that work nicely with redux-form

## Sub generators

Sub generators are included to help speed up the application building process. You can run a sub-generator by calling `yo react-firebase:<name of sub-generator> <param1>`.

Example: To call the `component` sub-generator with "SomeThing" as the first parameter write: `yo react-firebase:component SomeThing`

##### Path Argument
Another argument can be passed to sub generators (unless otherwise noted) to provide the base path in which you would like to run the generator (starts from `src`). For example: `yo react-firebase:component Car routes/Project` runs the component generator within the Project route folder meaning that the component will be added to `routes/Project/components` instead of the top level `src/components` folder.

#### Function

Generates a Cloud Function allowing the user to specify trigger type (from HTTPS, Firestore, RTDB, Auth, or Storage)

A component is best for things that will be reused in multiple places. Our example

**command**

`yo react-firebase:function uppercaser`

**result**

```
/functions
--/uppercaser
----index.js
```

For firebase-functions `>v1.0.0`:

*/functions/uppercaser/index.js:*

```js
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { to } from 'utils/async';

const eventName = 'uppercaser';

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function uppercaserEvent(event) {
  const { params: { pushId }, data } = event;

  console.log('uppercaser onUpdate event:', data.val());

  // Create RTDB for response
  const ref = admin.database().ref(`responses/${eventName}/${pushId}`);

  // Write data to RTDB
  const [writeErr] = await to(ref.set({ hello: 'world' }));

  // Handle errors writing data to RTDB
  if (writeErr) {
    console.error(
      `Error writing response: ${writeErr.message || ''}`,
      writeErr
    );
    throw writeErr;
  }

  // End function execution by returning
  return null;
}

/**
 * Event handler that fires every time data is updated in Firebase Realtime Database.
 *
 * Trigger: `RTDB - onUpdate - '/uppercaser/{pushId}'`
 * @name uppercaser
 * @type {functions.CloudFunction}
 * @public
 */
export default functions.database
  .ref(`/${eventName}/{pushId}`)
  .onUpdate(uppercaserEvent);
```

For firebase-functions `>=v1.0.0`:

*/functions/uppercaser/index.js:*

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

const eventName = 'uppercaser'

/**
 * 
 * @param  {functions.database.DataSnapshot} snap - Data snapshot of the event
 * @param {Function} snap.val - Value after event
 * @param {functions.EventContext} context - Function event context
 * @param {Object} context.auth - Authentication information for the user that triggered the function
 * @return {Promise}
 */
async function uppercaserEvent(snap, context) {
  const { params: { pushId } } = context

  console.log('uppercaser onCreate event:', snap.val())

  // Create RTDB for response
  const ref = admin.database().ref(`responses/${eventName}/${pushId}`)

  // Write data to RTDB
  const [writeErr] = await to(ref.set({ hello: 'world' }))

  // Handle errors writing data to RTDB
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)
    throw writeErr
  }

  // End function execution by returning
  return null
}

/**
 * Cloud Function that is called every time new data is created in Firebase Realtime Database.
 *
 * Trigger: `RTDB - onCreate - '/requests/uppercaser/{pushId}'`
 * @name uppercaser
 * @type {functions.CloudFunction}
 * @public
 */
export default functions.database
  .ref(`/requests/${eventName}/{pushId}`)
  .onCreate(uppercaserEvent)
```

**Note:** This sub-generator does not support the Path Argument (functions are already placed within a folder matching their name).

#### Component

Generates a React component along with an option matching style file (either Javascript or SCSS) and places it within `/components`.

A component is best for things that will be reused in multiple places. Our example

**command**

`yo react-firebase:component Car`

**result**

```
/app
--/components
----/Car
------index.js
------Car.enhancer.js // optional
------Car.styles.js // optional (Localized MUI Styling)
------Car.js
------Car.scss // option (SCSS File)
```

*/app/components/Car.js:*

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import classes from './Car.scss'

export const Car = ({ car }) => (
  <div className={classes.container}>
    <span>Car Component</span>
    <pre>{JSON.stringify(car, null, 2)}</pre>
  </div>
)

export default Car
```

**NOTE:** Option to use Javascript file for styles is only offered if `@material-ui/core` is included in `package.json`

#### Form

Generates a Redux Form wrapped React component along with a matching scss file and places it within `/components`.

**command**

`yo react-firebase:form Car`

_or_

`yo react-firebase:form CarForm`

**result**

```
/app
--/components
----/CarForm
------index.js
------CarForm.enhancer.js
------CarForm.js
------CarForm.scss
```

*/app/components/CarForm.js:*

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import classes from './Car.scss'

export const CarForm = ({ car }) => (
  <div className={classes.container}>
    <span>CarForm Component</span>
    <pre>{JSON.stringify(car, null, 2)}</pre>
  </div>
)

export default CarForm
```

#### Enhancer

Generates an enhancer for a react component. Also includes an index file that wraps the component in the enhancer.

**command**

`yo react-firebase:enhancer Project`

**result**

```
/app
--/components
----/Project
------index.js
------Project.enhancer.js
```

#### Route

Generates a React component along with a matching component (which has an scss file, an enhancer, and its own index file).

**command**

`yo react-firebase:route Project`


**result**

```
/app
--/routes
----/Project
------index.js
------components
--------ProjectPage
----------index.js
----------Project.enhancer.js // optional
----------Project.js
----------Project.scss
```

#### Module

Generates a React component along with a matching component (which has an scss file, an enhancer, and its own index file).

**command**

`yo react-firebase:module notification`


**result**

```
/app
--/modules
----/notification
------components
------actions.js
------actionTypes.js
------index.js
------reducer.js
```

Note: This sub-generator does not support the Path Argument (functions are already placed within a folder matching their name).


## Generated Project

Project outputted from generator has a README explaining the full structure and details specific to settings you choose. This includes everything from running your code to deploying it.

## Examples

Complete examples of generator output available in [Examples](https://github.com/prescottprue/generator-react-firebase/tree/master/examples)

* [react-firebase-redux example](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - `redux` and Firebase Real Time Database
* [redux-firestore](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - `redux` and Firestore
* [react-firebase example](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - Firebase Real Time Database

For full projects built out using this as a starting place, check the next section.

## Projects Started Using This

* [fireadmin.io](https://fireadmin.io) - Application for Managing Firebase Applications. Includes support for multiple environments and data migrations.
* [devshare.io](https://devshare.io) - Codesharing site based on Firebase's Firepad and Realtime Database
* A number of projects at [Reside](https://www.residebrokerage.com/careers/)
* [react-redux-firebase material example](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0/examples/complete/material) - Shows usage of react-redux-firebase with material-ui
* [react-redux-firebase firestore example](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0/examples/complete/firestore) - Shows usage of react-redux-firebase with firestore

*open an issue or reach out [over gitter](https://gitter.im/redux-firebase/Lobby) if you would like your project to be included*

## FAQ

1. Why node `8` instead of a newer version?
  [Cloud Functions runtime was still on `8`](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the suggested build version as well as the version used when building within CI.

1. How do I deploy my application?
  The README of your generated project specifies deployment instructions based on your choices while generating. For an example, checkout any of the `README.md` files at the root of projects in [the examples folder](/examples/react-firebase-redux/) including [this one](/examples/react-firebase-redux/README.md).

1. How do I add a route?
    1. Use the route sub-generator to add the route: `yo react-firebase:route MyRoute`
    1. Add a `path` of the new route to `constants/paths` (i.e. `MYROUTE_PATH`)
    1. Add the route to the list of routes in `src/routes/index.js`

1. Why `enhancers` over `containers`? - For many reasons, here are just a few:
    * separates concerns to have action/business logic move to enhancers (easier for future modularization + optimization)
    * components remain "dumb" by only receiving props which makes them more portable
    * smaller files which are easier to parse
    * functional components can be helpful (along with other tools) when attempting to optimize things

1. Where are the settings for changing how my project deploys through Continious integration?  

    Within `.firebaserc` under the `ci` section. These settings are loaded by [firebase-ci][firebase-ci-url]

1. How does one override `react-redux-firebase` and `redux-firestore` configuration based on the environment? Like adding logging only to staging?

    Add the following to `.firebaserc` under the branch associated with the environment you wish to change:

    ```json
    "reduxFirebase": {
      "userProfile": "users",
      "enableLogging": false
    }
    ```

    Should look end up looking similar to the following:

    ```json
    "ci": {
      "copyVersion": true,
      "createConfig": {
        "master": {
          "env": "staging",
          "firebase": {
            "apiKey": "${STAGE_FIREBASE_API_KEY}",
            "authDomain": "some-project.firebaseapp.com",
            "databaseURL": "https://some-project.firebaseio.com",
            "projectId": "some-project",
            "storageBucket": "some-project.appspot.com"
          },
          "reduxFirebase": {
            "userProfile": "users",
            "enableLogging": true
          }
        }
      }
    }
    ```
1. Why are there `__snapshots__` folders everywhere when opting into Jest?

Jest just recently added support for adding your own snapshot resolver that allows you to place the `__snapshots__` folder at the top level (logic included in `scripts/snapshotResolver.js`). Since feature is still in alpha, it is not yet included with this generator. While testing supporting a top level `__snapshots__` folder, there were a number of issues, but the provided resolver did work as expected in some cases.

## In the future
* Airbnb linting option (currently only `standard`)
* Option to use simple file structure instead of fractal pattern
* Open to ideas

## License

MIT © [Prescott Prue](http://prue.io)

[npm-image]: https://img.shields.io/npm/v/generator-react-firebase.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-react-firebase
[npm-downloads-image]: https://img.shields.io/npm/dm/generator-react-firebase.svg?style=flat-square
[quality-image]: http://npm.packagequality.com/shield/generator-react-firebase.svg?style=flat-square
[quality-url]: https://packagequality.com/#?package=generator-react-firebase
[travis-image]: https://img.shields.io/travis/prescottprue/generator-react-firebase/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/generator-react-firebase
[daviddm-image]: https://img.shields.io/david/prescottprue/generator-react-firebase.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/generator-react-firebase
[coverage-image]: https://img.shields.io/codecov/c/github/prescottprue/generator-react-firebase.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/prescottprue/generator-react-firebase
[license-image]: https://img.shields.io/npm/l/generator-react-firebase.svg?style=flat-square
[license-url]: https://github.com/prescottprue/generator-react-firebase/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/prescottprue/generator-react-firebase
[firebase-ci-url]: https://github.com/prescottprue/firebase-ci
[react-loadable-url]: https://github.com/jamiebuilds/react-loadable