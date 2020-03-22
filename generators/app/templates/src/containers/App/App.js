import React from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { FirebaseAppProvider } from 'reactfire'<% } %>
import { BrowserRouter as Router } from 'react-router-dom'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ThemeSettings from '../../theme'<% if (includeRedux) { %>
import { defaultRRFConfig } from '../../defaultConfig'<% } %><% if (!includeRedux) { %>
import * as config from '../../config'<% } %><% if (includeRedux) { %>
import initializeFirebase from '../../initializeFirebase'<% } %>

const theme = createMuiTheme(ThemeSettings)

<% if (includeRedux) { %>initializeFirebase()
<% } %><% if (!includeRedux) { %>const { firebase: firebaseConfig } = config

// Enable Real Time Database emulator if environment variable is set
if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
  firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`
}

function App({ routes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} initPerformance>
        <Router>{routes}</Router>
      </FirebaseAppProvider>
    </MuiThemeProvider>
  )
}<% } else { %>
function App({ routes, store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={defaultRRFConfig}
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
