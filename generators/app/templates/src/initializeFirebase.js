import firebase from 'firebase/app'<% if (includeRedux) { %>
import 'firebase/auth'
import 'firebase/database'<% } %><% if (includeRedux && includeFirestore) { %>
import 'firebase/firestore'<% } %><% if (includeRedux) { %>
import 'firebase/performance'<% } %><% if (!includeRedux && includeAnalytics) { %>
import 'firebase/analytics'<% } %><% if (!includeRedux && includeMessaging) { %>
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (!includeRedux && includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %><% if (!includeRedux && (includeErrorHandling || includeSentry)) { %>
import { setErrorUser } from 'utils/errorHandler'<% } %>
import * as config from 'config'

export default function initializeFirebase() {
  const { firebase: firebaseConfig } = config

  // Enable Real Time Database emulator if environment variable is set
  if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
    firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`
    console.debug(`RTDB emulator enabled: ${firebaseConfig.databaseURL}`) // eslint-disable-line no-console
  }

  // Initialize Firebase instance
  firebase.initializeApp(config.firebase)<% if (includeAnalytics) { %>
  // Initialize Firebase analytics if measurementId exists
  if (firebaseConfig.measurementId) {
    firebase.analytics()
  }<% } %><% if (!includeRedux && (includeMessaging || includeAnalytics || includeSentry || includeErrorHandling)) { %>
  firebase.auth().onAuthStateChanged(auth => {
    if (auth) {<% if (includeSentry || includeErrorHandling) { %>
      // Set auth within error handler
      setErrorUser(auth)<% } %><% if (includeAnalytics) { %>
      // Set auth within analytics
      setAnalyticsUser(auth)<% } %>
    }
  })
  <% } %>

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
