/* global describe before */
import path from 'path'
// import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const srcFiles = [
  'src/config.js',
  'src/index.html',
  'src/main.js',
  'src/theme.js',
  'src/styles/_base.scss',
  'src/styles/_colors.scss',
  'src/styles/_device-sizes.scss',
  'src/styles/core.scss',
  'src/components/TextField/TextField.js',
  'src/containers/App/App.js',
  'src/containers/Navbar/Navbar.js',
  'src/containers/Navbar/Navbar.scss',
  'src/layouts/CoreLayout/CoreLayout.js',
  'src/layouts/CoreLayout/CoreLayout.scss',
  'src/layouts/CoreLayout/index.js',
]

const reduxFiles = [
  'src/store/createStore.js',
  'src/store/reducers.js'
]
const projectFiles = [
  'package.json',
  '.gitignore'
]

describe('generator-react-firebase:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({githubUser: 'testuser', firebaseInstance: 'testing', includeTravis: 'Y', includeRedux: 'N'})
      .toPromise()
  )
  describe('project', () => {
    checkForEachFile(projectFiles)
  })
  describe('application', () => {
    checkForEachFile(srcFiles, 'src/')
  })
})
