import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const projectId =
  Cypress.env('FIREBASE_projectId') || Cypress.env('FIREBASE_PROJECT_ID')
const apiKey =
  Cypress.env('FIREBASE_apiKey') || // from CI environment (loaded through firebase-tools)
  Cypress.env('FIREBASE_API_KEY') // from local environment

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL:
    Cypress.env('FIREBASE_databaseURL') || // from CI environment (loaded through firebase-tools)
    Cypress.env('FIREBASE_DATABASE_URL') || // from local environment
    `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`
}

firebase.initializeApp(fbConfig)

// Custom commands including login, signup, callRtdb, and callFirestore
attachCustomCommands({ Cypress, cy, firebase })
