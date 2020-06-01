'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const fs = require('fs')
const glob = require('glob')
const semver = require('semver')
const camelCase = require('lodash/camelCase')
const startCase = require('lodash/startCase')
const get = require('lodash/get')

const styleChoices = [
  {
    name: 'SCSS File',
    value: 'scss'
  }
]

if (reactVersionHasHooks()) {
  styleChoices.unshift({
    name: 'JSS with React Hooks (useStyles)',
    value: 'hooks'
  })
}

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
    choices: styleChoices,
    message: 'What type of styling?',
    default: 0
  },
  {
    type: 'confirm',
    name: 'includeHook',
    message: 'Do you want to include a custom hook?',
    when: () => reactVersionHasHooks(),
    default: false
  }
]

function loadProjectPackageFile(extraPath) {
  const packagePath = `${process.cwd()}${
    extraPath ? `/${extraPath}` : ''
  }/package.json`
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
  const { dev = false, checkParent = false } = opts
  const projectPackageFile = loadProjectPackageFile(checkParent && '../../')
  return !!get(
    projectPackageFile,
    `${dev ? 'devDependencies' : 'dependencies'}.${depName}`
  )
}

function reactVersionHasHooks() {
  const projectPackageFile = loadProjectPackageFile()
  const reactVersion = get(projectPackageFile, 'dependencies.react')
  return semver.satisfies(semver.coerce(reactVersion), '>=16.9.0')
}

function projectHasJsx(basePath) {
  // Load all folders within dist directory (mirrors layout of src)
  const files = glob.sync(`src/**.jsx`)
  return !!files.length
}

module.exports = class extends Generator {
  constructor(args, opts) {
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

  prompting() {
    this.log(
      `${chalk.blue('Generating')} -> React Component: ${chalk.green(
        this.options.name
      )}`
    )
    const projectPackageFile = loadProjectPackageFile()
    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, {
        // proptypes included by default if project package file not loaded
        // (i.e. null due to throws: false in loadProjectPackageFile)
        hasPropTypes:
          !projectPackageFile || dependencyExists('prop-types') || false,
        airbnbLinting:
          dependencyExists('eslint-config-airbnb', { dev: true }) ||
          dependencyExists('@side-eng/eslint-config-base', {
            dev: true,
            checkParent: true
          }) ||
          false,
        // Default style type to scss for when localized styles is not an option
        styleType: props.styleType || 'scss'
      })
    })
  }

  writing() {
    const basePathOption = this.options.basePath
      ? `${this.options.basePath}/`
      : ''
    const basePath = `src/${basePathOption}components/${this.options.name}`
    const withLintSuffix = `_main${this.answers.airbnbLinting ? '-airbnb' : ''}`
    const startCaseName = startCase(this.options.name).replace(/ /g, '')
    const filesArray = [
      {
        src: `_index${this.answers.airbnbLinting ? '-airbnb' : ''}.js`,
        dest: `${basePath}/index.js`
      },
      {
        src: `${withLintSuffix}${
          this.answers.includeHook === 'hooks' ? '-hooks' : ''
        }.js`,
        dest: `${basePath}/${this.options.name}.${
          projectHasJsx(basePathOption) ? 'jsx' : 'js'
        }`
      }
    ]

    if (this.answers.addStyle) {
      if (this.answers.styleType && this.answers.styleType !== 'scss') {
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

    if (this.answers.includeHook) {
      filesArray.push({
        src: `_main.hook.js`,
        dest: `${basePath}/use${startCaseName}.js`
      })
    }

    filesArray.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: this.options.name,
          lowerName: this.options.name.toLowerCase(),
          camelName: camelCase(this.options.name),
          startCaseName,
          hasJsx: projectHasJsx()
        })
      )
    })
  }
}
