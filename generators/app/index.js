'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const commandExists = require('command-exists')
const utils = require('./utils')

const featureChoices = [
  {
    name: 'Version 1 of Material-UI (0.20.0 used otherwise)',
    answerName: 'materialv1',
    checked: true
  },
  {
    name: 'Firebase Functions (with ESNext support)',
    answerName: 'includeFunctions',
    checked: true
  },
  {
    name: 'Config for Travis CI',
    answerName: 'includeTravis',
    checked: true
  },
  {
    name: 'Tests',
    answerName: 'includeTests',
    checked: true
  },
  {
    answerName: 'includeBlueprints',
    name: 'Blueprints (for redux-cli)',
    checked: true
  }
]

const prompts = [
  {
    type: 'input',
    name: 'githubUser',
    message: 'Github Username',
    default: 'testuser'
  },
  {
    name: 'firebaseName',
    message: `Firebase instance (https://${chalk.red('<your instance>')}.firebaseio.com)`,
    required: true,
    default: 'react-redux-firebase',
    /* istanbul ignore next: Tested in utils */
    validate: utils.firebaseUrlValidate
  },
  {
    name: 'firebaseKey',
    message: 'Firebase apiKey',
    required: true
  },
  {
    type: 'confirm',
    name: 'includeRedux',
    message: 'Include redux for local state-management?',
    default: true
  },
  {
    type: 'confirm',
    name: 'includeFirestore',
    message: 'Use Firestore (RTDB still included)?',
    when: ({ includeRedux }) => includeRedux,
    default: false
  },
  {
    type: 'checkbox',
    message: 'Other Features To Include?',
    name: 'otherFeatures',
    choices: featureChoices
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
    default: 0
  },
  {
    type: 'confirm',
    name: 'useYarn',
    message: 'Use Yarn?',
    default: true
  }
]

const filesArray = [
  { src: '_README.md', dest: 'README.md' },
  { src: 'LICENSE', dest: 'LICENSE' },
  { src: 'project.config.js' },
  { src: '_package.json', dest: 'package.json' },
  { src: 'CONTRIBUTING.md', dest: 'CONTRIBUTING.md' },
  { src: 'gitignore', dest: '.gitignore' },
  { src: 'eslintrc', dest: '.eslintrc' },
  { src: 'eslintignore', dest: '.eslintignore' },
  // { src: 'babelrc', dest: '.babelrc' }, // config is in build/webpack.config.js
  { src: 'public/**', dest: 'public' },
  { src: 'build/lib/**', dest: 'build/lib' },
  { src: 'build/scripts/**', dest: 'build/scripts' },
  { src: 'build/webpack.config.js', dest: 'build/webpack.config.js' },
  { src: 'build/karma.config.js', dest: 'build/karma.config.js' },
  { src: 'server/**', dest: 'server' },
  { src: 'src/config.js' },
  { src: 'src/index.html' },
  { src: 'src/main.js' },
  { src: 'src/normalize.js' },
  { src: 'src/constants.js' },
  { src: 'src/components/**', dest: 'src/components' },
  { src: 'src/containers/**', dest: 'src/containers' },
  { src: 'src/layouts/**', dest: 'src/layouts' },
  { src: 'src/modules/**', dest: 'src/modules' },
  { src: 'src/routes/**', dest: 'src/routes' },
  { src: 'src/static/**', dest: 'src/static', noTemplating: true },
  { src: 'src/styles/**', dest: 'src/styles' },
  { src: 'tests/**', dest: 'tests' },
  { src: 'testseslintrc', dest: 'tests/.eslintrc' }
]

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: false })
    this.intialData = {
      version: '0.0.1',
      codeClimate: true,
      appPath: this.env.options.appPath,
      appName: this.options.name || path.basename(process.cwd()) || 'react-firebase'
    }
  }

  prompting () {
    this.log(yosay(
      `Welcome to the ${chalk.blue('React')} ${chalk.red('Firebase')} generator!`
    ))

    return this.prompt(prompts).then((props) => {
      this.answers = props
      // Map features array to answerNames
      if (props.otherFeatures) {
        featureChoices.forEach((choice) => {
          const matching = props.otherFeatures.find(feature => choice.name === feature)
          this.answers[choice.answerName] = matching
        })
      }
      this.data = Object.assign({}, this.intialData, props)
    })
  }

  writing () {
    if (this.answers.includeTravis) {
      filesArray.push({ src: '_travis.yml', dest: '.travis.yml' })
    }

    if (this.answers.deployTo === 'heroku') {
      filesArray.push(
        { src: 'Procfile', dest: 'Procfile' },
        { src: 'app.json', dest: 'app.json' }
      )
    }

    if (!this.answers.materialv1) {
      filesArray.push(
        { src: 'src/theme.js' }
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
      filesArray.push(
        { src: 'build/create-config.js', dest: 'build/create-config.js' }
      )
    }

    if (this.answers.includeRedux) {
      filesArray.push(
        { src: 'src/store/createStore.js', dest: 'src/store/createStore.js' },
        { src: 'src/store/reducers.js', dest: 'src/store/reducers.js' },
        { src: 'src/store/location.js', dest: 'src/store/location.js' },
        { src: 'src/utils/router.js', dest: 'src/utils/router.js' },
        { src: 'src/utils/components.js', dest: 'src/utils/components.js' },
        { src: 'src/utils/form.js' }
      )
      if (this.answers.includeFirestore) {
        filesArray.push(
          { src: 'firestore.indexes.json', dest: 'firestore.indexes.json' },
          { src: 'firestore.rules', dest: 'firestore.rules' }
        )
      }
    } else {
      // Handle files that do not do internal string templateing well
      filesArray.push(
        { src: 'src/utils/firebase.js' }
      )
    }

    if (this.answers.includeFunctions) {
      filesArray.push(
        { src: 'functions/.runtimeconfig.json', dest: 'functions/.runtimeconfig.json' },
        { src: 'functions/.eslintrc', dest: 'functions/.eslintrc' },
        { src: 'functions/.babelrc', dest: 'functions/.babelrc' },
        { src: 'functions/package.json', dest: 'functions/package.json' },
        { src: 'functions/src/indexUser/index.js', dest: 'functions/src/indexUser/index.js' },
        { src: 'functions/src/utils/async.js', dest: 'functions/src/utils/async.js' },
        { src: 'functions/test/.eslintrc', dest: 'functions/test/.eslintrc' },
        { src: 'functions/test/mocha.opts', dest: 'functions/test/mocha.opts' },
        { src: 'functions/test/setup.js', dest: 'functions/test/setup.js' },
        { src: 'functions/test/unit/**', dest: 'functions/test/unit' },
        { src: 'functions/index.js', dest: 'functions/index.js' },
        { src: 'functions/index.js', dest: 'functions/index.js' }
      )
    }

    if (this.answers.includeBlueprints) {
      filesArray.push(
        { src: 'blueprints/**', dest: 'blueprints', noTemplating: true }
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

  install () {
    let usedYarn = this.answers.useYarn
    return commandExists('yarn')
      .then(() => {
        if (!this.answers.useYarn) {
          console.log(chalk.yellow('Opted out of yarn even though it is available. Functions runtime suggests it so you have a lock file for node v6.11.*')) // eslint-disable-line no-console
          console.log(chalk.blue('Installing dependencies using NPM...')) // eslint-disable-line no-console
          // Main npm install then functions npm install
          return this.npmInstall()
        }
        usedYarn = true
        console.log(chalk.blue('Installing dependencies using Yarn...')) // eslint-disable-line no-console
        // Main yarn install then functions yarn install
        return this.yarnInstall()
      })
      .then(() => {
        if (this.answers.includeFunctions) {
          console.log(chalk.blue(`Installing functions dependencies using ${usedYarn ? 'Yarn' : 'NPM'}...`)) // eslint-disable-line no-console
          return usedYarn
            ? this.yarnInstall(undefined, { cwd: 'functions' })
            : this.npmInstall(undefined, { prefix: 'functions' })
        }
        return null
      })
      .catch((err) => {
        console.log(chalk.red('Error installing dependencies:'), err.message || err) // eslint-disable-line no-console
        return Promise.reject(err)
      })
  }
}
