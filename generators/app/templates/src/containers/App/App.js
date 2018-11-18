import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'<% if (includeRedux) { %>
import { Provider } from 'react-redux'<% } %>
import ThemeSettings from 'theme'

const theme = createMuiTheme(ThemeSettings)

<% if (!includeRedux) { %>const App = ({ routes }) => (
  <Router history={browserHistory}>{routes}</Router>
)<% } else { %>const App = ({ routes, store }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
  </MuiThemeProvider>
)<% } %>

App.propTypes = {
  routes: PropTypes.object.isRequired<% if (includeRedux) { %>,
  store: PropTypes.object.isRequired<% } %>
}

export default App
