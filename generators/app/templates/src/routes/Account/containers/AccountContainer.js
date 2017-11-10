import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'<% if (includeRedux) { %>
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { reduxFirebase as fbReduxSettings } from 'config'
import { UserIsAuthenticated } from 'utils/router'<% } %>
import defaultUserImageUrl from 'static/User.png'
import LoadingSpinner from 'components/LoadingSpinner'
import AccountForm from '../components/AccountForm/AccountForm'
import classes from './AccountContainer.scss'

<% if (includeRedux) { %>@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect()
@connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile
}))<% } %>
export default class Account extends Component {
  <% if (includeRedux) { %>static propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired
    })
  }

  updateAccount = (newAccount) => {
    const { firebase: { update }, auth } = this.props
    // corresponds to /users/${uid}
    return update(`${fbReduxSettings.userProfile}/${auth.uid}`, newAccount)
  }<% } %>
<% if (!includeRedux) { %>
  handleSave = () => {
    // TODO: Handle saving image and profile data at the same time
    const profile = {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue()
    }
  }
<% } %>
  render () {
    const { profile } = this.props

    if (!isLoaded(profile)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.pane}>
          <div className={classes.settings}>
            <div className={classes.avatar}>
              <img
                className={classes.avatarCurrent}
                src={profile && profile.avatarUrl ? profile.avatarUrl : defaultUserImageUrl}
                onClick={this.toggleModal}
              />
            </div>
            <div className={classes.meta}>
              <AccountForm
                onSubmit={this.updateAccount}
                initialValues={profile}
                account={profile}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
