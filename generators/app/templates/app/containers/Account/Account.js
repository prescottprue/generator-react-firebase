import React, { Component, PropTypes } from 'react'

// styles
import './Account.scss'

<% if (!answers.includeRedux) { %>import firebaseUtil from '../../utils/firebase'<% } %><% if (answers.includeRedux) { %>import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'<% } %>
<% if (!answers.includeRedux) { %>export default class Acccount extends Component {<% } %>
<% if (answers.includeRedux) { %>class Acccount extends Component {<% } %>
  static propTypes = {
    account: PropTypes.object,
    logout: PropTypes.func
  }

  render () {
    const emailTo = `mailto:${this.props.account.email || ''}`
    const { account, logout } = this.props
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
<% if (answers.includeRedux) { %>// Place state of redux store into props of component
const mapStateToProps = (state) => {
  return {
    account: state.account ? state.entities.accounts[state.account.id] : null,
    router: state.router
  }
}

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Acccount)<% } %>
