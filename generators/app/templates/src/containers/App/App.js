import React from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { FirebaseAppProvider } from 'reactfire'<% } %>
import { BrowserRouter as Router } from 'react-router-dom'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'<% if (includeRedux && includeFirestore) { %>
import 'firebase/firestore'<% } %>
import 'firebase/performance'<% if (!includeRedux && includeAnalytics) { %>
import 'firebase/analytics'<% } %><% if (!includeRedux && includeMessaging) { %>
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (!includeRedux && includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %><% if (!includeRedux && (includeErrorHandling || includeSentry)) { %>
import { setErrorUser } from 'utils/errorHandler'<% } %>
import ThemeSettings from 'theme'<% if (includeRedux) { %>
import { defaultRRFConfig } from 'defaultConfig'<% } %>
import * as config from 'config'

const theme = createMuiTheme(ThemeSettings)

// Initialize Firebase instance
firebase.initializeApp(config.firebase)<% if (includeAnalytics) { %>
// Initialize Firebase analytics if measurementId exists
if (config.firebase.measurementId) {
  firebase.analytics();
}<% } %><% if (!includeRedux && (includeMessaging || includeAnalytics || includeSentry || includeErrorHandling)) { %>
firebase.auth().onAuthStateChanged((auth) => {
  if (auth) {<% if (includeSentry || includeErrorHandling) { %>
    // Set auth within error handler
    setErrorUser(auth)<% } %><% if (includeMessaging) { %>
    // Initalize messaging
    initializeMessaging()<% } %><% if (includeAnalytics) { %>
    // Set auth within analytics
    setAnalyticsUser(auth)<% } %>
  }
})
<% } %><% if (includeRedux) { %>
// Combine default and environment specific configs for react-redux-firebase
const rrfConfig = {
  ...defaultRRFConfig,
  ...(config.reduxFirebase || {})
}<% } %>

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
          config={rrfConfig}
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
