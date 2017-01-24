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
  constructor (args, opts) {
    super(args, opts)

    // Get first cli argument, and set it as this.options.name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    })
  }

  prompting () {
    this.log(
      `${chalk.blue('Generating')} -> React Component: ${chalk.green(this.options.name)}`
    )

    return this.prompt(prompts).then((props) => {
      this.answers = props
    })
  }

  writing () {
    const destPath = `src/components/${this.options.name}/${this.options.name}`
    this.fs.copyTpl(
      this.templatePath('_main.js'),
      this.destinationPath(`${destPath}.js`),
      Object.assign({}, this.answers, { name: this.options.name })
    )
    if (this.answers.addStyle) {
      this.fs.copyTpl(
        this.templatePath('_main.scss'),
        this.destinationPath(`${destPath}.scss`),
        Object.assign({}, this.answers, { name: this.options.name })
      )
    }
  }
}
