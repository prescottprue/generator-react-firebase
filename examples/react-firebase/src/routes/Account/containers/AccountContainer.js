import React, { Component, PropTypes } from 'react'

// Components
import AccountForm from '../components/AccountForm/AccountForm'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'

// styles
import classes from './AccountContainer.scss'

const defaultUserImageUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'

export default class Account extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = { modalOpen: false }

  handleLogout = () => {
    // TODO: Handle logout without react-redux-firebase
  }

  handleSave = () => {
    // TODO: Handle saving image and account data at the same time
    const account = {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue()
    }
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render () {
    const { account, firebase: { saveAccount } } = this.props

    if (!isLoaded(account)) {
      return (
        <div className={classes['container']}>
          <CircularProgress size={1.5} />
        </div>
      )
    }

    return (
      <div className={classes['container']}>
        <Paper className={classes['pane']}>
          <div className={classes['settings']}>
            <div className={classes['avatar']}>
              <img
                className={classes['avatar-current']}
                src={account && account.avatarUrl || defaultUserImageUrl}
                onClick={this.toggleModal}
              />
            </div>
            <div className={classes['meta']}>
              <AccountForm
                onSubmit={saveAccount}
                account={account}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
