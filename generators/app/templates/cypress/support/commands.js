import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const projectId =
  Cypress.env('FB_projectId') || Cypress.env('FIREBASE_PROJECT_ID')
const env = Cypress.env('env') || 'stage'
const apiKey =
  Cypress.env('FB_apiKey') ||
  Cypress.env(`${env.toUpperCase()}_FIREBASE_API_KEY`) ||
  Cypress.env('FIREBASE_API_KEY')

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL:
    Cypress.env('FB_databaseURL') || `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`
}

firebase.initializeApp(fbConfig)

// Custom commands including login, signup, callRtdb, and callFirestore
attachCustomCommands({ Cypress, cy, firebase })
