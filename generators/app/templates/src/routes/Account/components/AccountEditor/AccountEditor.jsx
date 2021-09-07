import React from 'react'<% if (!includeRedux && includeFirestore) { %>
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useDatabase, useDatabaseObjectData, useUser } from 'reactfire'<% } %>
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'<% if (includeRedux) { %>
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import { useNotifications } from 'modules/notification'<% if (!includeRedux) { %>
import { USERS_COLLECTION } from 'constants/firebasePaths'<% } %>
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountEditor.styles'

const useStyles = makeStyles(styles)

function AccountEditor() {
  const classes = useStyles()
  const { showSuccess, showError } = useNotifications()<% if (!includeRedux && includeFirestore) { %>
  const firestore = useFirestore()
  const { data: auth } = useUser()
  const accountRef = firestore.doc(`${USERS_COLLECTION}/${auth.uid}`)
  const { data: profile } = useFirestoreDocData(accountRef)<% } %><% if (!includeRedux && !includeFirestore) { %>
  const database = useDatabase()
  const { data: auth } = useUser()
  const accountRef = database.ref(`${USERS_COLLECTION}/${auth.uid}`)
  const { data: profile } = useDatabaseObjectData(accountRef)<% } %><% if (includeRedux) { %>
  const firebase = useFirebase()

  // Get profile from redux state
  const profile = useSelector(({ firebase }) => firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }<% } %>

  async function updateAccount(newAccount) {
    try {
      await <% if (includeRedux) { %>firebase.updateProfile(newAccount)<% } %><% if (!includeRedux) { %>auth.updateProfile(newAccount)
      await accountRef.set(newAccount, { merge: true })<% } %>
      showSuccess('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile', err) // eslint-disable-line no-console
      showError(`Error updating profile: ${err.message}`)
    }
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
        <img
          className={classes.avatarCurrent}
          src={(profile && profile.avatarUrl) || defaultUserImageUrl}
          alt=""
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
        <AccountForm onSubmit={updateAccount} account={profile} />
      </Grid>
    </Grid>
  )
}

export default AccountEditor
