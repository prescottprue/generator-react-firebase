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
      desc: 'The component name'
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
    const basePath = `src/components/${this.options.name}`
    const filesArray = [
      { src: '_index.js', dest: `${basePath}/index.js` },
      { src: '_main.js', dest: `${basePath}/${this.options.name}.js` }
    ]

    if (this.answers.addStyle) {
      filesArray.push({
        src: '_main.scss',
        dest: `${basePath}/${this.options.name}.scss`
      })
    }

    filesArray.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: this.options.name,
          lowerName: this.options.name.toLowerCase()
        })
      )
    })
  }
}
