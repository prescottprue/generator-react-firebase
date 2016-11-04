const debug = require('debug')('app:build:deploy')
const exec = require('child_process').exec

const deployToFirebase = (cb) => {
  if (process.env.TRAVIS_BRANCH && process.env.TRAVIS_BRANCH !== 'master') {
    debug('Skipping Firebase Deploy - Branch is not master.')
    if (cb) return cb(null)
  }
  if (!!process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST === true) {
    debug('Skipping Firebase Deploy - Build is a Pull Request')
    if (cb) return cb(null)
  }
  if (!process.env.FIREBASE_TOKEN) {
    debug('Error: FIREBASE_TOKEN env variable not found')
    return cb('Error: FIREBASE_TOKEN env variable not found', null)
  }
  debug('Deploying to Firebase...')
  exec(`firebase deploy --token ${process.env.FIREBASE_TOKEN}`, (error) => {
    if (error !== null) {
      debug('error uploading to Firebase url: ', error)
      if (cb) return cb(error)
    }
    if (cb) cb(null)
  })
}

(function () {
  deployToFirebase(() => {
    debug('Successfully deployed to Firebase')
  })
})()
