'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var path = require('path')

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.argument('name', { type: String, required: false })
    this.appName = this.name || path.basename(process.cwd()) || 'react-firebase'
    this.appPath = this.env.options.appPath
    this.version = '0.0.1'
  },
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('React Firebase') + ' generator!'
    ))

    var prompts = [
      {
        type: 'input',
        name: 'githubUser',
        message: 'Github Username',
        default: 'testuser'
      },
      {
        name: 'firebaseName',
        message: 'Firebase instance (https://' + chalk.red('<your instance>') + '.firebaseio.com)',
        required: true,
        default: 'redux-firebasev3',
        validate: function (input) {
          if (!input) return false
          if (input.match('http') || input.match('firebaseio.com')) {
            return chalk.red('Just include the Firebase name, not the entire URL')
          }
          if (!input.match(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)) {
            return chalk.red('Your Firebase name may only contain [a-z], [0-9], and hyphen (-). ' +
              'It may not start or end with a hyphen.')
          }
          return true
        }
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

    return this.prompt(prompts).then(function (props) {
      this.answers = props
      this.githubUser = this.answers.githubUser
      this.firebaseName = this.answers.firebaseName
      this.firebaseKey = this.answers.firebaseKey
      this.deployTo = this.answers.deployTo
      this.includeRedux = this.answers.includeRedux
      // To access prompt answers later use this.answers.someOption
    }.bind(this))
  },

  writing: function () {
    let filesArray = [
      { src: '_README.md', dest: 'README.md' },
      { src: 'LICENSE', dest: 'LICENSE' },
      { src: 'gitignore', dest: '.gitignore' },
      { src: 'eslintrc', dest: '.eslintrc' },
      { src: 'babelrc', dest: '.babelrc' },
      { src: 'bin/**', dest: 'bin' },
      { src: 'build/**', dest: 'build' },
      { src: 'config/**', dest: 'config' },
      { src: 'server/**', dest: 'server' },
      { src: 'src/config.js', dest: 'src/config.js' },
      { src: 'src/index.html', dest: 'src/index.html' },
      { src: 'src/main.js', dest: 'src/main.js' },
      { src: 'src/theme.js', dest: 'src/theme.js' },
      { src: 'src/constants/**', dest: 'src/constants' },
      { src: 'src/components/**', dest: 'src/components' },
      { src: 'src/containers/**', dest: 'src/containers' },
      { src: 'src/layouts/**', dest: 'src/layouts' },
      { src: 'src/routes/**', dest: 'src/routes' },
      { src: 'src/static/humans.txt', dest: 'src/static/humans.txt' },
      { src: 'src/static/robots.txt', dest: 'src/static/robots.txt' },
      { src: 'src/static/User.png', dest: 'src/static/User.png' },
      { src: 'src/styles/**', dest: 'src/styles' },
      { src: 'tests/**', dest: 'tests' }
    ]

    if (this.answers.includeTravis) {
      filesArray.push({ src: '_travis.yml', dest: '.travis.yml' })
    }

    if (this.deployTo === 'heroku') {
      filesArray.push(
        { src: 'Procfile', dest: 'Procfile' },
        { src: 'app.json', dest: 'app.json' }
      )
    }

    if (this.deployTo === 'firebase') {
      filesArray.push(
        { src: 'firebase.json', dest: 'firebase.json' },
        { src: '_firebaserc', dest: '.firebaserc' },
        { src: 'database.rules.json', dest: 'database.rules.json' }
      )
    }

    if (this.includeRedux) {
      filesArray.push(
        // { src: 'src/actions/**', dest: 'src/actions' },
        // { src: 'src/reducers/**', dest: 'src/reducers' },
        { src: 'src/store/**', dest: 'src/store' },
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
    this.copyFiles(filesArray)
  },

  install: function () {
    this.npmInstall()
  },

  copyFiles: function (filesArray) {
    if (!filesArray) return // Skip initializing call
    filesArray.forEach(file => {
      if (file.src.indexOf('.png') !== -1) {
        return this.bulkCopy(file.src, file.dest || file.src || file)
      }
      try {
        this.template(file.src || file, file.dest || file.src || file, this.templateContext)
      } catch (err) {
        console.log('\ntemplate error with file:', file)
        console.log('\nerror', err)
      }
    })
  }
})
