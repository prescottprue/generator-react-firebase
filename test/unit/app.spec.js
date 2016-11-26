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
  'src/components/TextField/index.js',
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
  '.eslintrc',
  '.travis.yml',
  'LICENSE',
  '.gitignore',
  'README.md'
]

const firebaseFiles = [
  'firebase.json',
  '.firebaserc',
  'database.rules.json'
]

const herokuFiles = [
  'Procfile',
  'app.json'
]

const testFiles = [
  'tests/.eslintrc',
  'tests/framework.spec.js',
  'tests/test-bundler.js',
  'tests/components/TextField/TextField.spec.js',
  'tests/layouts/CoreLayout.spec.js',
  'tests/routes/Account/index.spec.js',
  'tests/routes/Account/components/AccountForm.spec.js',
]

describe('generator-react-firebase:app', () => {
  describe('firebaseName', () => {

    describe('validate', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseName: 'asdf.firebaseio.com'
          })
          .toPromise()
      )
      describe('creates files', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
        describe('tests', () => {
          checkForEachFile(testFiles)
        })
      })
    })
  })
  describe('redux option', () => {

    describe('include', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeTravis: 'Y',
            includeRedux: 'Y',
            deployTo: 'firebase'
          })
          .toPromise()
      )
      describe('creates files', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
        describe('tests', () => {
          checkForEachFile(testFiles)
        })
      })
    })

    describe('not include', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeTravis: 'Y',
            includeRedux: false,
            deployTo: 'firebase'
          })
          .toPromise()
      )
      describe('creates files', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
        describe('tests', () => {
          checkForEachFile(testFiles)
        })
      })
    })
  })

  describe('deploy options', () => {

    describe('Firebase', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeTravis: 'Y',
            includeRedux: 'Y',
            deployTo: 'firebase'
          })
          .toPromise()
      )

      describe('creates files', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
        describe('firebase', () => {
          checkForEachFile(firebaseFiles)
        })
        describe('tests', () => {
          checkForEachFile(testFiles)
        })
      })

    })

    describe('Heroku', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeTravis: 'Y',
            includeRedux: 'N',
            deployTo: 'heroku'
          })
          .toPromise()
      )
      describe('creates files', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
        describe('Heroku', () => {
          checkForEachFile(herokuFiles)
        })
        describe('tests', () => {
          checkForEachFile(testFiles)
        })
      })
    })
  })
})
