'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const camelCase = require('lodash/camelCase')
const get = require('lodash/get')
const capitalize = require('lodash/capitalize')

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

    this.argument('triggerType', {
      required: false,
      type: String,
      desc: 'The trigger type'
    })
  }

  prompting () {
    // Only prompt if type was not passed
    if (!this.options.triggerType) {
      return this.prompt(prompts).then((props) => {
        this.answers = props
      })
    }
  }

  writing () {
    const basePath = `functions/src/${camelCase(this.options.name)}`
    // Get name from answers falling back to options (in case of argument being
    // passed for trigger type)
    let triggerTypeName = get(
      this,
      'answers.triggerType',
      get(this, 'options.triggerType', '')
    ).toLowerCase()

    // Format name for showing
    if (triggerTypeName === 'http' || triggerTypeName === 'rtdb') {
      triggerTypeName = `${triggerTypeName.toUpperCase()}${triggerTypeName === 'http' ? 'S' : ''}`
    } else {
      triggerTypeName = capitalize(triggerTypeName)
    }

    this.log(
      `${chalk.blue('Generating')} -> Cloud Function:
      Function Name: ${chalk.green(this.options.name)}
      Trigger Type: ${this.options.triggerType ? chalk.cyan(triggerTypeName) : ''}`
    )

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
