import React, { Component, PropTypes } from 'react'


// Components
import Navbar from '../../components/Navbar/Navbar'

// Styling
import Theme from '../../theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


export default class Main extends Component {
  constructor (props) {
    super(props)
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getChildContext = () => {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }

  handleClick = loc => {
    this.context.router.push(`/${loc}`)
  }

  handleLogout = () => {
    this.props.logout()
    this.context.router.push(`/`)
  }

  render () {
    return (
      <div className="App">
        <Navbar
          account={ this.props.account }
          onMenuClick={ this.handleClick }
          onLogoutClick={ this.handleLogout }
        />
        { this.props.children }
      </div>
    )
  }
}

