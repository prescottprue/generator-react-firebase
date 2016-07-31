import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { dataToJS, pathToJS } = helpers

// Components
import Navbar from '../Navbar/Navbar'

// Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
//Props decorators
@firebase()
@connect(
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile'),
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
    logout: PropTypes.func
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
    console.log('handle logout called')
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

// // Place state of redux store into props of component
// const mapStateToProps = (state) => {
//   return {
//     account: state.account,
//     router: state.router
//   }
// }
//
// // Place action methods into props
// const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)
//
// export default connect(mapStateToProps, mapDispatchToProps)(Main)
