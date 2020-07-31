import { takeRight } from 'lodash'
import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const srcFiles = [
  'src/components/LoadingSpinner/index.js',
  'src/components/LoadingSpinner/LoadingSpinner.jsx',
  'src/components/LoadingSpinner/LoadingSpinner.styles.js',
  'src/containers/App/App.jsx',
  'src/containers/App/index.js',
  'src/containers/Navbar/AccountMenu.jsx',
  'src/containers/Navbar/index.js',
  'src/containers/Navbar/Navbar.jsx',
  'src/containers/Navbar/Navbar.styles.js',
  'src/layouts/CoreLayout/CoreLayout.jsx',
  'src/layouts/CoreLayout/index.js',
  'src/modules/notification/Notifications.jsx',
  'src/modules/notification/NotificationsProvider.jsx',
  'src/modules/notification/useNotifications.js',
  'src/modules/notification/actions.js',
  'src/modules/notification/actionTypes.js',
  'src/modules/notification/index.js',
  'src/modules/notification/reducer.js',
  'src/utils/form.js',
  'src/utils/router.js',
  'src/constants/paths.js',
  'src/index.jsx',
  'src/index.css',
  'src/theme.js',
  'public/index.html',
  '.github/ISSUE_TEMPLATE/bug_report.md',
  '.github/ISSUE_TEMPLATE/feature_request.md',
  '.github/CONTRIBUTING.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
]

const reduxFiles = ['src/store/createStore.js', 'src/store/reducers.js']

const projectFiles = [
  'package.json',
  '.eslintrc.js',
  '.gitlab-ci.yml',
  'LICENSE',
  '.gitignore',
  'README.md'
]

const firebaseFiles = ['firebase.json', '.firebaserc', 'database.rules.json']

const firestoreFiles = ['firestore.indexes.json', 'firestore.rules']

const defaultOtherFeatures = [
  'Continuous Integration config',
  'Firebase Cloud Messaging',
  'Firebase Functions (with Babel setup)',
]

const messagingFiles = [
  'src/components/SetupMessaging/index.js',
  'src/components/SetupMessaging/SetupMessaging.jsx',
  'src/components/SetupMessaging/useSetupMessaging.js',
]

describe('generator-react-firebase:app', function() {
  this.timeout(15000)
  describe('firebaseProjectId', () => {
    describe('validate', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseProjectId: 'asdf.firebaseio.com',
            otherFeatures: [defaultOtherFeatures[0]],
            ciProvider: 'gitlab'
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
      })
    })
  })

  describe('redux option', () => {
    describe('include', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            otherFeatures: [defaultOtherFeatures[0], defaultOtherFeatures[1]],
            ciProvider: 'gitlab',
            includeRedux: 'Y',
            includeFirestore: false
          })
          .toPromise()
      )
      describe('creates files for', () => {
        describe('project', () => {
          checkForEachFile(projectFiles.concat(messagingFiles))
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
      })
    })

    describe('not include', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            otherFeatures: [
              defaultOtherFeatures[1],
              defaultOtherFeatures[2],
              defaultOtherFeatures[4]
            ],
            includeFirestore: false,
            includeRedux: false,
            useYarn: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
        describe('project', () => {
          checkForEachFile(projectFiles.concat(messagingFiles))
        })
        describe('application', () => {
          checkForEachFile(srcFiles, 'src/')
        })
      })
    })
  })

  describe('tests option', () => {
    describe('include', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            otherFeatures: [defaultOtherFeatures[1], defaultOtherFeatures[3]],
            includeRedux: 'Y',
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
      })
    })
  })

  describe('firestore option', () => {
    describe('include', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            otherFeatures: [defaultOtherFeatures[1], defaultOtherFeatures[2]],
            includeRedux: 'Y',
            includeFirestore: true
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
      })
    })

    describe('not include', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeCI: 'Y',
            ciProvider: 'travis',
            includeFirestore: false,
            includeRedux: false,
            otherFeatures: [defaultOtherFeatures[1], defaultOtherFeatures[2]],
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
      })
    })
  })

  describe('material-ui > v1 option', () => {
    describe('include', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeRedux: 'Y',
            otherFeatures: [
              defaultOtherFeatures[0],
              defaultOtherFeatures[1],
              defaultOtherFeatures[2]
            ],
            includeFirestore: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
        describe('project', () => {
          checkForEachFile(projectFiles)
        })
        describe('application', () => {
          checkForEachFile(takeRight(srcFiles), 'src/')
        })
        describe('Firestore', () => {
          checkForEachFile(firestoreFiles)
        })
      })
    })
  })

  describe('deploy options', () => {
    describe('Firebase', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeFirestore: false,
            includeCI: 'Y',
            ciProvider: 'travis',
            includeRedux: 'Y',
            otherFeatures: [defaultOtherFeatures[1], defaultOtherFeatures[2]]
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
      })
    })
  })

  describe('CI Provider options', () => {
    // Skipped due to test not passing on Travis (unsure of why, it passes locally?)
    describe.skip('Github Actions', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeFirestore: false,
            otherFeatures: [defaultOtherFeatures[0], defaultOtherFeatures[1], defaultOtherFeatures[2]],
            includeCI: 'Y',
            ciProvider: 'githubActions',
            includeRedux: 'N'
          })
          .toPromise()
        )
      describe('Creates files for CI', () => {
        checkForEachFile(['.github/workflows/deploy.yml', '.github/workflows/main.yml'])
      })
    })

    describe('Gitlab', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            githubUser: 'testuser',
            firebaseInstance: 'testing',
            includeFirestore: false,
            otherFeatures: [defaultOtherFeatures[0], defaultOtherFeatures[1], defaultOtherFeatures[2]],
            ciProvider: 'gitlab',
            includeRedux: 'N'
          })
          .toPromise()
      )
      describe('Creates files for CI', () => {
        checkForEachFile(['.gitlab-ci.yml'])
      })
    })
  })
})
