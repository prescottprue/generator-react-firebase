'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var path = require('path')

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.argument('name', { type: String, required: false })
    this.appName = this.name || path.basename(process.cwd()) || 'kyper-react-starter'
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
        default: 'prescottprue'
      },
      {
        name: 'firebaseName',
        message: 'Firebase instance (https://' + chalk.red('<your instance>') + '.firebaseio.com)',
        required: true,
        validate: function (input) {
          if (!input) return false
          if (input.match('http') || input.match('firebaseio.com')) return chalk.red('Just include the Firebase name, not the entire URL')
          if (!input.match(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)) {
            return chalk.red('Your Firebase name may only contain [a-z], [0-9], and hyphen (-). ' +
              'It may not start or end with a hyphen.')
          }
          return true
        }
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
      this.deployTo = this.answers.deployTo
      this.includeRedux = this.answers.includeRedux
      // To access prompt answers later use this.answers.someOption
    }.bind(this))
  },

  writing: function () {
    let filesArray = [
      { src: '_index.html', dest: 'index.html' },
      { src: 'index.js', dest: 'index.js' },
      { src: 'app/components/**', dest: 'app/components' },
      { src: 'app/containers/**', dest: 'app/containers' },
      { src: 'assets/**', dest: 'assets' },
      { src: 'bin/**', dest: 'bin' },
      { src: 'lib/**', dest: 'lib' },
      { src: '_package.json', dest: 'package.json' },
      { src: '_README.md', dest: 'README.md' },
      { src: 'webpack-dev.config.js' },
      { src: 'webpack-production.config.js' },
      { src: 'webpack-server-production.config.js' },
      { src: 'gitignore', dest: '.gitignore' },
      { src: 'babelrc', dest: '.babelrc' }
    ]
    if (this.answers.includeTravis) filesArray.push({ src: '_travis.yml', dest: '.travis.yml' })
    if (this.deployTo === 'heroku') filesArray.push({ src: 'Procfile', dest: 'Procfile' })
    if (this.includeRedux) {
      filesArray.concat([
        { src: 'app/actions/**', dest: 'app/actions' },
        { src: 'app/store/**', dest: 'app/store' },
        { src: 'app/reducers/**', dest: 'app/reducers' },
      ])
    }
    this.copyFiles(filesArray)
  },

  install: function () {
    this.npmInstall()
  },

  copyFiles: function (filesArray) {
    if (!filesArray) return // Skip initializing call
    filesArray.forEach(file =>
      this.template(file.src || file, file.dest || file.src || file, this.templateContext)
    )
  }
})
