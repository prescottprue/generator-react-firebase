# <%= appName %>

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Getting Started

1. Install dependencies: `npm install`

2. Start Development server: `npm start`

## Production

`npm run build` command has been provided to build production bundle version of code. Production build is located in `dist` after build is complete. If you choose to use Travis-CI this is handled automatically using the included `.travis.yml`.

After build is complete, use `npm run production` to run production server

### Continuous Integration

A Travis-CI file has been included for enable CI builds (NOTE: [Travis can be used to deploy to certain services](https://docs.travis-ci.com/user/deployment/) like Heroku and S3 by using the `deploy` parameter)

## Deployment

Make sure that build happens before deployment and that `npm run production` is being run instead of `npm start`

### Heroku

A Procfile has been included for out of the box deployment to Heroku.

To deploy to Heroku through Travis:
1. Enable Repo on Travis-CI Account
2. Get API Key from Heroku Dashboard
3. Place API key in Travis-CI environment variables as `HEROKU` (settings page)


### Static Hosting vs Server-side Rendering

You have the option of hosting Static HTML file or enable Server-side Rendering through React and NodeJS. Server-side rendering allows pre-population of data into your application, which can improve SEO (Google is attempting to fix).

**Static**

Static hosting services such as Firebase Hosting or AWS S3 can be used to host the project. You will want to upload the entire dist folder.

**Server-Side**

In order to enable server-side rendering with React, you must host a NodeJS server. This server is included and can be run using `npm run production` (runs if deployed to Heroku).




[npm-image]: https://img.shields.io/npm/v/<%= appName %>.svg?style=flat-square
[npm-url]: https://npmjs.org/package/<%= appName %>
[npm-downloads-image]: https://img.shields.io/npm/dm/<%= appName %>.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/<%= githubUser %>/<%= appName %>/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/<%= githubUser %>/<%= appName %>
[daviddm-image]: https://img.shields.io/david/<%= githubUser %>/<%= appName %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= githubUser %>/<%= appName %>
[license-image]: https://img.shields.io/npm/l/<%= appName %>.svg?style=flat-square
[license-url]: https://github.com/<%= githubUser %>/<%= appName %>/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
