// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  if (!config.env || !config.env.envName || config.env.envName === 'local') {
    config.baseUrl = 'http://localhost:3000'
  } else {
    config.baseUrl = `https://<%= firebaseName %>.firebaseapp.com`
  }
  return config
}
