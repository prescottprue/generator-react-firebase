import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import './AccountManager.scss'

export default class AccountManager extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    account: PropTypes.object,
    onLogoutClick: PropTypes.func
  };

  render () {
    if(this.props.account && this.props.account.username){
      return (
        <AccountDropdown
          account={ this.props.account }
          onLogoutClick={ this.props.onLogoutClick }
        />
      )
    }
    return (
      <div className="AccountManager-Buttons">
        <Link className="AccountManager-Button" to="/login">
          Login
        </Link>
        <Link className="AccountManager-Button" to="/signup">
          Signup
        </Link>
      </div>
    )
  }
}
