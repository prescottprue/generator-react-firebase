import React from 'react'<% if (includeRedux) { %>
import PropTypes from 'prop-types'<% } %><% if (!includeRedux) { %>
import { FirebaseAppProvider<% if (!includeRedux) { %>, SuspenseWithPerf<% } %> } from 'reactfire'<% } %>
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'config'<% if (includeRedux) { %>
import { Provider } from 'react-redux'
import { getAuth, connectAuthEmulator }  from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator }  from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator }  from 'firebase/database'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { createFirestoreInstance } from 'redux-firestore'<% } %>
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'
import { StyledEngineProvider } from '@mui/material/styles';
import FirebaseComponents from 'components/FirebaseComponents'<% if (includeRedux) { %>
import { defaultRRFConfig } from './defaultConfig'<% } %><% if (includeRedux) { %>
import initializeFirebase from './initializeFirebase'<% } %>
import { createTheme } from '@mui/material/styles';
import theme from './theme'<% if (!includeRedux) { %>
import createRoutes from './routes'<% } %><% if (includeRedux) { %>
initializeFirebase()<% } %><% if (!includeRedux) { %>

function App() {
  const routes = createRoutes()

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <FirebaseAppProvider firebaseConfig={config.firebase} suspense>
          <FirebaseComponents>
            <NotificationsProvider>
              <Router>{routes}</Router>
            </NotificationsProvider>
          </FirebaseComponents>
        </FirebaseAppProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}<% } else { %>
function App({ routes, store }) {
  return (
    <ThemeProvider theme={createTheme(theme)}>
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
