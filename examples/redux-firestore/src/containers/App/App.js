import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'firebase/firestore'
import { initializeMessaging } from 'utils/firebaseMessaging'
import { setAnalyticsUser } from 'utils/analytics'
import { setErrorUser } from 'utils/errorHandler'
import ThemeSettings from 'theme'
import { defaultRRFConfig } from 'defaultConfig'
import { firebase as fbConfig, reduxFirebase as envRfConfig } from 'config'

const theme = createMuiTheme(ThemeSettings)

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

// Combine default and environment specific configs for react-redux-firebase
const rrfConfig = {
  ...defaultRRFConfig,
  ...envRfConfig
}

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
