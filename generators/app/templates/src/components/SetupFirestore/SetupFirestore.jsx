import { useFirestore } from 'reactfire'

export default function SetupFirestore() {
  const firestore = useFirestore()
  if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
    const firestoreSettings = {
      host: process.env.REACT_APP_FIRESTORE_EMULATOR_HOST,
      ssl: false
    }
    if (window.Cypress) {
      // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
      firestoreSettings.experimentalForceLongPolling = true
    }

    firestore.settings(firestoreSettings)
    // eslint-disable-next-line no-console
    console.debug(
      `Firestore emulator enabled: ${process.env.REACT_APP_FIRESTORE_EMULATOR_HOST}`
    )
  }
  return null
}
