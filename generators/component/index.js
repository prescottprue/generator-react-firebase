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
    }.bind(this))
  },

  writing: function () {
    const destPath = 'app/components/' + this.name + '/' + this.name
    this.template('_main.js', destPath + '.js', this.templateContext)
    if (this.answers.addStyle) this.template('_main.scss', destPath + '.scss', this.templateContext)
  }
})
