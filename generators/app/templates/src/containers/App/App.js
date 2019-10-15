import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore<% if (includeRedux) { %>
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { Provider } from 'react-redux'<% } %><% if (includeMessaging) { %>
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %><% if (includeErrorHandling || includeSentry) { %>
import { setErrorUser } from '../utils/errorHandler'<% } %>
import ThemeSettings from 'theme'
import { firebase as fbConfig, reduxFirebase as envRfConfig } from 'config'

const theme = createMuiTheme(ThemeSettings)

// ======================================================
// Redux + Firebase Config (react-redux-firebase & redux-firestore)
// ======================================================
const defaultRRFConfig = {
  userProfile: 'users', // root that user profiles are written to
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  presence: 'presence', // list currently online users under "presence" path in RTDB
  sessions: null, // Skip storing of sessions
  enableLogging: false<% if((includeRedux && includeFirestore) || includeMessaging || includeAnalytics) { %>,<% } %> // enable/disable Firebase Database Logging<% if (includeRedux && includeFirestore) { %>
  useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
  useFirestoreForStorageMeta: true<% } %><% if(includeRedux && includeFirestore && (includeMessaging || includeAnalytics)) { %>,<% } %><% if (includeRedux && includeFirestore) { %> // Metadata associated with storage file uploads goes to Firestore<% } %>
  <% if (includeMessaging || includeAnalytics || includeSentry || includeErrorHandling) { %>onAuthStateChanged: (auth, firebaseInstance, dispatch) => {
    if (auth) {<% if (includeSentry || includeErrorHandling) { %>
      // Set auth within error handler
      setErrorUser(auth)<% } %><% if (includeMessaging) { %>
      // Initalize messaging with dispatch
      initializeMessaging(dispatch)<% } %><% if (includeAnalytics) { %>
      // Set auth within analytics
      setAnalyticsUser(auth)<% } %>
    }
  }<% } %><% if (!includeMessaging && !includeAnalytics && !includeSentry && !includeErrorHandling) { %>// profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile<% } %>
}
const rrfConfig = {
  ...defaultRRFConfig,
  ...envRfConfig
}

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

<% if (!includeRedux) { %>function App({ routes }) {
  return (
    <Router history={browserHistory}>{routes}</Router>
  )
}<% } else { %>function App({ routes, store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rrfConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}>
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
