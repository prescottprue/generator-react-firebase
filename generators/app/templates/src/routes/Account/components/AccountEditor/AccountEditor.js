import React from 'react'<% if (!includeRedux && includeFirestore) { %>
import { useFirestore, useFirestoreDoc, useUser } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useDatabase, useDatabaseObject, useUser } from 'reactfire'<% } %>
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'<% if (includeRedux) { %>
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import { useNotifications } from 'modules/notification'<% } %>
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountEditor.styles'

const useStyles = makeStyles(styles)

function AccountEditor() {
  const classes = useStyles()<% if (!includeRedux && includeFirestore) { %>
  const firestore = useFirestore()
  const auth = useUser()
  const accountRef = firestore.doc(`users/${auth.uid}`)
  const profileSnap = useFirestoreDoc(accountRef)
  const profile = profileSnap.data()<% } %><% if (!includeRedux && !includeFirestore) { %>
  const database = useDatabase()
  const auth = useUser()
  const accountRef = database.ref(`users/${auth.uid}`)
  const profileSnap = useDatabaseObject(accountRef)
  const profile = profileSnap.snapshot.val()<% } %><% if (includeRedux) { %>
  const firebase = useFirebase()
  const { showSuccess, showError } = useNotifications()

  // Get profile from redux state
  const profile = useSelector(({ firebase }) => firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }<% } %>

  function updateAccount(newAccount) {
    return <% if (includeRedux) { %>firebase
      .updateProfile(newAccount)
      .then(() => showSuccess('Profile updated successfully'))
      .catch((error) => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        showError('Error updating profile: ', error.message || error)
        return Promise.reject(error)
      })<% } %><% if (!includeRedux) { %>auth
      .updateProfile(newAccount)
      .then(() => accountRef.set(newAccount, { merge: true }))
      .catch((error) => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        return Promise.reject(error)
      })<% } %>
  }

  return (
    <Grid container spacing={2} justify="center">
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
