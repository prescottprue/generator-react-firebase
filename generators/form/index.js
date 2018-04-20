'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const camelCase = require('lodash/camelCase')
const capitalize = require('lodash/capitalize')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    // Get first cli argument, and set it as this.options.name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The form name'
    })
    this.argument('basePath', {
      type: String,
      required: false,
      desc: 'The base path of the components folder (starts at "src")'
    })
  }

  prompting () {
    this.log(
      `${chalk.blue('Generating')} -> Redux-Form Form: ${chalk.green(this.options.name)}`
    )

    // return this.prompt(prompts).then((props) => {
    //   this.answers = props
    // })
  }

  writing () {
    const cleanedName = this.options.name.replace('Form', '').replace('form', '')
    const name = `${capitalize(camelCase(cleanedName))}Form`
    const basePathOption = this.options.basePath ? `${this.options.basePath}/` : ''
    const basePath = `src/${basePathOption}components/${name}`
    const filesArray = [
      { src: '_index.js', dest: `${basePath}/index.js` },
      { src: '_main.js', dest: `${basePath}/${name}.js` },
      {
        src: '_main.scss',
        dest: `${basePath}/${name}.scss`
      },
      {
        src: '_main.enhancer.js',
        dest: `${basePath}/${name}.enhancer.js`
      }
    ]

    filesArray.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, {
          name,
          lowerName: name.toLowerCase(),
          camelName: camelCase(name)
        })
      )
    })
  }
}
