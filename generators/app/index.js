'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
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
    name: 'includeTravis',
    message: 'Would to include config for Travis CI?',
    default: true
  },
  {
    type: 'confirm',
    name: 'includeRedux',
    message: 'Would to include redux for local state-management?',
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
    default: [1]
  }
]

const filesArray = [
  { src: '_README.md', dest: 'README.md' },
  { src: 'LICENSE', dest: 'LICENSE' },
  { src: 'CONTRIBUTING.md', dest: 'CONTRIBUTING.md' },
  { src: 'gitignore', dest: '.gitignore' },
  { src: 'eslintrc', dest: '.eslintrc' },
  { src: 'babelrc', dest: '.babelrc' },
  { src: 'bin/**', dest: 'bin' },
  { src: 'build/**', dest: 'build' },
  { src: 'config/**', dest: 'config' },
  { src: 'server/**', dest: 'server' },
  { src: 'src/config.js' },
  { src: 'src/index.html' },
  { src: 'src/main.js' },
  { src: 'src/theme.js' },
  { src: 'src/constants.js' },
  { src: 'src/components/**', dest: 'src/components' },
  { src: 'src/containers/**', dest: 'src/containers' },
  { src: 'src/layouts/**', dest: 'src/layouts' },
  { src: 'src/routes/**', dest: 'src/routes' },
  { src: 'src/static/humans.txt' },
  { src: 'src/static/robots.txt' },
  { src: 'src/static/User.png' },
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
        { src: 'database.rules.json', dest: 'database.rules.json' }
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
        { src: 'src/utils/form.js' },
        // TODO: Add question about including redux-cli blueprints (they contain template strings)
        // { src: 'blueprints/**', dest: 'blueprints' },
        { src: 'redux/_package.json', dest: 'package.json' }
      )
    } else {
      // Handle files that do not do internal string templateing well
      filesArray.push(
        { src: '_package.json', dest: 'package.json' },
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
    // this.npmInstall()
    this.yarnInstall() // does not support environments that do not have yarn installed
  }

}
