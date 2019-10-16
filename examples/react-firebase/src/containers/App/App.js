import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ThemeSettings from 'theme'
import { defaultRRFConfig } from 'defaultConfig'
import { firebase as fbConfig, reduxFirebase as envRfConfig } from 'config'

const theme = createMuiTheme(ThemeSettings)

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

function App({ routes }) {
  return (
    <FirebaseAppProvider firebaseConfig={fbConfig} initPerformance>
      <Router history={browserHistory}>{routes}</Router>
    </FirebaseAppProvider>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired
}

export default App
