'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const semver = require('semver')
const get = require('lodash/get')
const lowerFirst = require('lodash/lowerFirst')
const startCase = require('lodash/startCase')

const styleChoices = [
  {
    name: 'Localized MUI Theming (styles.js)',
    value: 'localized'
  },
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

function reactVersionHasHooks() {
  const projectPackageFile = loadProjectPackageFile()
  const reactVersion = get(projectPackageFile, 'dependencies.react')
  return semver.satisfies(semver.coerce(reactVersion), '>=16.9.0')
}

function isOldReact() {
  const projectPackageFile = loadProjectPackageFile()
  const reactVersion = get(projectPackageFile, 'dependencies.react')
  return semver.satisfies(semver.coerce(reactVersion), '<16.0.0')
}

const prompts = [
  {
    type: 'confirm',
    name: 'includeEnhancer',
    message:
      'Do you want to include an enhancer in the component (if you are not sure answer false)?',
    default: false
  },
  {
    type: 'confirm',
    name: 'usingFirestore',
    when: ({ includeEnhancer }) => includeEnhancer,
    message: 'Are you using Firestore (if you are not sure answer false)?',
    default: false
  },
  {
    type: 'confirm',
    name: 'includeHook',
    message: 'Do you want to include a custom hook?',
    when: () => reactVersionHasHooks(),
    default: false
  },
  {
    type: 'list',
    name: 'styleType',
    default: dependencyExists('@material-ui/core') ? 0 : 1,
    choices: styleChoices,
    message: 'What type of styling for the component?'
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

function getIndexFileName(answers) {
  if (isOldReact()) {
    return '_index-old.js'
  }
  if (dependencyExists('react-loadable')) {
    return '_index-loadable.js'
  }
  const lintStyleSuffix = answers.airbnbLinting ? '-airbnb' : ''
  return `_index${lintStyleSuffix}.js`
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
    this.option('without-suffix')
  }

  prompting() {
    this.log(
      `${chalk.blue('Generating')} -> React-Router Route: ${chalk.green(
        this.options.name
      )}`
    )
    const projectPackageFile = loadProjectPackageFile()
    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, {
        parentSuffix: this.options['without-suffix'] ? '' : 'Page',
        hasPropTypes:
          !projectPackageFile || dependencyExists('prop-types') || false,
        styleType: props.styleType || 'scss',
        addStyle: !!props.styleType
      })
    })
  }

  writing() {
    const { parentSuffix } = this.answers
    const { name: nameAnswer } = this.options
    const name = `${nameAnswer}${parentSuffix}`
    const basePathOption = this.options.basePath
      ? `${this.options.basePath}/`
      : ''
    const basePath = `src/${basePathOption}routes/${nameAnswer}`
    const pageComponentPath = `${basePath}/components/${name}`
    const lintStyleSuffix = this.answers.airbnbLinting ? '-airbnb' : ''
    const filesArray = [
      {
        src: getIndexFileName(this.answers),
        dest: `${basePath}/index.js`
      },
      {
        src: `component/_index${lintStyleSuffix}.js`,
        dest: `${pageComponentPath}/index.js`
      },
      {
        src: `component/_main${lintStyleSuffix}${
          this.answers.styleType === 'hooks' ? '-hooks' : ''
        }.js`,
        dest: `${pageComponentPath}/${name}.js`
      }
    ]

    if (this.answers.includeEnhancer) {
      filesArray.push({
        src: `component/_main${lintStyleSuffix}.enhancer.js`,
        dest: `${pageComponentPath}/${name}.enhancer.js`
      })
    }

    // Add styles (styles.js if specified and enhancer exists, otherwise scss)
    if (this.answers.styleType !== 'scss') {
      filesArray.push({
        src: `component/_main.styles.js`,
        dest: `${pageComponentPath}/${name}.styles.js`
      })
    } else {
      filesArray.push({
        src: 'component/_main.scss',
        dest: `${pageComponentPath}/${name}.scss`
      })
    }

    const startCasedName = startCase(this.options.name)

    filesArray.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: nameAnswer,
          componentName: name,
          airbnbLinting: this.answers.airbnbLinting,
          startCasedName,
          camelName: lowerFirst(startCasedName.replace(/ /g, '')),
          pathName: startCasedName.toUpperCase().replace(/ /g, '_')
        })
      )
    })
  }
}
