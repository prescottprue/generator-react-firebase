# generator-react-firebase

> Yeoman generator for starting projects using React and Firebase (Redux optional)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Quality][quality-image]][quality-url]
[![Build Status][build-status-image]][build-status-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

## Installation

Install [Yeoman](http://yeoman.io) and generator-react-firebase using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo generator-react-firebase
```

## Before Starting

1. Do the following in the Firebase Console:
   1. Create both a Firestore Database and Real Time Database within your project
   1. Enable Google and/or Email Sign In Methods in the Authentication tab (required to enable login/signup within your application)
   1. Confirm billing is enabled for your project
1. Make sure to have Node ^12 installed and selected - this is to match the `engines` setting in `functions/package.json` which defines the function runtime node version (more in the FAQ section)
1. Make sure you have `firebase-tools` installed an you are logged in (`firebase login`)
1. Confirm [Firebase Hosting API](https://console.cloud.google.com/apis/library/firebasehosting.googleapis.com) is enabled for your project

## Getting Started

1. Create a project folder and enter it: `mkdir myProject && cd myProject`
1. Generate project: `yo react-firebase` (project will be named after current folder)
1. Start application: `npm start` or `yarn start`

   Project will default to being named with the name of the folder that it is generated within (in this case `myProject`)

**Note**: To skip installing dependencies during generation pass the skip install flag (i.e. `--skip-install`)

#### Whats Next

1. [Deploy](#deployment) your application either [manually through firebase-tools](#manual-deploy) or by [setting up CI Deployment](#ci-deploy)
1. Enable APIs for features which were opted into:
   - [Firebase Cloud Messaging API](https://console.cloud.google.com/apis/api/fcm.googleapis.com/overview)
1. Checkout and understand `.env.local`. This was generated for you for your local development environment, but is is ignored from git tracking (within `.gitignore`). You can have different settings within this file based on environment or if multiple developers are running the same code.
1. Tryout the [Sub Generators](#sub-generators) to add new features such as routes, components, and Cloud Functions to your project quickly

## Features

- React + React Dom `^17.0.0` (has hooks)
- Material-UI application styling including Navbar
- Full Authentication with validation (through Email, Google or Github)
- Async route loading (using `React.lazy` and `React.Suspense`)
- Route protection (only view certain pages when logged in)
- Firebase Functions Setup with function splitting for faster cold-starts (including support within function sub-generator)
- Automatic Build/Deploy config for multiple CI Providers including:
  - Github Actions
  - Gitlab (uses pipelines)
  - Travis
- Component Testing With Jest
- UI Testing with Cypress
- Dependabot settings for automatic PRs for dependency version updates
- Account Management Page

## Uses

- [react](https://facebook.github.io/react/) - Rendering + Components
- [react-router](https://github.com/ReactTraining/react-router) - Routing (including async route loading)
- [material-ui](https://material-ui.com) - Google Material Styling React Components
- [eslint](http://eslint.org/) - Linting (also implements [`prettier`](https://github.com/prettier/prettier-eslint))
- [react-hook-form](https://react-hook-form.com/) - Form input validation + state
- [react-scripts](https://www.npmjs.com/package/react-scripts) - Build + Dev tooling from [create-react-app](https://github.com/facebook/create-react-app#readme)

_When opting out of redux (default)_

- [reactfire](https://github.com/FirebaseExtended/reactfire)

_When opting into redux_

- [redux](http://redux.js.org/) - Client Side state
- [react-redux-firebase](https://react-redux-firebase.com) - Easily Persist results of Firebase queries to redux state
- [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) - Easily create HOCs for route/component protection based on auth state

## Screenshots

![image](https://user-images.githubusercontent.com/2992224/93631046-f486e000-f9b8-11ea-9eed-9e150dd42bdb.png)

![image](https://user-images.githubusercontent.com/2992224/93629646-a07afc00-f9b6-11ea-873b-9ca777939546.png)

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
----uppercaser.spec.js
----index.js
```

_/functions/uppercaser/index.js:_

```js
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { to } from "utils/async";

const eventName = "uppercaser";

/**
 * @param {functions.Change} change - Function change interface containing state objects
 * @param {functions.EventContext} context - Function event context
 * @return {Promise}
 */
async function uppercaserEvent(change, context) {
  const { params, auth, timestamp } = context;
  const { before, after } = change;

  console.log("<%= camelName %> <%= eventType %> event:", {
    before: before.val(),
    after: after.val(),
    uid: auth?.uid,
    params,
    timestamp,
  });

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

**Note:** This sub-generator does not support the Path Argument (functions are automatically placed within the folder indicated within `functions.source` of `firebase.json`, otherwise `functions`).

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

_/app/components/Car.js:_

```jsx
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Car.styles";

const useStyles = makeStyles(styles);

function Car({ car }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span>Car Component</span>
      <pre>{JSON.stringify(car, null, 2)}</pre>
    </div>
  );
}

export default Car;
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
------CarForm.styles.js
```

_/app/components/CarForm.js:_

```jsx
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./CarForm.styles";

const useStyles = makeStyles(styles);

function CarForm({ onSubmit }) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    nativeValidation: false,
  });

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.name}
        helperText={errors.name && "Name is required"}
        name="name"
        label="Name"
        inputRef={register({
          required: true,
        })}
        margin="normal"
        fullWidth
      />
      <Button
        type="submit"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

CarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CarForm;
```

#### Hook

Generates a custom react hook for a react component. The hook is in it's own file

**command**

`yo react-firebase:hook ProjectTile`

**result**

```
/app
--/components
----/Project
------index.js
------Project.hook.js
```

With a file that looks like:

```js
export default function useProjectTile() {
  // Hook logic
}
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
----------Project.js
----------Project.styles.js
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
```

## Generated Project

Project outputted from generator has a README explaining the full structure and details specific to settings you choose. This includes everything from running your code to deploying it. Some of the key pieces of that information are included below:

### Testing

#### Component Tests

To add a unit test, create a `.spec.js` or `.test.js` file anywhere inside of `src`. Jest will automatically find these files and generate snapshots to the `__snapshots` folder.

#### UI Tests

Cypress is used to write and run UI tests which live in the `cypress` folder. The following npm scripts can be used to run tests:

    * Run using Cypress run: `npm run test:ui`
    * Open Test Runner UI (`cypress open`): `npm run test:ui:open`

### Deployment

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

1. Install Firebase Command Line Tool: `npm i -g firebase-tools`

#### CI Deploy

**Note**: Config for this is located within
`firebase-ci` has been added to simplify the CI deployment process. All that is required is providing authentication with Firebase:

1. Login: `firebase login:ci` to generate an authentication token (will be used to give Travis-CI rights to deploy on your behalf)
1. Set `FIREBASE_TOKEN` environment variable within Travis-CI environment
1. Run a build on CI

If you would like to deploy to different Firebase instances for different branches (i.e. `prod`), change `ci` settings within `.firebaserc`.

For more options on CI settings checkout the [firebase-ci docs](https://github.com/prescottprue/firebase-ci)

#### Manual Deploy

1. Run `firebase login`
1. Initialize project with `firebase init` then answer:
   - What file should be used for Database Rules? -> `database.rules.json`
   - What do you want to use as your public directory? -> `build`
   - Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
   - What Firebase project do you want to associate as default? -> **your Firebase project name**
1. Build Project: `npm run build`
1. Confirm Firebase config by running locally: `firebase serve`
1. Deploy to Firebase (everything including Hosting and Functions): `firebase deploy`

**NOTE:** You can use `firebase serve` to test how your application will work when deployed to Firebase, but make sure you run `npm run build` first.

## Examples

Complete examples of generator output available in [Examples](https://github.com/prescottprue/generator-react-firebase/tree/master/examples)

- [react-firebase-redux example](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - `redux` and Firebase Real Time Database
- [redux-firestore](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - `redux` and Firestore
- [react-firebase example](https://github.com/prescottprue/generator-react-firebase/tree/master/examples/react-firebase-redux) - Firebase Real Time Database

For full projects built out using this as a starting place, check the next section.

## Projects Started Using This

- [fireadmin.io](https://fireadmin.io) - Application for Managing Firebase Applications. Includes support for multiple environments and data migrations.
- [devshare.io](https://devshare.io) - Codesharing site based on Firebase's Firepad and Realtime Database
- A number of projects at [Reside](https://www.residebrokerage.com/careers/)
- [react-redux-firebase material example](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0/examples/complete/material) - Shows usage of react-redux-firebase with material-ui
- [react-redux-firebase firestore example](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0/examples/complete/firestore) - Shows usage of react-redux-firebase with firestore

_open an issue or reach out [over gitter](https://gitter.im/redux-firebase/Lobby) if you would like your project to be included_

## FAQ

1. Why use `.jsx` extension for React component files? What if I want to use `.js` instead?

`.jsx` is used to clearly identify files which are using React JSX, which is non-standard javascript functionality. Some eslint configurations, such as [Airbnb](https://github.com/airbnb/javascript), have this as a rule ([here is an issue that discusses why](https://github.com/airbnb/javascript/pull/985)).

If you would still like to use `.js` instead, you can switch the extension of all `.jsx` files to `.js` using the following command:

```bash
for f in src/**/*.jsx; do
  mv -- "$f" "${f%.jsx}.js"
done
```

1. Why node `12` instead of a newer version?

It is the newest node supported by [the Cloud Functions runtime](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the suggested build version as well as the version used when building within CI.

1. Why camel-cased environment variables instead of full capital letters (i.e. `process.env.REACT_APP_FIREBASE_projectId` instead of `process.env.REACT_APP_FIREBASE_PROJECT_ID`)

In CI the settings for you app are loaded dynamically through `firebase-tools` when using the `apps:sdkconfig` command, the values that are returned use camel-casing. Instead of making things more unclear by changing the case of these variables, they are left matching what the Firebase JS SDK is expecting. This pattern is also used in the `.env.local` file.

1. How do I deploy my application?
   The README of your generated project specifies deployment instructions based on your choices while generating. For an example, checkout any of the `README.md` files at the root of projects in [the examples folder](/examples/react-firebase-redux/) including [this one](/examples/react-firebase-redux/README.md).

1. How do I add a route?

   1. Use the route sub-generator to add the route: `yo react-firebase:route MyRoute`
   1. Add a `path` of the new route to `constants/paths` (i.e. `MYROUTE_PATH`)
   1. Add the route to the list of routes in `src/routes/index.js`

1. Where are the settings for changing how my project deploys through Continuous integration?

   Within `.firebaserc` under the `ci` section. These settings are loaded by [firebase-ci][firebase-ci-url]

1. Why are there `__snapshots__` folders everywhere when opting into Jest?

   Jest just recently added support for adding your own snapshot resolver that allows you to place the `__snapshots__` folder at the top level (logic included in `scripts/snapshotResolver.js`). Since feature is still in alpha, it is not yet included with this generator. While testing supporting a top level `__snapshots__` folder, there were a number of issues, but the provided resolver did work as expected in some cases.

   I got it working by:

   1. Ejecting result of generator (`yarn eject`)
   1. Installing beta version of Jest that is at least `24.0.0-alpha.6` - `yarn add jest@beta --dev`
   1. Adding [a snapshot resolver to place snapshots where you want](https://gist.github.com/prescottprue/5ece5e173bcfba7ed86dae6a91444451) as `scripts/snapshotResolver.js`
   1. Referencing the snapshot resolver reference within `package.json` (which should contain jest config after ejecting):
      `"snapshotResolver": "<rootDir>/scripts/snapshotResolver.js"`

1. How do I move/rename the `cypress` folder to something more general?
   If you wanted to move the `cypress` folder into `test/ui` for instance, you could modify your `cypress.json` file to match the following:

   **cypress.json**

   ```json
   {
     "chromeWebSecurity": false,
     "fixturesFolder": "test/ui/fixtures",
     "integrationFolder": "test/ui/integration",
     "pluginsFile": "test/ui/plugins/index.js",
     "screenshotsFolder": "test/ui/screenshots",
     "videosFolder": "test/ui/videos",
     "supportFile": "test/ui/support/index.js"
   }
   ```

1. Some of my answers were saved, how did that happen? Why?

   Yeoman has the `store` option, which uses [the Yeoman Storage API to store answers](https://yeoman.io/authoring/storage.html) to questions within within a `.yo-rc.json`. This allows you to rerun the generator in the future to recieve updates without having to remember the answers you used or re-lookup them up.

   This also shows you how examples were done by answering the generator questions.

1. How can I extend the build settings of my app after generating?

   There are two options:

   - Use `npm run eject` or `yarn eject` to eject from react-scripts (this cannot be undone)
   - Use `customize-cra` and `react-app-rewired` to modify settings without ejecting (for more see the question about not ejecting)

1. How do I extend the webpack/babel config without ejecting?

   1. Install `customize-cra` and `react-app-rewired`:

      ```bash
      npm i --save-dev customize-cra react-app-rewired
      ```

   1. Add the following to the `scripts` section of your `package.json` file:

      ```json
      "start": "react-app-rewired start",
      "build": "react-app-rewired build",
      "eject": "react-app-rewired eject",
      "test": "react-app-rewired test"
      ```

   1. Add `config-overrides.js` that looks like so (any utils can be used in `override`):

      ```js
      const utils = require("customize-cra");

      module.exports = utils.override(
        utils.disableEsLint(),
        utils.useBabelRc()
      );
      ```

1. What happened to the `scss` from before? What if I want to do the same setup?

   It was removed in favor of Javascript styling through `*.styles.js` files. It is common to use Javascript styles with material-ui, so following this pattern allows mirrors their examples/docs.

   If you want to do the same setup as before, make sure you reference the scss files correctly (now that the build config is through `react-scripts`). For example if you want to import `styles/_base.scss` make sure you switch your imports like the following:

   ```diff
   - @import 'base';
   + @import 'styles/_base.scss';
   ```

## In the future

- Airbnb linting option (currently only `standard`)
- Option to use simple file structure instead of fractal pattern
- Open to ideas

## License

MIT © [Prescott Prue](http://prue.io)

[npm-image]: https://img.shields.io/npm/v/generator-react-firebase.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-react-firebase
[npm-downloads-image]: https://img.shields.io/npm/dm/generator-react-firebase.svg?style=flat-square
[quality-image]: https://npm.packagequality.com/shield/generator-react-firebase.svg?style=flat-square
[quality-url]: https://packagequality.com/#?package=generator-react-firebase
[build-status-image]: https://img.shields.io/github/workflow/status/prescottprue/generator-react-firebase/NPM%20Package%20Publish?style=flat-square
[build-status-url]: https://github.com/prescottprue/generator-react-firebase/actions
[coverage-image]: https://img.shields.io/codecov/c/github/prescottprue/generator-react-firebase.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/prescottprue/generator-react-firebase
[license-image]: https://img.shields.io/npm/l/generator-react-firebase.svg?style=flat-square
[license-url]: https://github.com/prescottprue/generator-react-firebase/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/prescottprue/generator-react-firebase
[firebase-ci-url]: https://github.com/prescottprue/firebase-ci
[react-loadable-url]: https://github.com/jamiebuilds/react-loadable
