'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const camelCase = require('lodash/camelCase')
const get = require('lodash/get')
const capitalize = require('lodash/capitalize')

function loadJsonFile(filePath) {
  const packagePath = path.join(process.cwd(), filePath)
  // If functions package file does not exist, default to not functions v1.0.0
  if (!fs.existsSync(packagePath)) {
    return null
  }
  // Load package file handling errors
  try {
    return require(packagePath)
  } catch (err) {
    return null
  }
}

function loadFunctionsPackageFile() {
  const firebaseJson = loadJsonFile('firebase.json')
  // Load functions source from firebase.json if it exist, otherwise use "functions"
  const functionsFolder = get(firebaseJson, 'functions.source') || 'functions'
  return loadJsonFile(`${functionsFolder}/package.json`)
}

const HTTPS_FUNCTION_TYPE = 'https'
const RTDB_FUNCTION_TYPE = 'rtdb'
const PUBSUB_FUNCTION_TYPE = 'pubsub'
const FIRESTORE_FUNCTION_TYPE = 'firestore'
const STORAGE_FUNCTION_TYPE = 'storage'
const AUTH_FUNCTION_TYPE = 'auth'

const functionTypeOptions = [
  HTTPS_FUNCTION_TYPE,
  RTDB_FUNCTION_TYPE,
  FIRESTORE_FUNCTION_TYPE,
  PUBSUB_FUNCTION_TYPE,
  STORAGE_FUNCTION_TYPE,
  AUTH_FUNCTION_TYPE
]

const choicesByTriggerType = {
  https: ['onCall', 'onRequest'],
  rtdb: ['onWrite', 'onCreate', 'onUpdate', 'onDelete'],
  firestore: ['onWrite', 'onCreate', 'onUpdate', 'onDelete'],
  auth: ['onCreate', 'onDelete', 'onOperation'],
  pubsub: ['onPublish', 'onRun'],
  storage: ['onArchive', 'onDelete', 'onFinalize', 'onMetadataUpdate']
}

function buildEventTypePrompt(triggerTypeName, { triggerFlag }) {
  const choicesForType = choicesByTriggerType[triggerTypeName]
  return {
    type: 'list',
    name: 'eventType',
    message: 'What function event type?',
    when: ({ triggerType }) =>
      choicesForType &&
      ((triggerType &&
        triggerType.toLowerCase().indexOf(triggerTypeName) !== -1) ||
        (triggerFlag &&
          triggerFlag.toLowerCase().indexOf(triggerTypeName) !== -1)),
    choices: choicesForType,
    default: 0
  }
}

function buildPrompts(generatorContext) {
  return [
    {
      type: 'list',
      name: 'triggerType',
      message: 'What type of function trigger?',
      // Only prompt if type was not passed
      when: () => !generatorContext.triggerFlag,
      choices: functionTypeOptions.map((typeOption) => {
        if (
          typeOption === HTTPS_FUNCTION_TYPE ||
          typeOption === RTDB_FUNCTION_TYPE
        ) {
          return typeOption.toUpperCase()
        }
        if (typeOption === PUBSUB_FUNCTION_TYPE) {
          return 'PubSub'
        }
        return capitalize(typeOption)
      }),
      default: 0
    }
  ]
    .concat(
      Object.keys(choicesByTriggerType).map((key) =>
        buildEventTypePrompt(key, generatorContext)
      )
    )
    .concat([
      {
        type: 'confirm',
        name: 'includeTests',
        message: 'Do you want to include tests?',
        when: () => typeof generatorContext.options.test === 'undefined',
        default: false
      }
    ])
}

function triggerTypeToName(triggerType) {
  switch (triggerType) {
    case 'http':
      return `${triggerType.toUpperCase()}${triggerType === 'http' ? 'S' : ''}`
    case 'rtdb':
      return 'Real Time Database'
    case 'pubsub':
      return 'PubSub'
    default:
      return capitalize(triggerType)
  }
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // Get first cli argument, and set it as this.options.name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The function name'
    })
    // TODO: Try loading functions source folder from firebase.json
    // Adds support for a flags
    functionTypeOptions.forEach((functionType) => {
      this.option(functionType)
    })
    this.option('test', { type: Boolean })
    this.option('jest', { type: Boolean })
  }

  prompting() {
    // Convert function type option to trigger type if passed in flag
    this.triggerFlag = functionTypeOptions.find(
      (optionName) => !!this.options[optionName]
    )
    const projectPackageFile = loadJsonFile('package.json')
    const functionsPackageFile = loadFunctionsPackageFile()
    const prompts = buildPrompts(this)
    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, this.answers, {
        airbnbLinting:
          !!get(projectPackageFile, 'devDependencies.eslint-config-airbnb') ||
          !!get(
            projectPackageFile,
            'devDependencies.eslint-config-airbnb-base'
          ) ||
          !!get(
            projectPackageFile,
            'devDependencies.@side/eslint-config-base'
          ) ||
          false,
        jestTesting:
          this.options.jest ||
          !!get(projectPackageFile, 'devDependencies.jest'),
        usingTypescript: !!get(
          functionsPackageFile,
          'devDependencies.typescript'
        )
      })
    })
  }

  writing() {
    const camelName = camelCase(this.options.name)
    // Get name from answers falling back to options (in case of argument being
    // passed for trigger type flag)
    const triggerType = get(
      this,
      'answers.triggerType',
      this.triggerFlag
    ).toLowerCase()

    // Format name for showing
    const triggerTypeName = triggerTypeToName(triggerType)
    this.log(
      `${chalk.blue('Generating')} -> Cloud Function: ${chalk.green(
        this.options.name
      )}
      Trigger Type: ${chalk.cyan(triggerTypeName)}
      Event Type: ${chalk.cyan(this.answers.eventType) || ''}`
    )

    const firebaseJson = loadJsonFile('firebase.json')
    // Load functions source from firebase.json if it exist, otherwise use "functions"
    const functionsFolder = get(firebaseJson, 'functions.source') || 'functions'
    const filesArray = [
      {
        src: `_${triggerType}Function.js`,
        dest: `${functionsFolder}/src/${camelName}/index.${
          this.answers.usingTypescript ? 't' : 'j'
        }s`
      }
    ]

    if (this.options.test || this.answers.includeTests || this.options.jest) {
      filesArray.push({
        src: `_${triggerType}Test${
          this.answers.airbnbLinting ? '-airbnb' : ''
        }.js`,
        dest: `${functionsFolder}/src/${camelName}/${camelName}.spec.${
          this.answers.usingTypescript ? 't' : 'j'
        }s`
      })
    }

    filesArray.forEach((file) => {
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
