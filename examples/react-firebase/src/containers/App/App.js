import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'

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
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  }

  render () {
    const { history, routes } = this.props
    return (
      <div style={{ height: '100%' }}>
        <Router history={history} children={routes} />
      </div>
    )
  }
}
