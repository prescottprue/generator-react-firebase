// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const cypressFirebasePlugin = require('cypress-firebase').plugin
const admin = require('firebase-admin')
const config = require('config')

module.exports = (on, incomingConfig) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const fromCypressFirebase = cypressFirebasePlugin(on, incomingConfig, admin, {
    databaseURL: config.firebase.databaseURL
  })
  const mergedConfig = config.util.extendDeep(
    fromCypressFirebase,
    config.cypress
  )

  // Allow CI to override base URL since plugins configuration takes precedence
  // over environment variables in Cypress
  if (process.env.CYPRESS_BASE_URL) {
    mergedConfig.baseUrl = process.env.CYPRESS_BASE_URL
  }

  return mergedConfig
}
