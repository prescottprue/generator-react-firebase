'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const capitalize = require('lodash/capitalize')
const commandExistsSync = require('command-exists').sync
const utils = require('./utils')

const featureChoices = [
  {
    name: 'Continuous Integration config',
    answerName: 'includeCI',
    checked: true
  },
  {
    answerName: 'includeMessaging',
    name: 'Firebase Cloud Messaging',
    when: (currentAnswers) => !!currentAnswers.messagingSenderId,
    checked: true
  },
  {
    name: 'Firebase Functions (with ESNext support)',
    answerName: 'includeFunctions',
    checked: true
  },
  {
    name: 'Tests for Firebase Functions (Mocha/Chai or Jest)',
    answerName: 'includeFunctionsTests',
    checked: true
  },
  {
    name: 'Tests for React Components (Jest)',
    answerName: 'includeComponentTests',
    checked: false
  },
  {
    name: 'Tests for UI (Cypress)',
    answerName: 'includeUiTests',
    checked: false
  },
  {
    answerName: 'includeAnalytics',
    name: 'Firebase Analytics',
    checked: true
  },
  {
    answerName: 'includeSentry',
    name: 'Error Tracking (Sentry.io)',
    checked: true
  },
  {
    answerName: 'includeErrorHandling',
    name: 'Client Side Error Reporting (Stackdriver)',
    checked: true
  }
]

function checkAnswersForFeature(currentAnswers, featureName) {
  const { otherFeatures } = currentAnswers
  const matchingFeature = featureChoices.find(
    (choice) => choice.answerName === featureName
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
    type: 'confirm',
    name: 'includeRedux',
    message: 'Include redux for local state-management?',
    default: false,
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
    type: 'list',
    name: 'functionsTestTool',
    when: (currentAnswers) =>
      checkAnswersForFeature(currentAnswers, 'includeFunctions'),
    choices: [
      {
        name: 'Jest',
        value: 'jest'
      },
      {
        name: 'Mocha/Chai',
        value: 'mocha'
      }
    ],
    message: 'What tool would you like to use for testing cloud functions?',
    default: 0,
    store: true
  },
  {
    type: 'confirm',
    name: 'typescriptCloudFunctions',
    when: (currentAnswers) =>
      checkAnswersForFeature(currentAnswers, 'includeFunctions'),
    message: 'Use Typescript for cloud functions?',
    default: true,
    store: true
  },
  {
    name: 'firebaseKey',
    message: 'Firebase apiKey',
    required: true,
    store: true
  },
  {
    name: 'firebaseProjectId',
    message: `Firebase projectId (Firebase Console > Authentication > Web Setup)`,
    required: true,
    /* istanbul ignore next: Tested in utils */
    validate: utils.validateFirebaseName,
    store: true
  },
  {
    name: 'messagingSenderId',
    message: 'Firebase Messaging Sender ID',
    when: (currentAnswers) =>
      checkAnswersForFeature(currentAnswers, 'includeMessaging'),
    store: true
  },
  {
    name: 'appId',
    message: 'Firebase App Id',
    store: true
  },
  {
    name: 'measurementId',
    message: 'Firebase Analytics Measurement ID (leave blank to skip)',
    when: (currentAnswers) =>
      checkAnswersForFeature(currentAnswers, 'includeAnalytics'),
    store: true
  },
  {
    name: 'firebasePublicVapidKey',
    when: (currentAnswers) => !!currentAnswers.messagingSenderId,
    message:
      'Firebase Messaging Public Vapid Key (Firebase Console > Messaging > Web Push Certs)',
    required: true,
    store: true
  },
  {
    name: 'sentryDsn',
    message: 'Sentry DSN (leave blank to skip)',
    when: (currentAnswers) =>
      checkAnswersForFeature(currentAnswers, 'includeSentry')
  },
  {
    type: 'list',
    name: 'ciProvider',
    when: (currentAnswers) =>
      checkAnswersForFeature(currentAnswers, 'includeCI'),
    choices: [
      {
        name: 'Github Actions',
        value: 'githubActions'
      },
      {
        name: 'Gitlab',
        value: 'gitlab'
      }
    ],
    message: 'What provider which you like to use for CI?',
    default: 0,
    store: true
  },
  {
    type: 'confirm',
    name: 'useYarn',
    message: 'Use Yarn?',
    when: () => commandExistsSync('yarn'),
    default: true
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
  // { src: 'public/**', dest: 'public' }, // individual files copied
  { src: 'public/favicon.ico' },
  { src: 'public/humans.txt' },
  { src: 'public/index.html' },
  { src: 'public/manifest.json' },
  { src: 'public/robots.txt' },
  { src: 'src/index.jsx' },
  { src: 'src/index.css' },
  { src: 'src/constants/**', dest: 'src/constants' },
  {
    src: 'src/components/LoadingSpinner'
  },
  { src: 'src/components/Navbar' },
  { src: 'src/App.jsx' },
  { src: 'src/theme.js' },
  { src: 'src/layouts/**', dest: 'src/layouts' },
  { src: 'src/routes/**', dest: 'src/routes' },
  { src: 'src/static/**', dest: 'src/static', noTemplating: true },
  { src: 'src/modules/**', dest: 'src/modules' },
  { src: 'src/utils/router.jsx' },
  { src: 'src/utils/form.js' },
  { src: '.github/ISSUE_TEMPLATE/**', dest: '.github/ISSUE_TEMPLATE' },
  { src: '.github/CONTRIBUTING.md' },
  { src: '.github/dependabot.yml' },
  { src: '.github/PULL_REQUEST_TEMPLATE.md' },
  { src: 'firebase.json', dest: 'firebase.json' },
  { src: '_firebaserc', dest: '.firebaserc' },
  { src: 'database.rules.json', dest: 'database.rules.json' },
  { src: 'storage.rules', dest: 'storage.rules' }
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: false })
    this.argument('skipInstall', { type: Boolean, required: false })
    const appName =
      this.options.name || path.basename(process.cwd()) || 'react-firebase'
    this.initialData = {
      version: '0.0.1',
      messagingSenderId: null,
      measurementId: null,
      appId: null,
      materialv1: true,
      firebasePublicVapidKey: null,
      includeMessaging: false,
      includeSentry: false,
      includeUiTests: false,
      includeComponentTests: false,
      includeFunctionsTests: false,
      includeFunctions: false,
      functionsTestTool: false,
      sentryDsn: null,
      ciProvider: null,
      codeClimate: true,
      typescriptCloudFunctions: true,
      appPath: this.env.options.appPath,
      appName,
      capitalAppName: capitalize(appName),
      useYarn: commandExistsSync('yarn')
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

    return this.prompt(prompts).then((props) => {
      this.answers = props
      // Map features array to answerNames
      if (props.otherFeatures) {
        featureChoices.forEach((choice) => {
          const matching = props.otherFeatures.find(
            (feature) => choice.name === feature
          )
          this.answers[choice.answerName] = !!matching
        })
      }
      this.data = Object.assign({}, this.initialData, this.answers)
    })
  }

  writing() {
    const ciFilesByProvider = {
      githubActions: { src: '.github/workflows/**', dest: '.github/workflows' },
      gitlab: { src: 'gitlab-ci.yml', dest: '.gitlab-ci.yml' }
    }
    // CI Settings
    if (this.answers.includeCI) {
      const ciFilesSettings = ciFilesByProvider[this.answers.ciProvider]
      if (ciFilesSettings) {
        filesArray.push(ciFilesSettings)
      }
    }

    const ignorePaths = []
    if (this.answers.includeRedux) {
      filesArray.push(
        { src: 'src/store/createStore.js' },
        { src: 'src/store/reducers.js' },
        { src: 'src/store/location.js' },
        { src: 'src/defaultConfig.js' },
        { src: 'src/initializeFirebase.js' }
      )
    } else {
      // Handle files that do not do internal string templateing well
      ignorePaths.push('**/NewProjectDialog.enhancer.js')
      ignorePaths.push('**/AccountForm.enhancer.js')
      ignorePaths.push('**/AccountPage.enhancer.js')
      ignorePaths.push('**/ProjectPage.enhancer.js')
      ignorePaths.push('**/ProjectsPage.enhancer.js')
      ignorePaths.push('**/SignupForm.enhancer.js')
      ignorePaths.push('**/SignupPage.enhancer.js')
      ignorePaths.push('**/LoginPage.enhancer.js')
    }
    // Firestore
    if (this.answers.includeFirestore) {
      filesArray.push(
        { src: 'firestore.indexes.json', dest: 'firestore.indexes.json' },
        { src: 'firestore.rules', dest: 'firestore.rules' }
      )
      if (!this.answers.includeRedux) {
        filesArray.push({
          src: 'src/components/SetupFirestore',
          dest: 'src/components/SetupFirestore'
        })
      }
    }
    // Cloud Functions
    if (this.answers.includeFunctions) {
      filesArray.push(
        { src: 'functions/.runtimeconfig.json' },
        { src: 'functions/jsconfig.json' },
        { src: 'functions/.eslintrc.js' },
        { src: 'functions/package.json' },
        { src: 'functions/index.js' }
      )
      if (this.answers.typescriptCloudFunctions) {
        filesArray.push(
          { src: 'functions/tsconfig.json' },
          { src: 'functions/tsSrc', dest: 'functions/src' }
        )
      } else {
        filesArray.push({ src: 'functions/.babelrc' }, { src: 'functions/src' })
      }
    }

    // Cloud Functions Tests
    if (this.answers.includeFunctionsTests) {
      const testConfigFile =
        this.answers.functionsTestTool === 'jest'
          ? 'jest.config.js'
          : '.mocharc.js'
      filesArray.push(
        { src: `functions/${testConfigFile}` },
        {
          src: `functions/scripts/testSetup.${
            this.answers.typescriptCloudFunctions ? 't' : 'j'
          }s`
        },
        {
          src: 'functionsTests/indexUser/indexUser.spec.js',
          dest: `functions/src/indexUser/indexUser.spec.${
            this.answers.typescriptCloudFunctions ? 't' : 'j'
          }s`
        }
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
      filesArray.push({ src: 'jestTests/**', dest: 'src' })
    }

    if (this.answers.includeMessaging) {
      filesArray.push(
        { src: 'public/firebase-messaging-sw.js' },
        {
          src: 'src/components/SetupMessaging/**',
          dest: 'src/components/SetupMessaging'
        }
      )
    }

    if (this.answers.includeErrorHandling) {
      filesArray.push({ src: 'src/utils/errorHandler.js' })
    }

    if (this.answers.includeAnalytics) {
      filesArray.push(
        { src: 'src/components/SetupAnalytics/index.js' },
        { src: 'src/components/SetupAnalytics/SetupAnalytics.jsx' }
      )
      if (this.answers.includeRedux) {
        filesArray.push({ src: 'src/utils/analytics.js' })
      }
    }

    filesArray.forEach((file) => {
      if (file.noTemplating || file.src.includes('.png')) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file),
          { globOptions: { ignore: ignorePaths } }
        )
      }
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data,
        {}, // templateOptions    // not here
        { globOptions: { ignore: ignorePaths } } // < but here
      )
    })
  }

  install() {
    /* eslint-disable no-console */
    console.log(chalk.blue('\nProject Generated successfully'))
    const yarnExists = commandExistsSync('yarn')
    const installCommand = yarnExists ? 'yarnInstall' : 'npmInstall'
    const depManagerName = yarnExists ? 'Yarn' : 'NPM'
    if (!this.options.skipInstall) {
      console.log(`Installing dependencies using ${depManagerName}...`)
      // Promise chaining used since this.npmInstall.then not a function
      return Promise.resolve()
        .then(() => {
          return this[installCommand]()
        })
        .then(() => {
          console.log(
            chalk.blue(
              `Dependencies successfully installed using ${depManagerName}...`
            )
          )
          if (this.answers.includeFunctions) {
            console.log(
              chalk.blue(
                `Installing functions dependencies using ${depManagerName}...`
              )
            )
            return this[installCommand](undefined, {
              [yarnExists ? 'cwd' : 'prefix']: 'functions'
            })
          }
        })
      /* eslint-enable no-console */
    }
  }
}
