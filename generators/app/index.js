'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const semver = require('semver')
const path = require('path')
const captialize = require('lodash/capitalize')
const commandExistsSync = require('command-exists').sync
const utils = require('./utils')

const featureChoices = [
  {
    name: 'Firebase Functions (with ESNext support)',
    answerName: 'includeFunctions',
    checked: true
  },
  {
    answerName: 'includeMessaging',
    name: 'Firebase Cloud Messaging',
    when: currentAnswers => !!currentAnswers.messagingSenderId,
    checked: true
  },
  {
    name: 'Config for Continuous Integration',
    answerName: 'includeCI',
    checked: true
  },
  {
    name: 'Component Tests (Jest)',
    answerName: 'includeComponentTests',
    checked: false
  },
  {
    name: 'Cloud Functions Tests (Mocha + Chai)',
    answerName: 'includeFunctionsTests',
    checked: false
  },
  {
    name: 'UI Tests (Cypress)',
    answerName: 'includeUiTests',
    checked: false
  },
  {
    answerName: 'includeAnalytics',
    name: 'Google Analytics Utils (react-ga)',
    checked: true
  },
  {
    answerName: 'includeErrorHandling',
    name: 'Stackdriver Error Reporting (Client side to match cloud functions)',
    checked: true
  },
  {
    answerName: 'includeSentry',
    name: 'Sentry.io Error Reporting',
    checked: true
  }
]

function checkAnswersForFeature(currentAnswers, featureName) {
  const { otherFeatures } = currentAnswers
  const matchingFeature = featureChoices.find(
    choice => choice.answerName === featureName
  )
  return otherFeatures.includes(matchingFeature.name)
}

const prompts = [
  {
    type: 'input',
    name: 'githubUser',
    message: 'Github Username',
    default: 'testuser',
    store: true
  },
  {
    name: 'firebaseName',
    message: `Firebase projectId (Firebase Console > Authentication > Web Setup)`,
    required: true,
    /* istanbul ignore next: Tested in utils */
    validate: utils.firebaseUrlValidate,
    store: true
  },
  {
    name: 'firebaseKey',
    message: 'Firebase apiKey',
    required: true,
    store: true
  },
  {
    type: 'confirm',
    name: 'includeRedux',
    message: 'Include redux for local state-management?',
    default: true,
    store: true
  },
  {
    type: 'confirm',
    name: 'includeFirestore',
    message: 'Use Firestore (RTDB still included)?',
    default: true,
    store: true
  },
  {
    type: 'checkbox',
    message: 'Other Features To Include:',
    name: 'otherFeatures',
    choices: featureChoices,
    store: true
  },
  {
    name: 'messagingSenderId',
    message: 'Firebase messagingSenderId',
    required: true,
    when: currentAnswers =>
      checkAnswersForFeature(currentAnswers, 'includeMessaging'),
    store: true
  },
  {
    name: 'firebasePublicVapidKey',
    when: currentAnswers => !!currentAnswers.messagingSenderId,
    message:
      'Firebase Messaging Public Vapid Key (Firebase Console > Messaging > Web Push Certs)',
    required: true,
    store: true
  },
  {
    name: 'sentryDsn',
    message: 'Sentry DSN',
    when: currentAnswers =>
      checkAnswersForFeature(currentAnswers, 'includeSentry')
  },
  {
    type: 'list',
    name: 'ciProvider',
    when: currentAnswers => checkAnswersForFeature(currentAnswers, 'includeCI'),
    choices: [
      {
        name: 'Gitlab',
        value: 'gitlab'
      },
      {
        name: 'Travis',
        value: 'travis'
      }
    ],
    message: 'What provider which you like to use for CI?',
    default: 0,
    store: true
  },
  {
    type: 'list',
    name: 'deployTo',
    choices: [
      {
        name: 'Firebase',
        value: 'firebase'
      },
      {
        name: 'AWS S3',
        value: 's3'
      },
      {
        name: 'Heroku',
        value: 'heroku'
      }
    ],
    message: 'What service are you deploying to?',
    default: 0,
    store: true
  },
  {
    type: 'confirm',
    name: 'useYarn',
    message: 'Use Yarn?',
    // Only offer if using versions of node/npm that benift from yarn (adds lock file when not there before)
    when: () =>
      semver.satisfies(process.version, '<=6.0.0') && commandExistsSync('yarn'),
    default: false
  }
]

const filesArray = [
  { src: '_README.md', dest: 'README.md' },
  { src: 'jsconfig.json' },
  { src: 'LICENSE' },
  { src: '_package.json', dest: 'package.json' },
  { src: 'CONTRIBUTING.md' },
  { src: 'gitignore', dest: '.gitignore' },
  { src: 'env.local', dest: '.env.local' },
  { src: 'eslintrc.js', dest: '.eslintrc.js' },
  { src: 'eslintignore', dest: '.eslintignore' },
  // { src: 'babelrc', dest: '.babelrc' }, // config is in build/webpack.config.js
  // { src: 'public/**', dest: 'public' }, // individual files copied
  { src: 'public/favicon.ico' },
  { src: 'public/humans.txt' },
  { src: 'public/index.html' },
  { src: 'public/manifest.json' },
  { src: 'public/robots.txt' },
  { src: 'src/config.js' },
  { src: 'src/index.js' },
  { src: 'src/index.css' },
  { src: 'src/constants/**', dest: 'src/constants' },
  { src: 'src/components/**', dest: 'src/components' },
  { src: 'src/containers/**', dest: 'src/containers' },
  { src: 'src/utils/index.js' },
  { src: 'v1theme.js', dest: 'src/theme.js' },
  { src: 'src/containers/Navbar/Navbar.styles.js' },
  { src: 'src/layouts/**', dest: 'src/layouts' },
  { src: 'src/modules/**', dest: 'src/modules' },
  { src: 'src/routes/**', dest: 'src/routes' },
  { src: 'src/static/**', dest: 'src/static', noTemplating: true }
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: false })
    const appName =
      this.options.name || path.basename(process.cwd()) || 'react-firebase'
    this.intialData = {
      version: '0.0.1',
      messagingSenderId: null,
      materialv1: true,
      firebasePublicVapidKey: null,
      includeMessaging: false,
      includeSentry: false,
      includeUiTests: false,
      includeComponentTests: false,
      includeFunctionsTests: false,
      includeFunctions: false,
      sentryDsn: null,
      ciProvider: null,
      codeClimate: true,
      appPath: this.env.options.appPath,
      appName,
      capitalAppName: captialize(appName)
    }
  }

  prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.blue('React')} ${chalk.red(
          'Firebase'
        )} generator!`
      )
    )

    return this.prompt(prompts).then(props => {
      this.answers = props
      // Map features array to answerNames
      if (props.otherFeatures) {
        featureChoices.forEach(choice => {
          const matching = props.otherFeatures.find(
            feature => choice.name === feature
          )
          this.answers[choice.answerName] = !!matching
        })
      }
      this.data = Object.assign({}, this.intialData, this.answers)
    })
  }

  writing() {
    // CI Settings
    if (this.answers.includeCI) {
      if (this.answers.ciProvider === 'travis') {
        filesArray.push({ src: '_travis.yml', dest: '.travis.yml' })
      } else {
        filesArray.push({ src: 'gitlab-ci.yml', dest: '.gitlab-ci.yml' })
      }
    }

    if (this.answers.deployTo === 'heroku') {
      filesArray.push(
        { src: 'Procfile', dest: 'Procfile' },
        { src: 'app.json', dest: 'app.json' }
      )
    }

    if (this.answers.deployTo === 'firebase') {
      filesArray.push(
        { src: 'firebase.json', dest: 'firebase.json' },
        { src: '_firebaserc', dest: '.firebaserc' },
        { src: 'database.rules.json', dest: 'database.rules.json' },
        { src: 'storage.rules', dest: 'storage.rules' }
      )
    } else {
      // TODO: Replace this with something else
      // filesArray.push({
      //   src: 'build/create-config.js',
      //   dest: 'build/create-config.js'
      // })
    }

    if (this.answers.includeRedux) {
      filesArray.push(
        { src: 'src/store/createStore.js' },
        { src: 'src/store/reducers.js' },
        { src: 'src/store/location.js' },
        { src: 'src/utils/router.js' },
        { src: 'src/utils/components.js' },
        { src: 'src/utils/form.js' }
      )

      // Firestore
      if (this.answers.includeFirestore) {
        filesArray.push(
          { src: 'firestore.indexes.json', dest: 'firestore.indexes.json' },
          { src: 'firestore.rules', dest: 'firestore.rules' }
        )
      }
    } else {
      // Handle files that do not do internal string templateing well
      filesArray.push({ src: 'src/utils/firebase.js' })
    }

    // Cloud Functions
    if (this.answers.includeFunctions) {
      filesArray.push(
        { src: 'functions/.runtimeconfig.json' },
        { src: 'functions/jsconfig.json' },
        { src: 'functions/.eslintrc.js' },
        { src: 'functions/.babelrc' },
        { src: 'functions/package.json' },
        { src: 'functions/src/indexUser/index.js' },
        { src: 'functions/src/utils/async.js' },
        { src: 'functions/index.js' }
      )
    }

    // Cloud Functions Tests
    if (this.answers.includeFunctionsTests) {
      filesArray.push(
        { src: 'functions/test/.eslintrc.js' },
        { src: 'functions/test/mocha.opts' },
        { src: 'functions/test/setup.js' },
        { src: 'functions/test/unit/**', dest: 'functions/test/unit' }
      )
    }

    // UI Tests
    if (this.answers.includeUiTests) {
      filesArray.push(
        { src: 'cypress/.eslintrc.js', dest: 'cypress/.eslintrc.js' },
        { src: 'cypress/**', dest: 'cypress' },
        { src: 'cypress.env.json' },
        { src: 'cypress.json' }
      )
    }

    // React Component Tests
    if (this.answers.includeComponentTests) {
      filesArray.push(
        { src: 'jestTests/**', dest: 'src' },
        { src: 'scripts/**', dest: 'scripts' },
        { src: 'env.test', dest: '.env.test' }
      )
    }

    if (this.answers.includeMessaging) {
      filesArray.push(
        { src: 'src/utils/firebaseMessaging.js' },
        { src: 'public/firebase-messaging-sw.js' }
      )
    }

    if (this.answers.includeErrorHandling) {
      filesArray.push({ src: 'src/utils/errorHandler.js' })
    }

    if (this.answers.includeAnalytics) {
      filesArray.push(
        { src: 'src/utils/analytics.js' },
        { src: 'src/utils/index.js' }
      )
    }

    filesArray.forEach(file => {
      if (file.noTemplating || file.src.indexOf('.png') !== -1) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file)
        )
      }
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data
      )
    })
  }

  install() {
    const { useYarn } = this.answers
    // Promise chaining used since this.npmInstall.then not a function
    return Promise.resolve()
      .then(() => {
        if (useYarn === false) {
          /* eslint-disable no-console */
          console.log(
            chalk.yellow('Opted out of yarn even though it is available.')
          )
          /* eslint-enable no-console */
        }
        if (!useYarn) {
          console.log(chalk.blue('Installing dependencies using NPM...')) // eslint-disable-line no-console
          // Main npm install then functions npm install
          return this.npmInstall()
        }
        console.log(chalk.blue('Installing dependencies using Yarn...')) // eslint-disable-line no-console
        /* eslint-disable no-console */
        console.log(
          chalk.blue(
            'Note: Yarn is no longer nessesary since cloud functions supports node 8 which has package-lock.json support.'
          )
        )
        /* eslint-enable no-console */
        // Main yarn install then functions yarn install
        return this.yarnInstall()
      })
      .then(() => {
        if (this.answers.includeFunctions) {
          /* eslint-disable no-console */
          console.log(
            chalk.blue(
              `Installing functions dependencies using ${
                useYarn ? 'Yarn' : 'NPM'
              }...`
            )
          )
          /* eslint-enable no-console */
          return useYarn
            ? this.yarnInstall(undefined, { cwd: 'functions' })
            : this.npmInstall(undefined, { prefix: 'functions' })
        }
        return null
      })
      .catch(err => {
        /* eslint-disable no-console */
        console.log(
          chalk.red('Error installing dependencies:'),
          err && err.message
        )
        /* eslint-enable no-console */
        return Promise.reject(err)
      })
  }
}
