'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const camelCase = require('lodash/camelCase')
const get = require('lodash/get')
const fs = require('fs')
const path = require('path')

const prompts = [
  {
    type: 'confirm',
    name: 'usingFirestore',
    message: 'Are you using Firestore?',
    default: false
  }
]

function loadProjectPackageFile() {
  const packagePath = path.join(process.cwd(), 'package.json')
  // If functions package file does not exist, default to null
  if (!fs.existsSync(packagePath)) {
    return null
  }
  // Load package file handling errors
  try {
    return require(packagePath)
  } catch(err) {
    return null
  }
}

module.exports = class extends Generator {
  constructor (args, opts) {
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

  prompting () {
    this.log(
      `${chalk.blue('Generating')} -> React Component Enhancer: ${chalk.green(this.options.name)}`
    )
    const projectPackageFile = loadProjectPackageFile()
    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, {
        // proptypes included by default if project package file not loaded
        // (i.e. null due to throws: false in loadProjectPackageFile)
        airbnbLinting: !!get(projectPackageFile, 'devDependencies.eslint-config-airbnb') || false
      })
    })
  }

  writing () {
    const basePathOption = this.options.basePath ? `${this.options.basePath}/` : ''
    const basePath = `src/${basePathOption}components/${this.options.name}`
    const filesArray = [
      {
        src: `_index${this.answers.airbnbLinting ? '-airbnb': ''}.js`,
        dest: `${basePath}/index.js`
      },
      {
        src: `_main${this.answers.airbnbLinting ? '-airbnb': ''}.enhancer.js`,
        dest: `${basePath}/${this.options.name}.enhancer.js`
      }
    ]

    filesArray.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: this.options.name,
          lowerName: this.options.name.toLowerCase(),
          camelName: camelCase(this.options.name)
        })
      )
    })
  }
}
