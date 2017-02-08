import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
<% if (answers.includeRedux) { %>import { Provider } from 'react-redux'
<% } %>
// Themeing/Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class AppContainer extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme)
    }
  )

  static propTypes = {
    routes: PropTypes.object.isRequired<% if (answers.includeRedux) { %>,
    store: PropTypes.object.isRequired<% } %>
  }

  render () {
    <% if (!answers.includeRedux) { %>const { routes } = this.props
    return (
      <div style={{ height: '100%' }}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </div>
    )<% } %><% if (answers.includeRedux) { %>const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory}>
            {routes}
          </Router>
        </div>
      </Provider>
    )<% } %>
  }
}
