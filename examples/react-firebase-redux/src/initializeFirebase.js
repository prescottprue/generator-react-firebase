import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/performance'
import * as config from 'config'

export default function initializeFirebase() {
  const { firebase: firebaseConfig } = config

  // Enable Real Time Database emulator if environment variable is set
  if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
    firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`
  }

  // Initialize Firebase instance
  firebase.initializeApp(config.firebase)
  // Initialize Firebase analytics if measurementId exists
  if (firebaseConfig.measurementId) {
    firebase.analytics()
  }

  // Enable Firestore emulator if environment variable is set
  if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
    const [
      servicePath,
      portStr
    ] = process.env.REACT_APP_FIRESTORE_EMULATOR_HOST.split(':')
    firebase.firestore().settings({
      servicePath,
      port: parseInt(portStr, 10)
    })
  }
}
