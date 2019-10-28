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
import 'firebase/database'<% if (includeAnalytics) { %>
import 'firebase/analytics'<% } %><% if (includeRedux && includeFirestore) { %>
import 'firebase/firestore'<% } %><% if (includeMessaging) { %>
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %><% if (includeErrorHandling || includeSentry) { %>
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
}<% } %><% if (includeRedux) { %>

// Combine default and environment specific configs for react-redux-firebase
const rrfConfig = {
  ...defaultRRFConfig,
  ...envRfConfig
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
          config={config.reduxFirebase}
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
