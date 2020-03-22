import React from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { FirebaseAppProvider } from 'reactfire'<% } %>
import { BrowserRouter as Router } from 'react-router-dom'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'<% if (includeRedux) { %>
import 'firebase/auth'
import 'firebase/database'<% } %><% if (includeRedux && includeFirestore) { %>
import 'firebase/firestore'<% } %><% if (includeRedux) { %>
import 'firebase/performance'<% } %><% if (!includeRedux && includeAnalytics) { %>
import 'firebase/analytics'<% } %><% if (!includeRedux && includeMessaging) { %>
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (!includeRedux && includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %><% if (!includeRedux && (includeErrorHandling || includeSentry)) { %>
import { setErrorUser } from 'utils/errorHandler'<% } %>
import ThemeSettings from 'theme'<% if (includeRedux) { %>
import { defaultRRFConfig } from 'defaultConfig'<% } %>
import * as config from 'config'

const theme = createMuiTheme(ThemeSettings)

if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
  config.firebase.databaseURL = `http://${
    process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST
  }?ns=${config.firebase.projectId}`
}

// Initialize Firebase instance
firebase.initializeApp(config.firebase)<% if (includeAnalytics) { %>
// Initialize Firebase analytics if measurementId exists
if (config.firebase.measurementId) {
  firebase.analytics()
}<% } %><% if (!includeRedux && (includeMessaging || includeAnalytics || includeSentry || includeErrorHandling)) { %>
firebase.auth().onAuthStateChanged(auth => {
  if (auth) {<% if (includeSentry || includeErrorHandling) { %>
    // Set auth within error handler
    setErrorUser(auth)<% } %><% if (includeMessaging) { %>
    // Initalize messaging
    initializeMessaging()<% } %><% if (includeAnalytics) { %>
    // Set auth within analytics
    setAnalyticsUser(auth)<% } %>
  }
})
<% } %>
// Enable Firestore emulator if environment variable is set
if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
  const [servicePath, portStr] = process.env.REACT_APP_FIRESTORE_EMULATOR_HOST.split(':')
  firebase.firestore().settings({
    servicePath,
    port: parseInt(portStr, 10)
  })
}

<% if (!includeRedux) { %>function App({ routes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={config.firebase} initPerformance>
        <Router>{routes}</Router>
      </FirebaseAppProvider>
    </MuiThemeProvider>
  )
}<% } else { %>function App({ routes, store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={defaultRRFConfig}
          dispatch={store.dispatch}<% if (includeRedux && includeFirestore) { %>
          createFirestoreInstance={createFirestoreInstance}<% } %>>
          <Router>{routes}</Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </MuiThemeProvider>
  )
}<% } %>

App.propTypes = {
  routes: PropTypes.object.isRequired<% if (includeRedux) { %>,
  store: PropTypes.object.isRequired<% } %>
}

export default App
