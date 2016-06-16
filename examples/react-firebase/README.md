# react-firebase

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Getting Started

1. Install dependencies: `npm install`

2. Start Development server: `npm start`

### Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

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


[npm-image]: https://img.shields.io/npm/v/react-firebase.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-firebase
[travis-image]: https://img.shields.io/travis/testuser/react-firebase/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/testuser/react-firebase
[daviddm-image]: https://img.shields.io/david/testuser/react-firebase.svg?style=flat-square
[daviddm-url]: https://david-dm.org/testuser/react-firebase

[license-image]: https://img.shields.io/npm/l/react-firebase.svg?style=flat-square
[license-url]: https://github.com/testuser/react-firebase/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
