import React, { Component, PropTypes } from 'react'

// Components
import AccountForm from '../components/AccountForm/AccountForm'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'

// styles
import classes from './AccountContainer.scss'

const defaultUserImageUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { pathToJS, isLoaded } = helpers

// Props decorators
@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Account extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired,
      uploadAvatar: PropTypes.func,
      updateAccount: PropTypes.func
    })
  }

  state = { modalOpen: false }

  handleLogout = () => {
    this.props.firebase
      .logout()
      .then(() => this.context.router.push('/'))
  }

  handleSave = () => {
    // TODO: Handle saving image and account data at the same time
    const account = {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue()
    }
    this.props.firebase
      .updateAccount(account)
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
