# generator-react-firebase

> Yeoman generator for starting projects using React and Firebase (Redux optional)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Quality][quality-image]][quality-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Code Climate][climate-image]][climate-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Installation

Install [Yeoman](http://yeoman.io) and generator-react-firebase using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
npm install -g generator-react-firebase
```

## Getting Started

1. Create a project folder and enter it: `mkdir myProject && cd myProject`
1. Generate project: `yo react-firebase` (project will be named after current folder)
1. Start application by running `npm run start`

**NOTE**: Project will default to being named with the name of the folder that it is generated within (in this case myProject)

## Features
  * Application Navbar
  * Full Authentication (through Email, Google or Github)
  * Login/Signup Pages with input validation
  * Route protection (only view certain pages when logged in)
  * Account Page

## Uses
* [react](https://react-redux-firebase.com)
* [react-router](https://react-redux-firebase.com)
* [redux](http://redux.js.org/) *optional*
* [react-redux-firebase](https://react-redux-firebase.com)
* [redux-form](redux-form.com)
* [material-ui](https://material-ui.com)

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

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

### Deployment

A Travis-CI file has been included to enable CI builds. The correct configuration for the type of deployment you selected (S3 or Heroku) has been added to `.travis.yml` automatically based on [Travis settings](https://docs.travis-ci.com/user/deployment/).

#### Firebase

1. Login to [Firebase](firebase.google.com) (or Signup if you don't have an account) and create a new project
1. Install cli: `npm i -g firebase-tools`
1. Login: `firebase login`
1. Initialize project with `firebase init` then answer:
  * What file should be used for Database Rules?  -> `database.rules.json`
  * What do you want to use as your public directory? -> `dist`
  * Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
  * What Firebase project do you want to associate as default?  -> **your Firebase project name**
1. Set the following environment vars within the Travis-CI repo settings page:
  * `FIREBASE_TOKEN` - Your AWS key
1. The rest is handled automatically by [`firebase-ci`](https://github.com/prescottprue/firebase-ci)

#### AWS S3

Selecting AWS S3 from the deploy options when running the generator adds deploy configs in `.travis.yml`.

1. Get your AWS Key and Secret from the AWS Console Credentials page
2. Set the following environment vars within the Travis-CI repo settings page:
  * `AWS_KEY` - Your AWS key
  * `AWS_SECRET` - Your AWS secret
  * `S3_BUCKET` - Your S3 Bucket

#### Heroku

Selecting [Heroku](http://heroku.com) from the deploy options when running the generator adds a `Procfile` as well as deploy configs in `.travis.yml` for out of the box deployment.

To deploy:

1. Enable Repo on Travis-CI Account
2. Get API Key from Heroku Dashboard
3. Create a new App (this name will be used in travis env var)
4. Set the following environment vars within the Travis-CI repo settings page:
  * `HEROKU_KEY` - Your Heroku API key
  * `HEROKU_APP` - Your Heroku App name

## Sub generators

Sub generators are included to help speed up the application building process. You can run a sub-generator by calling `yo react-firebase:<name of sub-generator> <param1>`.

Example: To call the `component` sub-generator with "SomeThing" as the first parameter write: `yo react-firebase:component SomeThing`

#### Component

Generates a React component along with a matching scss file and places it within `/components`

A component is best for things that will be reused in multiple places. Our example

**result**

```
/app
--/components
----/Car
------Car.js
------Car.scss
```

*/app/components/Car.js:*

```javascript
import React, { Component, PropTypes } from 'react'
import classes from './Car.scss'

export default class Car extends Component {
  render () {
    return (
      <div className={classes.container}>

      </div>
    )
  }
}

```

#### Container

**NOTE:** Containers are synonymous with *Smart Components* and *Linked-State Components*

Redux is seen as one of the best state managers so it is implemented as by default.

To create a container named *Cars* run: `yo react-firebase:container Cars`

Creates a folder within `/containers` that matches the name provided. Below is the result of the command above being run:

```
/app
--/conatiners
----/Cars
------Cars.js
------Cars.scss
```

/app/containers/Cars.js:
```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

@firebaseConnect([
  // Syncs todos root to redux
  '/todos'
])
@connect(
  ({firebase}) => ({
    // Place list of todos into this.props.todos
    todos: dataToJS(firebase, '/todos'),
  })
)
export default class Todos extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.object
  }

  render() {
    const { firebase, todos } = this.props;

    // Add a new todo to firebase
    const handleAdd = () => {
      const { newTodo } = this.refs
      firebase.push('/todos', { text:newTodo.value, done:false })
      newTodo.value = ''
    }

    // Build Todos list if todos exist and are loaded
    const todosList = !isLoaded(todos)
                        ? 'Loading'
                        : isEmpty(todos)
                          ? 'Todo list is empty'
                          : Object.keys(todos).map(
                              (key, id) => (
                                <TodoItem key={key} id={id} todo={todos[key]}/>
                              )
                            )

    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {todosList}
        </ul>
        <input type="text" ref="newTodo" />
        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    )
  }
}
```

## Examples

Complete examples of generator output available in [Examples](https://github.com/prescottprue/generator-react-firebase/tree/master/examples)

## In the future
* Non-decorators implementation for props binding
* Option to use simple file structure instead of fractal pattern
* Smart Container Generator - Prompt for props/state vars (which Firebase location to bind to props)
* Store previous answers and use them as defaults
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
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/generator-react-firebase.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/generator-react-firebase
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/prescottprue/generator-react-firebase.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/prescottprue/generator-react-firebase
[license-image]: https://img.shields.io/npm/l/generator-react-firebase.svg?style=flat-square
[license-url]: https://github.com/prescottprue/generator-react-firebase/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/

[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/prescottprue/generator-react-firebase
