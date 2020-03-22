import React from 'react'
import PropTypes from 'prop-types'
import { FirebaseAppProvider } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import ThemeSettings from 'theme'
import * as config from 'config'

const theme = createMuiTheme(ThemeSettings)

if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
  config.firebase.databaseURL = `http://${
    process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST
  }?ns=${config.firebase.projectId}`
}

// Initialize Firebase instance
firebase.initializeApp(config.firebase)
// Enable Firestore emulator if environment variable is set
if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
  const [servicePath, portStr] = process.env.REACT_APP_FIRESTORE_EMULATOR_HOST.split(':')
  firebase.firestore().settings({
    servicePath,
    port: parseInt(portStr, 10)
  })
}

function App({ routes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={config.firebase} initPerformance>
        <Router>{routes}</Router>
      </FirebaseAppProvider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired
}

export default App
