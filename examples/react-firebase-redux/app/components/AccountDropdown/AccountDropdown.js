import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './AccountDropdown.scss'

export default class AccountDropdown extends Component {
  static propTypes = {
    account: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,
    onLogoutClick: PropTypes.func
  }

  state = { isOpen: false }

  toggleDropdown = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    if (!this.state.isOpen) {
      return (
        <div className='AccountDropdown-Closed'>
          <button onClick={this.toggleDropdown}>
            {this.props.account.username}
          </button>
        </div>
      )
    }
    return (
      <div className='AccountDropdown-Open'>
        <button onClick={this.toggleDropdown}>
          {this.props.account.username}
        </button>
        <Link className='AccountDropdown-Link' to='/account'>
          Profile
        </Link>
        <button onClick={this.props.onLogoutClick}>
          Logout
        </button>
      </div>
    )
  }
}
