# generator-react-firebase

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

> Starter that uses React and Firebase (with Redux)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-firebase using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-firebase
```

Then generate your new project:

```bash
yo react-firebase
```

## Creating a project
1. Create a project folder and enter it: `mkdir myProject && cd myProject`

2. Initiate the generator: `yo react-firebase`

**NOTE**: Project will default to being named with the name of the folder that it is generated within (in this case myProject)

## Sub generators

Sub generators included are run by calling `yo react-firebase:<name of sub-generator> <param1>`.

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

### Redux specific

#### Container

**NOTE:** Containers are synonymous with *Smart Components* and *Linked-State Components*

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
