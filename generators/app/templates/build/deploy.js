const _debug = require('debug') // eslint-disable-line no-underscore-dangle
const exec = require('child_process').exec
const {
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST,
  FIREBASE_TOKEN
} = process.env
const debug = _debug('app:build:deploy')

const deployToFirebase = (cb) => {
  debug('Travis Variables:', { TRAVIS_PULL_REQUEST, TRAVIS_BRANCH })
  if (!!TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST !== 'false') {
    debug('Skipping Firebase Deploy - Build is a Pull Request')
    return
  }

  if (TRAVIS_BRANCH !== 'prod' && TRAVIS_BRANCH !== 'stage' && TRAVIS_BRANCH !== 'master') {
    debug('Skipping Firebase Deploy - Build is a not a Build Branch', TRAVIS_BRANCH)
    return
  }

  if (!FIREBASE_TOKEN) {
    debug('Error: FIREBASE_TOKEN env variable not found')
    cb('Error: FIREBASE_TOKEN env variable not found', null)
    return
  }

  debug('Deploying to Firebase...')

  exec(`firebase deploy --token ${FIREBASE_TOKEN}`, (error, stdout) => {
    if (error !== null) {
      if (cb) {
        cb(error, null)
        return
      }
    }
    if (cb) {
      cb(null, stdout)
    }
  })
}

(function () {
  deployToFirebase((err, stdout) => {
    if (err || !stdout) {
      debug('error deploying to Firebase: ', err)
      return
    }
    debug(stdout) // log output of firebase cli
    debug('\nSuccessfully deployed to Firebase')
  })
})()
