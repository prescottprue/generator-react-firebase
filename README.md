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

## Getting Started

1. Create a project folder and enter it: `mkdir myProject && cd myProject`
1. Generate project: `yo react-firebase` (project will be named after current folder)
1. Start application by running `yarn start` or `npm start`

Project will default to being named with the name of the folder that it is generated within (in this case `myProject`)

#### Whats Next

1. Checkout and understand `src/config.js`. This was generated for you for your local development environment, but is is ignored from git tracking (within `.gitignore`). You can have different settings within this file based on environment or if multiple developers are running the same code.
1. Tryout the [Sub Generators](#sub-generators)
1. Tryout Firestore (you can generate a new project with `yes` as the answer to `Do you want to use Firestore`). Things work mostly the same, but it runs through [`redux-firestore`](https://github.com/prescottprue/redux-firestore).

## Features
* firebase-functions v1 (including support within function sub-generator)
* React v16.3
* Material-UI v1 application styling including Navbar
* Full Authentication (through Email, Google or Github)
* Login/Signup Pages with input validation
* Route protection (only view certain pages when logged in)
* Account Page

## Uses
* [react](https://facebook.github.io/react/) - Rendering + Components
* [react-router](https://github.com/ReactTraining/react-router) - Routing (including async route loading)
* [material-ui](https://material-ui.com) - Google Material Styling React Components (with option to opt out of Version 1)
* [eslint](http://eslint.org/) - Linting (also implements [`prettier`](https://github.com/prettier/prettier-eslint))
* [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) - Improve CLI experience for Webpack

*When opting into redux*

* [redux](http://redux.js.org/) - Client Side state *optional*
* [react-redux-firebase](https://react-redux-firebase.com) - Easily Persist results of Firebase queries to redux state
* [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) - Easily create HOCs for route/component protection based on auth state
* [redux-form](redux-form.com) - Form input validation + state
* [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) - Material UI components that work nicely with redux-form

## Generated Project

Project outputted from generator has a README explaining the full structure and details specific to settings you choose. The following scripts are included:

|`npm run <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000`|
|`build`            |Builds the application to ./dist|
|`test`             |Runs unit tests with Karma. See [testing](#testing)|
|`test:watch`       |Runs `test` in watch mode to re-run tests when changed|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`         |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|

View [the example application README](/examples/react-firebase-redux/README.md) for more details.

### Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the [Firebase section](#firebase).

### Deployment

#### Firebase

1. Login to [Firebase](firebase.google.com) (or Signup if you don't have an account) and create a new project
1. Install cli: `npm i -g firebase-tools`
1. Choose to go to a either the [CI section](https://github.com/prescottprue/generator-react-firebase#ci)(suggested) or the [Manual section](https://github.com/prescottprue/generator-react-firebase#manual)

##### CI

If opting into [Travis-CI](travis-ci.org), config is included within `travis.yml` that uses `firebase-ci` to simplify the CI deployment process. All that is required is providing authentication with Firebase:

1. Select yes to question `Would to include config for Travis CI?` when generating
1. Select `Firebase` under deploy options
1. Login: `firebase login:ci` to generate an authentication token (will be used to give Travis-CI rights to deploy on your behalf)
1. Set `FIREBASE_TOKEN` environment variable within Travis-CI environment
1. Run a build on Travis-CI
1. To deploy to different Firebase instances for different branches (i.e. `prod`), change `ci` settings within `.firebaserc`

Settings for each environment can be provided through the `.firebaserc` file.

For more options on CI settings checkout the [firebase-ci docs](https://github.com/prescottprue/firebase-ci)

##### Manual

1. Run `firebase:login`
1. Initialize project with `firebase init` then answer:

  * What file should be used for Database Rules?  -> `database.rules.json`
  * What do you want to use as your public directory? -> `build`
  * Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
  * What Firebase project do you want to associate as default?  -> **your Firebase project name**

1. Build Project: `npm run build`
1. Confirm Firebase config by running locally: `firebase serve` (make sure you run `npm run build` first)
1. Deploy to firebase: `firebase deploy`

#### AWS S3

Selecting AWS S3 from the deploy options when running the generator adds deploy configs in `.travis.yml`.

1. Select yes to question `Would to include config for Travis CI?` when generating
1. Select `AWS` under deploy options
1. Get your AWS Key and Secret from the AWS Console Credentials page
1. Set the following environment vars within the Travis-CI repo settings page:
  * `AWS_KEY` - Your AWS key
  * `AWS_SECRET` - Your AWS secret
  * `S3_BUCKET` - Your S3 Bucket

#### Heroku

Selecting [Heroku](http://heroku.com) from the deploy options when running the generator adds a `Procfile`. If you choose yes when offered travis, as deploy configs will be included in `.travis.yml` for out of the box deployment.

1. Select yes to question `Would to include config for Travis CI?` when generating
1. Select `Heroku` under deploy options
1. Enable Repo on Travis-CI Account
2. Get API Key from Heroku Dashboard
3. Create a new App (this name will be used in travis env var)
4. Set the following environment vars within the Travis-CI repo settings page:
  * `HEROKU_KEY` - Your Heroku API key
  * `HEROKU_APP` - Your Heroku App name

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

For firebase-functions `<v1.0.0`:

*/functions/uppercaser/index.js:*

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name uppercaser
 * Cloud Function triggered by Real Time Database Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}')
  .onUpdate(uppercaserEvent)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function uppercaserEvent(event) {
  const eventData = event.data.val()
  const params = event.params
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push(eventData))
  if (writeErr) {
    console.error('Error writing response:', writeErr.message || writeErr)
    throw writeErr
  }
  return response
}
```

For firebase-functions `>=v1.0.0`:

*/functions/uppercaser/index.js:*

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name uppercaser
 * Cloud Function triggered by Real Time Database Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}')
  .onUpdate(uppercaserEvent)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function uppercaserEvent(change, context) {
  // const { params, auth, timestamp } = context
  // const { before, after } = change
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))
  if (writeErr) {
    console.error('Error writing response:', writeErr.message || writeErr)
    throw writeErr
  }
  return response
}
```

Note: This sub-generator does not support the Path Argument (functions are already placed within a folder matching their name).

#### Component

Generates a React component along with a matching scss file and places it within `/components`

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
------Car.js
------Car.scss
```

*/app/components/Car.js:*

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import classes from './Car.scss'

export const Project = ({ car }) => (
  <div className={classes.container}>
    <span>Project Component</span>
    <pre>{JSON.stringify(car, null, 2)}</pre>
  </div>
)
```

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

export const Project = ({ car }) => (
  <div className={classes.container}>
    <span>Project Component</span>
    <pre>{JSON.stringify(car, null, 2)}</pre>
  </div>
)
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

## Examples

Complete examples of generator output available in [Examples](https://github.com/prescottprue/generator-react-firebase/tree/master/examples)

* [react-firebase-redux example](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - `redux` and Firebase Real Time Database
* [redux-firestore](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - `redux` and Firestore
* [react-firebase example](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - Firebase Real Time Database

For full projects built out using this as a starting place, check the next section.

## Projects Started Using This

* [fireadmin.io](https://fireadmin.io) - Application for Managing Firebase Applications. Includes support for multiple environments and data migrations.
* [devshare.io](https://devshare.io) - Codesharing site based on Firebase's Firepad and Realtime Database
* [react-redux-firebase material example](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0/examples/complete/material) - Shows usage of react-redux-firebase with material-ui
* [react-redux-firebase firestore example](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0/examples/complete/firestore) - Shows usage of react-redux-firebase with firestore

*open an issue or reach out [over gitter](https://gitter.im/redux-firebase/Lobby) if you would like your project to be included*

## FAQ

1. Why node `6.14.0` instead of a newer version?
  [Cloud Functions runtime is still on `6.14.0`](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the travis build version. This will be switched when the functions runtime is updated.

1. Why Yarn over node's `package-lock.json`?
  Relates to previous question. Node `6.*.*` and equivalent npm didn't include lock files by default.

1. Why `enhancers` over `containers`? - For many reasons, here are just a few:
  * separates concerns to have action/business logic move to enhancers (easier for future modularization + optimization)
  * components remain "dumb" by only receiving props which makes them more portable
  * smaller files which are easier to parse
  * functional components can be helpful (along with other tools) when attempting to optimize things

## In the future
* Option to include tests when using sub-generators
* Airbnb linting option (currently only `standard`)
* Option to use simple file structure instead of fractal pattern
* Open to ideas

## License

MIT © [Scott Prue](http://prue.io)

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
