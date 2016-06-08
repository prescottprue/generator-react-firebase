'use strict'
const yeoman = require('yeoman-generator')
const chalk = require('chalk')

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    })
  },

  prompting: function () {
    this.log(
      chalk.blue('Generating') + ' -> React Component: ' + chalk.green(this.name)
    )

    const prompts = [
      {
        type: 'confirm',
        name: 'addStyle',
        message: 'Do you want to include an SCSS file for styles?',
        default: true
      }
    ]

    return this.prompt(prompts).then(function (props) {
      this.answers = props
      this.addStyle = this.answers.addStyle
      // To access prompt answers later use this.answers.someOption
    }.bind(this))
  },

  writing: function () {
    const rootPath = 'app/components/' // TODO: Handle different root location
    const destPath = rootPath + this.name + '/' + this.name
    this.template('_main.js', destPath + '.js', this.templateContext)
    if (this.addStyle) this.template('_main.scss', destPath + '.scss', this.templateContext)
  }
})
