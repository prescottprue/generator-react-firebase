import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import AccountDropdown from '../AccountDropdown/AccountDropdown'

import './AccountManager.scss'

export default class AccountManager extends Component {
  static propTypes = {
    account: PropTypes.object,
    onLogoutClick: PropTypes.func
  }

  render () {
    const { account, onLogoutClick } = this.props
    if (account && account.username) {
      return (
        <AccountDropdown
          account={account}
          onLogoutClick={onLogoutClick}
        />
      )
    }
    return (
      <div className='AccountManager-Buttons'>
        <Link className='AccountManager-Button' to='/login'>
          Login
        </Link>
        <Link className='AccountManager-Button' to='/signup'>
          Signup
        </Link>
      </div>
    )
  }
}
