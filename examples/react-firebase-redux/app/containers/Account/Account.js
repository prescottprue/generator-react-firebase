import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Link } from 'react-router'
import './Account.scss'

class Acccount extends Component {
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

// Place state of redux store into props of component
const mapStateToProps = (state) => {
  return {
    account: state.account ? state.entities.accounts[state.account.id] : null,
    router: state.router
  }
}


// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Acccount)
