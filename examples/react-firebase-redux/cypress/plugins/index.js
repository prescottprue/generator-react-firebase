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

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // Extends with config from .firebaserc
  return cypressFirebasePlugin(on, config, admin)
}
