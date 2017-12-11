'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const commandExists = require('command-exists')
const utils = require('./utils')

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
    message: 'Would to include redux for local state-management?',
    default: true
  },
  {
    type: 'confirm',
    name: 'includeFirestore',
    message: 'Include Firestore?',
    when: ({ includeRedux }) => includeRedux,
    default: true
  },
  {
    type: 'confirm',
    name: 'includeTravis',
    message: 'Would to include config for Travis CI?',
    default: true
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
    name: 'includeTests',
    message: 'Include Tests?',
    default: true
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
  { src: 'src/theme.js' },
  { src: 'src/constants.js' },
  { src: 'src/components/**', dest: 'src/components' },
  { src: 'src/containers/**', dest: 'src/containers' },
  { src: 'src/layouts/**', dest: 'src/layouts' },
  { src: 'src/modules/**', dest: 'src/modules' },
  { src: 'src/routes/**', dest: 'src/routes' },
  { src: 'src/static/**', dest: 'src/static' },
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
        // { src: 'src/actions/**', dest: 'src/actions' },
        // { src: 'src/reducers/**', dest: 'src/reducers' },
        { src: 'src/store/createStore.js', dest: 'src/store/createStore.js' },
        { src: 'src/store/reducers.js', dest: 'src/store/reducers.js' },
        { src: 'src/store/location.js', dest: 'src/store/location.js' },
        { src: 'src/utils/router.js', dest: 'src/utils/router.js' },
        { src: 'src/utils/components.js', dest: 'src/utils/components.js' },
        { src: 'src/utils/form.js' }
        // TODO: Add question about including redux-cli blueprints (they contain template strings)
        // { src: 'blueprints/**', dest: 'blueprints' },
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
        { src: 'src/utils/**', dest: 'src/utils' }
      )
    }
    filesArray.forEach(file => {
      if (file.src.indexOf('.png') !== -1) {
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
    return commandExists('yarn')
      .then(() => {
        if (!this.answers.useYarn) {
          console.log(chalk.yellow('Opted out of yarn even though it is available. Functions runtime suggests it so you have a lock file for node v6.11.*')) // eslint-disable-line no-console
          return this.npmInstall()
        }
        console.log(chalk.blue('Using Yarn!')) // eslint-disable-line no-console
        return this.yarnInstall()
      })
      .catch(() => {
        this.npmInstall()
      })
  }
}
