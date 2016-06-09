/* global describe before */
import path from 'path'
// import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const appFiles = [
  'app/client.js',
  'app/router.js',
  'app/config.js',
  'app/theme.js',
  'app/index.js',
  'app/variables.scss',
  'app/actions/index.js',
  'app/components/AccountDropdown/AccountDropdown.js',
  'app/components/AccountDropdown/AccountDropdown.scss',
  'app/components/AccountManager/AccountManager.js',
  'app/components/AccountManager/AccountManager.scss',
  'app/components/LoginForm/LoginForm.js',
  'app/components/LoginForm/LoginForm.scss',
  'app/components/Navbar/Navbar.js',
  'app/components/Navbar/Navbar.scss',
  'app/components/SignupForm/SignupForm.js',
  'app/components/SignupForm/SignupForm.scss',
  'app/reducers/index.js',
  'app/reducers/cars.js',
  'app/store/configureStore.js',
  'app/store/configureStore.dev.js',
  'app/store/configureStore.prod.js'
]

const projectFiles = [
  'package.json',
  '.gitignore',
  '.babelrc'
]

describe('generator-react-firebase:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise()
  )
  describe('project', () => {
    checkForEachFile(projectFiles)
  })
  describe('application', () => {
    checkForEachFile(appFiles, 'app/')
  })
})
