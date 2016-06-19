import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// styles
import './Account.scss'

// firebase
import firebaseUtil from '../../utils/firebase'


export default class Acccount extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    account: PropTypes.object,
  };

  render () {
    const emailTo = `mailto:${this.props.account.email || ''}`
    return (
      <div className='Acccount'>
        <div className='Acccount-Data'>
          <span className='Acccount-Datapoint Acccount-Username'>
            { this.props.account.username }
          </span>
          <span className='Acccount-Datapoint Acccount-Name'>
            { this.props.account.name || 'No Name' }
          </span>
          <span className='Acccount-Datapoint Acccount-Role'>
            { this.props.account.role }
          </span>
          <a className='Acccount-Datapoint Acccount-Email' href={ emailTo }>
            { this.props.account.email }
          </a>
          <button className='Button' onClick={ this.props.logout }>
            Logout
          </button>
        </div>
      </div>
    )
  }
}

