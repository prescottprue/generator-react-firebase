import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
<% if (!materialv1) { %>import { withContext } from 'recompose'<% } else { %>import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'<% } %><% if (includeRedux) { %>
import { Provider } from 'react-redux'<% } %><% if (!materialv1) { %>
import getMuiTheme from 'material-ui/styles/getMuiTheme'<% } %>
import ThemeSettings from 'theme'<% if (materialv1) { %>

const theme = createMuiTheme(ThemeSettings)
<% } %>
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

export default <% if (!materialv1) { %>withContext(
  {
    muiTheme: PropTypes.object
  },
  () => ({ muiTheme: getMuiTheme(ThemeSettings) })
)(App)<% } %><% if (materialv1) { %>App<% } %>
