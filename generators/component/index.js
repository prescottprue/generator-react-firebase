'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')

const prompts = [
  {
    type: 'confirm',
    name: 'addStyle',
    message: 'Do you want to include an SCSS file for styles?',
    default: true
  }
]

module.exports = class extends Generator {
  initializing () {
    // Get first cli argument, and set it as name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    })
  }

  prompting () {
    this.log(
      chalk.blue('Generating') + ' -> React Component: ' + chalk.green(this.name)
    )

    return this.prompt(prompts).then((props) => {
      this.answers = props
    })
  }

  writing () {
    const destPath = `src/components/${this.name}/${this.name}`
    this.fs.copyTpl(
      this.templatePath('_main.js'),
      this.destinationPath(`${destPath}.js`),
      this.answers
    )
    if (this.answers.addStyle) {
      this.fs.copyTpl(
        '_main.scss',
        `${destPath}.scss`,
        this.answers
      )
    }
  }
}
