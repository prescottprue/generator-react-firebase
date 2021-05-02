const defer = require('config/defer').deferConfig;

const config = {
  cloudFunctionsUrl: defer(function cloudFunctionsUrl() {
    if (!this.firebase) {
      console.log(
        `Missing Firebase SDK config. Run yarn setup to set this.`,
      );
    }
    return `https://us-central1-${this.firebase.projectId}.cloudfunctions.net`;
  }),
  // Only configuration for Cypress goes here
  cypress: {
    env: {
      firebase: defer(function firebaseSdk() {
        return this.firebase;
      }),
      TEST_UID: 'aMAy91SPbuXTMvmiYoSNd3V8NcY2',
      TZ: 'America/Los_Angeles',
    },
    experimentalFetchPolyfill: true,
    retries: 3,
  },
  environment: process.env.NODE_CONFIG_ENV || 'local',
  sentry: {
    dsn:
      'https://646bc3658d834efc847a8c4047f8b25d@o39081.ingest.sentry.io/5242582',
    enabled: !process.env.LOCAL_DEV,
  },
};

module.exports = config;
