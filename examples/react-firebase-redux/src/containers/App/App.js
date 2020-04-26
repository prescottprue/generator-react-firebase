import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ThemeSettings from '../../theme'
import { defaultRRFConfig } from '../../defaultConfig'
import initializeFirebase from '../../initializeFirebase'

const theme = createMuiTheme(ThemeSettings)

initializeFirebase()

function App({ routes, store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <NotificationsProvider>
          <ReactReduxFirebaseProvider
            firebase={firebase}
            config={defaultRRFConfig}
            dispatch={store.dispatch}>
            <Router>{routes}</Router>
          </ReactReduxFirebaseProvider>
        </NotificationsProvider>
      </Provider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default App
