# generator-react-firebase

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

> Starter that uses React and Firebase (Redux optional)

## Installation

Install [Yeoman](http://yeoman.io) and generator-react-firebase using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
npm install -g generator-react-firebase
```


## Getting Started

1. Create a project folder and enter it: `mkdir myProject && cd myProject`

2. Generate project: `yo react-firebase`

**NOTE**: Project will default to being named with the name of the folder that it is generated within (in this case myProject)

## Project

### Development
Run `npm start` to start live reloading development server

### Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

A Travis-CI file has been included to enable CI builds. The correct configuration for the type of deployment you selected (S3 or Heroku) has been added to `.travis.yml` automatically basied on [Travis settings](https://docs.travis-ci.com/user/deployment/).

**Note:** Deployment to Firebase through Travis-CI is not yet functional, but is on the roadmap

### Deployment

#### Firebase

1. Login to [Firebase](firebase.google.com) (or Signup if you don't have an account) and create a new project
2. Install cli: `npm i -g firebase-tools`
3. Login: `firebase login`
4. Initialize project with `firebase init` then answer:
  * What file should be used for Database Rules?  -> `database.rules.json`
  * What do you want to use as your public directory? -> `build`
  * Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
  * What Firebase project do you want to associate as default?  -> **your Firebase project name**
5. Build Project: `npm run build`
6. Confirm Firebase config by running locally: `firebase serve`
7. Deploy to firebase: `firebase deploy`

#### AWS S3

Selecting AWS S3 from the deploy options when running the generator adds deploy configs in `.travis.yml`.

1. Get your AWS Key and Secret from the AWS Console Credentials page
2. Set the following environment vars within the Travis-CI repo settings page:
  * AWS_KEY - Your AWS key
  * AWS_SECRET - Your AWS secret
  * BUCKET - Your S3 Bucket

#### Heroku

Selecting [Heroku](http://heroku.com) from the deploy options when running the generator adds a `Procfile` as well as deploy configs in `.travis.yml` for out of the box deployment.

To deploy to [Heroku](http://heroku.com) through [Travis-CI](http://travis-ci.org):
1. Enable Repo on Travis-CI Account
2. Get API Key from Heroku Dashboard
3. Create a new App (this name will be used in travis env var)
4. Set the following environment vars within the Travis-CI repo settings page:
  * HEROKU_KEY - Your Heroku API key
  * APP - Your Heroku App name


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
import './Car.scss'

export default class Car extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="Car">

      </div>
    )
  }
}

```

#### Container

**NOTE:** Containers are synonymous with *Smart Components* and *Linked-State Components*

Redux is seen as one of the best state managers so it is implemented as the default state manager. [redux-react-firebase](https://www.npmjs.com/package/redux-react-firebase)

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
import { firebase, helpers } from 'redux-react-firebase'

import './Cars.scss'

const { isLoaded, isEmpty,  dataToJS, pathToJS } = helpers

import './Login.scss'

// Props decorators
@firebase([
  'cars'
])
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    profile: pathToJS(firebase, 'profile')
  })
)
export default class Cars extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {

  }

  render () {
    return (
      <div className="Cars">

      </div>
    )
  }
}
```

## Examples

Complete examples available in [Examples](https://github.com/prescottprue/generator-react-firebase/tree/master/examples)

### Server-side Rendering

You have the option to enable Server-side Rendering through React and NodeJS. Server-side rendering allows pre-population of data into your application, which can improve SEO (Google is improving static crawling).

In order to enable server-side rendering with React, you must host a NodeJS server. This server is included and can be run using `npm run production` (runs if deployed to Heroku).


## In the future
* Prompt for deployment options
* Option to not include redux
* Prompt about props/state vars in Container (which Firebase location to bind to props)
* Non-decorators implementation for props binding (pure redux and firebase implementations)
* Open to ideas

## License

MIT © [Scott Prue](prue.io)

[npm-image]: https://img.shields.io/npm/v/generator-react-firebase.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-react-firebase
[npm-downloads-image]: https://img.shields.io/npm/dm/generator-react-firebase.svg?style=flat-square
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
