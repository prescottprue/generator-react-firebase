'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')

const prompts = [
  {
    type: 'confirm',
    name: 'usingFirestore',
    when: ({ includeEnhancer }) => includeEnhancer,
    message: 'Are you using Firestore (if you are not sure answer false)?',
    default: false
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
      `${chalk.blue('Generating')} -> Redux Module: ${chalk.green(this.options.name)}`
    )

    return this.prompt(prompts).then((props) => {
      this.answers = props
    })
  }

  writing () {
    const basePath = `src/modules/${this.options.name}`
    const filesArray = [
      { src: '_index.js', dest: `${basePath}/index.js` },
      { src: '_actions.js', dest: `${basePath}/actions.js` },
      { src: '_actionTypes.js', dest: `${basePath}/actionTypes.js` },
      { src: '_reducer.js', dest: `${basePath}/reducer.js` }
    ]

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
