import _debug from 'debug'
import { version } from '../package.json'
import fs from 'fs'
import path from 'path'
const debug = _debug('app:build:config')
const { TRAVIS_BRANCH, TRAVIS_PULL_REQUEST } = process.env

const createConfigFile = (cb) => {
  const configObj = {
    version,
    env: 'dev'
  }

  if (TRAVIS_PULL_REQUEST === false) {
    if (TRAVIS_BRANCH === 'prod') {
      configObj.env = 'prod'
    }
  }

  const outputPath = path.join(__dirname, '..', 'src/config.js')
  const fileString = `export default ${JSON.stringify(configObj, null, 2)}`

  fs.writeFile(outputPath, fileString, 'utf8', (err) => {
    if (err) return debug('Error writing config file:', err)
    if (cb) cb()
  })
}

;(async function () {
  createConfigFile(() => {
    debug('Config file successfully written to src/config.js')
  })
})()
