const debug = require('debug')('app:build:config')
const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')
const outputPath = path.join(__dirname, '..', 'src/config.js')

const createConfigFile = (cb) => {
  const configObj = {
    version: pkg.version,
    env: 'dev'
  }

  if (process.env.TRAVIS_PULL_REQUEST === false) {
    if (process.env.TRAVIS_BRANCH === 'prod') {
      configObj.env = 'prod'
    }
  }

  const fileString = `export default ${JSON.stringify(configObj, null, 2)}`

  fs.writeFile(outputPath, fileString, 'utf8', (err) => {
    if (err) {
      debug('Error writing config file:', err)
      if (cb) cb(err, null)
      return
    }
    if (cb) cb()
  })
}

(function () {
  createConfigFile(() => {
    debug('Config file successfully written to src/config.js')
  })
})()
