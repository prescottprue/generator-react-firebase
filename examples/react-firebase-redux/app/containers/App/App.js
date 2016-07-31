import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers
// Components
import Navbar from '../Navbar/Navbar'

// Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

//Pass Firebase Profile to account prop
@firebase()
@connect(
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class Main extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    children: PropTypes.object,
    logout: PropTypes.func,
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme)
    }
  )

  handleClick = loc => {
    this.context.router.push(`/${loc}`)
  }

  handleLogout = () => {
    this.props.firebase.logout()
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
