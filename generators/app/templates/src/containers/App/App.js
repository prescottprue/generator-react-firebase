import React from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { FirebaseAppProvider<% if (includeMessaging) { %>, SuspenseWithPerf<% } %> } from 'reactfire'<% } %>
import { BrowserRouter as Router } from 'react-router-dom'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'<% if (includeMessaging) { %>
import SetupMessaging from 'components/SetupMessaging'<% } %>
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
  console.debug(`RTDB emulator enabled: ${firebaseConfig.databaseURL}`) // eslint-disable-line no-console
}

function App({ routes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} initPerformance>
        <NotificationsProvider><% if (includeMessaging) { %>
          <>
            <Router>{routes}</Router>
            <SuspenseWithPerf traceId="load-messaging">
              <SetupMessaging />
            </SuspenseWithPerf>
          </><% } %><% if (!includeMessaging) { %>
          <Router>{routes}</Router><% } %>
        </NotificationsProvider>
      </FirebaseAppProvider>
    </MuiThemeProvider>
  )
}<% } else { %>
function App({ routes, store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <NotificationsProvider>
          <ReactReduxFirebaseProvider
            firebase={firebase}
            config={defaultRRFConfig}
            dispatch={store.dispatch}<% if (includeRedux && includeFirestore) { %>
            createFirestoreInstance={createFirestoreInstance}<% } %>><% if (includeMessaging) { %>
            <>
              <Router>{routes}</Router>
              <SetupMessaging />
            </><% } %><% if (!includeMessaging) { %>
            <Router>{routes}</Router><% } %>
          </ReactReduxFirebaseProvider>
        </NotificationsProvider>
      </Provider>
    </MuiThemeProvider>
  )
}<% } %>

App.propTypes = {
  routes: PropTypes.object.isRequired<% if (includeRedux) { %>,
  store: PropTypes.object.isRequired<% } %>
}

export default App
