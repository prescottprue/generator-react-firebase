'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const get = require('lodash/get')

const prompts = [
  {
    type: 'confirm',
    name: 'addStyle',
    message: 'Do you want to include styles?',
    default: true
  },
  {
    type: 'list',
    name: 'styleType',
    when: ({ addStyle }) => addStyle && dependencyExists('@material-ui/core'),
    choices: [
      {
        name: 'Localized MUI Theming (styles.js)',
        value: 'localized'
      },
      {
        name: 'SCSS File',
        value: 'scss'
      }
    ],
    message: 'What type of styling?',
    default: 0
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
  } catch (err) {
    return null
  }
}

function dependencyExists(depName, opts = {}) {
  const { dev = false } = opts
  const projectPackageFile = loadProjectPackageFile()
  return !!get(
    projectPackageFile,
    `${dev ? 'devDependencies' : 'dependencies'}.${depName}`
  )
}

module.exports = class extends Generator {
  constructor(args, opts) {
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

  prompting() {
    const reduxFormExists = dependencyExists('redux-form')
    this.log(
      `${chalk.blue('Generating')} -> ${
        reduxFormExists ? 'react-hook-form' : 'redux-form'
      } Form: ${chalk.green(this.options.name)}`
    )

    const projectPackageFile = loadProjectPackageFile()
    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, {
        // proptypes included by default if project package file not loaded
        // (i.e. null due to throws: false in loadProjectPackageFile)
        reduxFormExists: reduxFormExists || false,
        hasPropTypes:
          !projectPackageFile || dependencyExists('prop-types') || false,
        materialv1: dependencyExists('@material-ui/core'),
        airbnbLinting:
          dependencyExists('eslint-config-airbnb', { dev: true }) || false,
        // Default style type to scss for when localized styles is not an option
        styleType: props.styleType || 'scss'
      })
    })
  }

  writing() {
    const cleanedName = this.options.name
      .replace('Form', '')
      .replace('form', '')
    const name = `${upperFirst(camelCase(cleanedName))}Form`
    const basePathOption = this.options.basePath
      ? `${this.options.basePath}/`
      : ''
    const basePath = `src/${basePathOption}components/${name}`
    const filesArray = [{ src: '_index.js', dest: `${basePath}/index.js` }]

    if (this.answers.reduxFormExists) {
      filesArray.push({
        src: '_main-redux-form.js',
        dest: `${basePath}/${name}.js`
      })
      filesArray.push({
        src: `_main${this.answers.airbnbLinting ? '-airbnb' : ''}.enhancer.js`,
        dest: `${basePath}/${name}.enhancer.js`
      })
    } else {
      filesArray.push({ src: '_main.js', dest: `${basePath}/${name}.js` })
    }

    if (this.answers.addStyle) {
      if (this.answers.styleType && this.answers.styleType === 'localized') {
        filesArray.push({
          src: '_main.styles.js',
          dest: `${basePath}/${name}.styles.js`
        })
      } else {
        filesArray.push({
          src: '_main.scss',
          dest: `${basePath}/${name}.scss`
        })
      }
    }

    filesArray.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name,
          lowerName: name.toLowerCase(),
          camelName: camelCase(name)
        })
      )
    })
  }
}
