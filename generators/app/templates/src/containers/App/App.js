import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
<% if (includeRedux) { %>import { Provider } from 'react-redux'
<% } %>
// Themeing/Styling
import Theme from 'theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class AppContainer extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  static propTypes = {
    routes: PropTypes.object.isRequired<% if (includeRedux) { %>,
    store: PropTypes.object.isRequired<% } %>
  }

  getChildContext = () => ({
    muiTheme: getMuiTheme(Theme)
  })

  render () {
    <% if (!includeRedux) { %>const { routes } = this.props
    return (
      <Router history={browserHistory}>
        {routes}
      </Router>
    )<% } %><% if (includeRedux) { %>const { routes, store } = this.props
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    )<% } %>
  }
}
