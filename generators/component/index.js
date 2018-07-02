'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const camelCase = require('lodash/camelCase')
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
  },
  {
    type: 'confirm',
    name: 'includeEnhancer',
    when: ({ styleType }) => !styleType || styleType === 'scss',
    message: 'Do you want to include an enhancer?',
    default: false
  },
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

function dependencyExists(depName, opts = {}) {
  const { dev = false } = opts
  const projectPackageFile = loadProjectPackageFile()
  return !!get(projectPackageFile, `${dev ? 'devDependencies': 'dependencies'}.${depName}`)
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
      `${chalk.blue('Generating')} -> React Component: ${chalk.green(this.options.name)}`
    )
    const projectPackageFile = loadProjectPackageFile()
    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, {
        // proptypes included by default if project package file not loaded
        // (i.e. null due to throws: false in loadProjectPackageFile)
        hasPropTypes: !projectPackageFile || dependencyExists('prop-types') || false,
        airbnbLinting: dependencyExists('eslint-config-airbnb', { dev: true }) || false,
        // Default including of enhancer to true (not asked with manual styles)
        includeEnhancer: get(props, 'includeEnhancer', true),
        // Default style type to scss for when localized styles is not an option
        styleType: props.styleType || 'scss',
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
        src: `_main${this.answers.airbnbLinting ? '-airbnb': ''}.js`,
        dest: `${basePath}/${this.options.name}.js`
      }
    ]

    if (this.answers.addStyle) {
      if (this.answers.styleType && this.answers.styleType === 'localized') {
        filesArray.push({
          src: '_main.styles.js',
          dest: `${basePath}/${this.options.name}.styles.js`
        })
      } else {
        filesArray.push({
          src: '_main.scss',
          dest: `${basePath}/${this.options.name}.scss`
        })
      }
    }

    if (this.answers.includeEnhancer) {
      filesArray.push({
        src: `_main${this.answers.airbnbLinting ? '-airbnb': ''}.enhancer.js`,
        dest: `${basePath}/${this.options.name}.enhancer.js`
      })
    }

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
