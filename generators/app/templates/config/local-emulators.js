const { emulators } = require('../firebase.json')

const missingEnvVars = ['GCLOUD_PROJECT'].filter((key) => !process.env[key])

if (missingEnvVars.length) {
  throw new Error(
    `Cannot set emulator config: Missing environment variable(s): ${missingEnvVars.join(
      ', '
    )}.`
  )
}

const gcloudProject = process.env.GCLOUD_PROJECT
const authHost = `localhost:${emulators.auth.port}`
const databaseHost = `localhost:${emulators.database.port}`<% if (includeFirestore) { %>
const firestoreHost = `localhost:${emulators.firestore.port}`<% } %>

// Set emulator env vars so Firebase internals know that we're using the emulators<% if (includeFirestore) { %>
process.env.FIRESTORE_EMULATOR_HOST = firestoreHost<% } %>
process.env.FIREBASE_DATABASE_EMULATOR_HOST = databaseHost
process.env.FIREBASE_AUTH_EMULATOR_HOST = authHost

const config = {
  cloudFunctionsUrl: `http://localhost:${emulators.functions.port}/${gcloudProject}/us-central1`,
  emulators: {
    authHost,
    databaseHost,<% if (includeFirestore) { %>
    firestoreHost,<% } %>
    functionsHost: `http://localhost:${emulators.functions.port}`
  },
  firebase: {
    databaseURL: `http://${databaseHost}?ns=${gcloudProject}`
  }
}

module.exports = config
