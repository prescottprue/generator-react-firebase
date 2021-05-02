const defer = require('config/defer').deferConfig

const config = {
  cloudFunctionsUrl: defer(function cloudFunctionsUrl() {
    if (!this.firebase) {
      console.log('Missing Firebase SDK config. Run yarn setup to set this.')
    }
    return `https://us-central1-${this.firebase.projectId}.cloudfunctions.net`
  }),
  // Only configuration for Cypress goes here
  cypress: {
    baseUrl: 'http://localhost:3000',
    env: {
      firebase: defer(function firebaseSdk() {
        return this.firebase
      }),
      TEST_UID: 'TestUser',
      TZ: 'America/Los_Angeles'
    },
    experimentalFetchPolyfill: true,
    retries: 3
  },
  environment: process.env.NODE_CONFIG_ENV || 'local',
  sentry: {
    dsn: '',
    enabled: !process.env.LOCAL_DEV
  }
}

module.exports = config
