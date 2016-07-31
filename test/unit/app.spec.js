/* global describe before */
import path from 'path'
// import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const appFiles = [
  'app/config.js',
  'app/theme.js',
  'app/variables.scss',
  'app/components/LoginForm/LoginForm.js',
  'app/components/LoginForm/LoginForm.scss',
  'app/containers/Navbar/Navbar.js',
  'app/containers/Navbar/Navbar.scss',
  'app/components/SignupForm/SignupForm.js',
  'app/components/SignupForm/SignupForm.scss'
]

const reduxFiles = [
  'app/client.js',
  'app/router.js',
  'app/index.js',
  'app/actions/index.js',
  'app/reducers/index.js',
  'app/reducers/cars.js',
  'app/store/configureStore.js',
  'app/store/configureStore.dev.js',
  'app/store/configureStore.prod.js'
]
const projectFiles = [
  // 'package.json',
  '.gitignore',
  // '.babelrc'
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
    checkForEachFile(appFiles, 'app/')
  })
})
