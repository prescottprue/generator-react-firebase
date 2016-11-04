import _debug from 'debug'
const debug = _debug('app:build:deploy')
const exec = require('child_process').exec
const { TRAVIS_BRANCH, TRAVIS_PULL_REQUEST, FIREBASE_TOKEN } = process.env

const deployToFirebase = (cb) => {
  if (TRAVIS_BRANCH && TRAVIS_BRANCH !== 'master') {
    debug('Skipping Firebase Deploy - Branch is not master.')
    if (cb) return cb(null)
  }
  if (!!TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST === true) {
    debug('Skipping Firebase Deploy - Build is a Pull Request')
    if (cb) return cb(null)
  }
  if (!FIREBASE_TOKEN) {
    debug('Error: FIREBASE_TOKEN env variable not found')
    return cb('Error: FIREBASE_TOKEN env variable not found', null)
  }
  debug('Deploying to Firebase...')
  exec(`firebase deploy --token ${FIREBASE_TOKEN}`, (error) => {
    if (error !== null) {
      debug('error uploading to Firebase url: ', error)
      if (cb) return cb(error)
    }
    if (cb) cb(null)
  })
}

;(async function () {
  deployToFirebase(() => {
    debug('Successfully deployed to Firebase')
  })
})()
