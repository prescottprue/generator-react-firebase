'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const startCase = require('lodash/startCase')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // Get first cli argument, and set it as this.options.name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The component name'
    })
    this.argument('basePath', {
      type: String,
      required: false,
      desc: 'The base path of the components folder (starts at "src")'
    })
  }

  prompting() {
    this.log(
      `${chalk.blue('Generating')} -> React Component Enhancer: ${chalk.green(
        this.options.name
      )}`
    )
  }

  writing() {
    const basePathOption = this.options.basePath
      ? `${this.options.basePath}/`
      : ''
    const basePath = `src/${basePathOption}components/${this.options.name}`
    const filesArray = [
      {
        src: `_main.hook.js`,
        dest: `${basePath}/${this.options.name}.hook.js`
      }
    ]

    filesArray.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: this.options.name,
          startCaseName: startCase(this.options.name).replace(/ /g, '')
        })
      )
    })
  }
}
