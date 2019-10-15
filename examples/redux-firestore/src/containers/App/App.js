import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { Provider } from 'react-redux'
import { initializeMessaging } from 'utils/firebaseMessaging'
import { setAnalyticsUser } from 'utils/analytics'
import { setErrorUser } from '../utils/errorHandler'
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
  enableLogging: false, // enable/disable Firebase Database Logging
  useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
  useFirestoreForStorageMeta: true, // Metadata associated with storage file uploads goes to Firestore
  onAuthStateChanged: (auth, firebaseInstance, dispatch) => {
    if (auth) {
      // Set auth within error handler
      setErrorUser(auth)
      // Initalize messaging with dispatch
      initializeMessaging(dispatch)
      // Set auth within analytics
      setAnalyticsUser(auth)
    }
  }
}
const rrfConfig = {
  ...defaultRRFConfig,
  ...envRfConfig
}

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

function App({ routes, store }) {
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
}

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default App
