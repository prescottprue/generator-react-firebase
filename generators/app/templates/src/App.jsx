import React from 'react'<% if (includeRedux) { %>
import PropTypes from 'prop-types'<% } %><% if (!includeRedux) { %>
import { FirebaseAppProvider<% if (!includeRedux) { %>, SuspenseWithPerf<% } %> } from 'reactfire'<% } %>
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'config'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'<% if (includeMessaging) { %>
import SetupMessaging from 'components/SetupMessaging'<% } %><% if (!includeRedux && includeFirestore) { %>
import SetupFirestore from 'components/SetupFirestore'<% } %><% if (includeAnalytics) { %>
import SetupAnalytics from 'components/SetupAnalytics'<% } %><% if (includeRedux) { %>
import { defaultRRFConfig } from './defaultConfig'<% } %><% if (includeRedux) { %>
import initializeFirebase from './initializeFirebase'<% } %><% if (!includeRedux) { %>
import createRoutes from './routes'<% } %>

<% if (includeRedux) { %>initializeFirebase()
<% } %><% if (!includeRedux) { %>// Enable Real Time Database emulator if environment variable is set
if (config.firebase.databaseURL.includes('localhost')) {
  console.debug(`RTDB emulator enabled: ${config.firebase.databaseURL}`) // eslint-disable-line no-console
}

function App() {
  const routes = createRoutes()
  return (
    <ThemeProvider>
      <FirebaseAppProvider
        firebaseConfig={config.firebase}
        suspense
        initPerformance>
        <NotificationsProvider><% if (includeMessaging || includeFirestore || includeAnalytics) { %>
          <>
            <Router>{routes}</Router><% if (includeFirestore) { %>
            <SuspenseWithPerf traceId="setup-firestore">
              <SetupFirestore />
            </SuspenseWithPerf><% } %><% if (includeMessaging) { %>
            <SuspenseWithPerf traceId="setup-messaging">
              <SetupMessaging />
            </SuspenseWithPerf><% } %><% if (includeAnalytics) { %>
            <SuspenseWithPerf traceId="setup-analytics">
              <SetupAnalytics />
            </SuspenseWithPerf><% } %>
          </><% } %><% if (!includeMessaging && !includeFirestore && !includeAnalytics) { %>
          <Router>{routes}</Router><% } %>
        </NotificationsProvider>
      </FirebaseAppProvider>
    </ThemeProvider>
  )
}<% } else { %>
function App({ routes, store }) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}<% } %><% if (includeRedux) { %>

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}<% } %>

export default App
