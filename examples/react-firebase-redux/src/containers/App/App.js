import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/performance'
import ThemeSettings from 'theme'
import { defaultRRFConfig } from 'defaultConfig'
import * as config from 'config'

const theme = createMuiTheme(ThemeSettings)

if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
  config.firebase.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${config.firebase.projectId}`
}

// Initialize Firebase instance
firebase.initializeApp(config.firebase)
// Initialize Firebase analytics if measurementId exists
if (config.firebase.measurementId) {
  firebase.analytics()
}
// Enable Firestore emulator if environment variable is set
if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
  const [
    servicePath,
    portStr
  ] = process.env.REACT_APP_FIRESTORE_EMULATOR_HOST.split(':')
  firebase.firestore().settings({
    servicePath,
    port: parseInt(portStr, 10)
  })
}

function App({ routes, store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={defaultRRFConfig}
          dispatch={store.dispatch}>
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
