import React from 'react'<% if (!includeRedux && includeFirestore) { %>
import { useFirebaseApp, useFirestoreDoc, useUser } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useFirebaseApp, useDatabaseObject, useUser } from 'reactfire'<% } %>
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'<% if (includeRedux) { %>
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import { useNotifications } from 'modules/notification'<% } %>
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountPage.styles'

const useStyles = makeStyles(styles)

function AccountPage() {
  const classes = useStyles()<% if (!includeRedux && includeFirestore) { %>
  const firebase = useFirebaseApp()
  const auth = useUser()
  const accountRef = firebase
    .firestore()
    .collection('users')
    .doc(auth.uid)
  const profileSnap = useFirestoreDoc(accountRef)
  const profile = profileSnap.data()<% } %><% if (!includeRedux && !includeFirestore) { %>
  const firebase = useFirebaseApp()
  const auth = useUser()
  const accountRef = firebase.database().ref(`users/${auth.uid}`)
  const profileSnap = useDatabaseObject(accountRef)
  const profile = profileSnap.snapshot.val()<% } %><% if (includeRedux) { %>
  const firebase = useFirebase()
  const { showSuccess, showError } = useNotifications()

  // Get profile from redux state
  const profile = useSelector(state => state.firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }<% } %>

  function updateAccount(newAccount) {
    return <% if (includeRedux) { %>firebase
      .updateProfile(newAccount)
      .then(() => showSuccess('Profile updated successfully'))
      .catch(error => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        showError('Error updating profile: ', error.message || error)
        return Promise.reject(error)
      })<% } %><% if (!includeRedux && includeFirestore) { %>firebase
      .updateProfile(newAccount)
      .then(() => accountRef.set(newAccount, { merge: true }))
      .catch(error => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        return Promise.reject(error)
      })<% } %><% if (!includeRedux && !includeFirestore) { %>firebase
      .updateProfile(newAccount)
      .then(() => accountRef.update(newAccount))
      .catch(error => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        return Promise.reject(error)
      })<% } %>
  }

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10} md={8} lg={6} className={classes.gridItem}>
        <Paper className={classes.pane}>
          <Typography variant="h4" className={classes.title}>
            Account
          </Typography>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
              <img
                className={classes.avatarCurrent}
                src={profile.avatarUrl || defaultUserImageUrl}
                alt=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
              <AccountForm onSubmit={updateAccount} account={profile} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AccountPage
