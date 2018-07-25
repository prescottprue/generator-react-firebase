'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')

const prompts = [
  {
    type: 'confirm',
    name: 'includeEnhancer',
    message: 'Do you want to include an enhancer in the component (if you are not sure answer false)?',
    default: false
  },
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
    this.argument('basePath', {
      type: String,
      required: false,
      desc: 'The base path of the components folder (starts at "src")'
    })
    this.option('without-suffix')
  }

  prompting () {
    this.log(
      `${chalk.blue('Generating')} -> React-Router Route: ${chalk.green(this.options.name)}`
    )

    return this.prompt(prompts).then((props) => {
      this.answers = Object.assign({}, props, { parentSuffix: this.options['without-suffix'] ? '' : 'Page' })
    })
  }

  writing () {
    const { parentSuffix } = this.answers
    const { name: nameAnswer } = this.options
    const name = `${nameAnswer}${parentSuffix}`
    const basePathOption = this.options.basePath ? `${this.options.basePath}/` : ''
    const basePath = `src/${basePathOption}routes/${nameAnswer}`
    const pageComponentPath = `${basePath}/components/${name}`
    const filesArray = [
      { src: '_index.js', dest: `${basePath}/index.js` },
      { src: 'component/_index.js', dest: `${pageComponentPath}/index.js` },
      { src: 'component/_main.js', dest: `${pageComponentPath}/${name}.js` },
      {
        src: 'component/_main.scss',
        dest: `${pageComponentPath}/${name}.scss`
      }
    ]

    if (this.answers.includeEnhancer) {
      filesArray.push({
        src: 'component/_main.enhancer.js',
        dest: `${pageComponentPath}/${name}.enhancer.js`
      })
    }

    filesArray.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        Object.assign({}, this.answers, {
          name: name,
          lowerName: name.toLowerCase()
        })
      )
    })
  }
}
