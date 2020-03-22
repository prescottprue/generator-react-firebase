import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/performance'
import * as config from 'config'

export default function initializeFirebase() {
  const { firebase: firebaseConfig } = config

  // Enable Real Time Database emulator if environment variable is set
  if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
    firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`
    console.debug(`RTDB emulator enabled: ${firebaseConfig.databaseURL}`) // eslint-disable-line no-console
  }

  // Initialize Firebase instance
  firebase.initializeApp(config.firebase)

  // Enable Firestore emulator if environment variable is set
  if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
    /* eslint-disable no-console */
    console.debug(
      `Firestore emulator enabled: ${process.env.REACT_APP_FIRESTORE_EMULATOR_HOST}`
    )
    /* eslint-enable no-console */
    firebase.firestore().settings({
      host: process.env.REACT_APP_FIRESTORE_EMULATOR_HOST,
      ssl: false
    })
  }
}
