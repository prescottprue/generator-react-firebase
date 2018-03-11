'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const camelCase = require('lodash/camelCase')

const prompts = [
  {
    type: 'list',
    name: 'triggerType',
    message: 'What type of function trigger?',
    choices: [
      'HTTPS',
      'RTDB',
      'Firestore',
      'Auth',
      'Storage'
    ],
    default: 0
  }
]

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    // Get first cli argument, and set it as this.options.name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The function name'
    })
  }

  prompting () {
    this.log(
      `${chalk.blue('Generating')} -> Cloud Function: ${chalk.green(this.options.name)}`
    )

    return this.prompt(prompts).then((props) => {
      this.answers = props
    })
  }

  writing () {
    const basePath = `functions/src/${camelCase(this.options.name)}`
    const triggerTypeName = this.answers.triggerType.toLowerCase()

    const filesArray = [
      { src: `_${triggerTypeName}Function.js`, dest: `${basePath}/index.js` }
    ]

    filesArray.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: this.options.name,
          camelName: camelCase(this.options.name),
          lowerName: this.options.name.toLowerCase()
        })
      )
    })
  }
}
