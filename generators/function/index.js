'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const camelCase = require('lodash/camelCase')
const get = require('lodash/get')
const capitalize = require('lodash/capitalize')

const triggerTypePrompt = {
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

const prompts = [
  {
    type: 'confirm',
    name: 'includeTests',
    message: 'Do you want to include tests?',
    default: false
  }
]

const functionTypeOptions = [
  'http',
  'auth',
  'https',
  'storage',
  'firestore',
  'rtdb'
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
    // Adds support for a flags
    functionTypeOptions.forEach((functionType) => {
      this.option(functionType)
    })
  }

  prompting () {
    // Convert function type option to trigger type if passed in flag
    this.triggerFlag = functionTypeOptions.find(optionName =>
      !!this.options[optionName]
    )
    // Only prompt if type was not passed
    if (!this.triggerFlag) {
      prompts.unshift(triggerTypePrompt)
    }
    return this.prompt(prompts).then((props) => {
      this.answers = props
    })
  }

  writing () {
    const camelName = camelCase(this.options.name)
    // Get name from answers falling back to options (in case of argument being
    // passed for trigger type flag)
    const triggerType = get(
      this,
      'answers.triggerType',
      this.triggerFlag
    ).toLowerCase()
    // Format name for showing
    const triggerTypeName = (triggerType === 'http' || triggerType === 'rtdb')
      ? `${triggerType.toUpperCase()}${triggerType === 'http' ? 'S' : ''}`
      : capitalize(triggerType)

    this.log(
      `${chalk.blue('Generating')} -> Cloud Function:
      Function Name: ${chalk.green(this.options.name)}
      Trigger Type: ${this.options.triggerType ? chalk.cyan(triggerTypeName) : ''}`
    )

    const filesArray = [
      {
        src: `_${triggerType}Function.js`,
        dest: `functions/src/${camelName}/index.js`
      }
    ]

    if (this.answers.includeTests) {
      filesArray.push(
        {
          src: `_${triggerType}Test.js`,
          dest: `functions/test/${camelName}/index.spec.js`
        }
      )
    }

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
