# <%= appName %>

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Code Climate][climate-image]][climate-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Project

### Development
Run `npm run dev` to start live reloading development server

### Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

A Travis-CI file has been included to enable CI builds. The correct configuration for the type of deployment you selected (S3 or Heroku) has been added to `.travis.yml` automatically based on [Travis settings](https://docs.travis-ci.com/user/deployment/).

**Note:** Deployment to Firebase through Travis-CI is not yet functional, but is on the roadmap

## License

MIT

[npm-image]: https://img.shields.io/npm/v/<%=appName%>.svg?style=flat-square
[npm-url]: https://npmjs.org/package/<%= appName %>
[npm-downloads-image]: https://img.shields.io/npm/dm/<%= appName %>.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/<%= appName %>/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/<%= appName %>
[daviddm-image]: https://img.shields.io/david/<%= appName %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= appName %>
[climate-image]: https://img.shields.io/codeclimate/github/<%= appName %>.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/<%= appName %>
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/<%= appName %>.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/<%= appName %>
[license-image]: https://img.shields.io/npm/l/<%= appName %>.svg?style=flat-square
[license-url]: https://github.com/<%= appName %>/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/

[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/<%= appName %>
