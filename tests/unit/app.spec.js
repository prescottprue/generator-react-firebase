import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const srcFiles = [
  'src/components/LoadingSpinner/index.js',
  'src/components/LoadingSpinner/LoadingSpinner.js',
  'src/components/LoadingSpinner/LoadingSpinner.scss',
  'src/containers/App/App.js',
  'src/containers/App/index.js',
  'src/containers/Navbar/AccountMenu.js',
  'src/containers/Navbar/index.js',
  'src/containers/Navbar/LoginMenu.js',
  'src/containers/Navbar/Navbar.enhancer.js',
  'src/containers/Navbar/Navbar.js',
  'src/containers/Navbar/Navbar.scss',
  'src/layouts/CoreLayout/CoreLayout.js',
  'src/layouts/CoreLayout/CoreLayout.scss',
  'src/layouts/CoreLayout/index.js',
  'src/modules/notification/components/Notifications.js',
  'src/modules/notification/components/withNotifications.js',
  'src/modules/notification/actions.js',
  'src/modules/notification/actionTypes.js',
  'src/modules/notification/index.js',
  'src/modules/notification/reducer.js',
  'src/styles/_base.scss',
  'src/styles/_colors.scss',
  'src/styles/_device-sizes.scss',
  'src/styles/core.scss',
  'src/utils/components.js',
  'src/utils/form.js',
  'src/utils/router.js',
  'src/config.js',
  'src/constants.js',
  'src/index.html',
  'src/main.js',
  'src/normalize.js',
  'src/theme.js',
]

const reduxFiles = [
  'src/store/createStore.js',
  'src/store/reducers.js'
]

const projectFiles = [
  'package.json',
  'project.config.js',
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

const firestoreFiles = [
  'firestore.indexes.json',
  'firestore.rules'
]

const herokuFiles = [
  'Procfile',
  'app.json'
]

const testFiles = [
  'tests/.eslintrc',
  'tests/test-bundler.js',
  'tests/layouts/CoreLayout.spec.js',
  'tests/routes/Account/index.spec.js',
  'tests/routes/Account/components/AccountForm.spec.js',
]

describe('generator-react-firebase:app', function () {
  this.timeout(15000)
  describe('firebaseName', () => {
    describe('validate', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseName: 'asdf.firebaseio.com',
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
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
            deployTo: 'firebase',
            includeFirestore: false,
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
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
            includeFirestore: false,
            includeRedux: false,
            deployTo: 'firebase',
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
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

  describe('firestore option', () => {

    describe('include', () => {
      before(() =>
        helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeTravis: 'Y',
            includeRedux: 'Y',
            deployTo: 'firebase',
            includeFirestore: true,
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
        describe('Firestore', () => {
          checkForEachFile(firestoreFiles)
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
            includeFirestore: false,
            includeRedux: false,
            deployTo: 'firebase',
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
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
            includeFirestore: false,
            includeTravis: 'Y',
            includeRedux: 'Y',
            deployTo: 'firebase',
            useYarn: true
          })
          .toPromise()
       )

      describe('creates files for', () => {
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
            includeFirestore: false,
            includeTravis: 'Y',
            includeRedux: 'N',
            deployTo: 'heroku',
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
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
