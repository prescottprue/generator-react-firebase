import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'<% if (includeRedux && includeFirestore) { %>
import 'firebase/firestore'<% } %><% if (includeMessaging) { %>
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %><% if (includeErrorHandling || includeSentry) { %>
import { setErrorUser } from 'utils/errorHandler'<% } %>
import ThemeSettings from 'theme'
import { defaultRRFConfig } from 'defaultConfig'
import { firebase as fbConfig, reduxFirebase as envRfConfig } from 'config'

const theme = createMuiTheme(ThemeSettings)

// Initialize Firebase instance
firebase.initializeApp(fbConfig)<% if (includeRedux) { %>

// Combine default and environment specific configs for react-redux-firebase
const rrfConfig = {
  ...defaultRRFConfig,
  ...envRfConfig
}<% } %>

<% if (!includeRedux) { %>function App({ routes }) {
  return (
    <FirebaseAppProvider firebaseConfig={fbConfig} initPerformance>
      <Router history={browserHistory}>{routes}</Router>
    </FirebaseAppProvider>
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
