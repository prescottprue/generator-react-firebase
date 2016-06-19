import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

// Components
import Navbar from '../../components/Navbar/Navbar'
// Styling
import Theme from '../../theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class Main extends Component {
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

// Place state of redux store into props of component
const mapStateToProps = (state) => {
  return {
    account: state.account,
    router: state.router
  }
}

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
