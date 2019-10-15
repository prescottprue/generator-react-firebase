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
  enableLogging: false // enable/disable Firebase Database Logging
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
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
