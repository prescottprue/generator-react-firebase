import React from 'react'
import { useFirestore, useFirestoreDoc, useUser } from 'reactfire'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useNotifications } from 'modules/notification'
import { USERS_COLLECTION } from 'constants/firebasePaths'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountEditor.styles'

const useStyles = makeStyles(styles)

function AccountEditor() {
  const classes = useStyles()
  const { showSuccess, showError } = useNotifications()
  const firestore = useFirestore()
  const auth = useUser()
  const accountRef = firestore.doc(`${USERS_COLLECTION}/${auth.uid}`)
  const profileSnap = useFirestoreDoc(accountRef)
  const profile = profileSnap.data()

  function updateAccount(newAccount) {
    return auth
      .updateProfile(newAccount)
      .then(() => accountRef.set(newAccount, { merge: true }))
      .then(() => showSuccess('Profile updated successfully'))
      .catch((error) => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        showError('Error updating profile: ', error.message || error)
        return Promise.reject(error)
      })
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
