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
const firestoreHost = `localhost:${emulators.firestore.port}`

// Set emulator env vars so Firebase internals know that we're using the emulators
process.env.FIRESTORE_EMULATOR_HOST = firestoreHost

const config = {
  cloudFunctionsUrl: `http://localhost:${emulators.functions.port}/${gcloudProject}/us-central1`,
  emulators: {
    authHost,
    firestoreHost,
    functionsHost: `http://localhost:${emulators.functions.port}`
  }
}

module.exports = config
