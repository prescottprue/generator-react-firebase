import React, { Component, PropTypes } from 'react'
<% if (!answers.includeRedux) { %>import firebase from '../../utils/firebase'<% } %><% if (answers.includeRedux) { %>import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS } = helpers<% } %>

import './Account.scss'

<% if (answers.includeRedux) { %>//Pass Firebase Profile to account prop
@firebase()
@connect(
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class Acccount extends Component {
  static propTypes = {
    account: PropTypes.object,
    logout: PropTypes.func
  }

  render () {
    const { account, logout } = this.props
    const emailTo = `mailto:${this.props.account.email || ''}`
    return (
      <div className='Acccount'>
        <div className='Acccount-Data'>
          <span className='Acccount-Datapoint Acccount-Username'>
            { account.username }
          </span>
          <span className='Acccount-Datapoint Acccount-Name'>
            { account.name || 'No Name' }
          </span>
          <span className='Acccount-Datapoint Acccount-Role'>
            { account.role }
          </span>
          <a className='Acccount-Datapoint Acccount-Email' href={ emailTo }>
            { account.email }
          </a>
          <button className='Button' onClick={ logout }>
            Logout
          </button>
        </div>
      </div>
    )
  }
}
