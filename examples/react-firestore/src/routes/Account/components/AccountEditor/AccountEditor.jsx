import React from 'react'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'
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
  const { data: auth } = useUser()
  const accountRef = firestore.doc(`${USERS_COLLECTION}/${auth.uid}`)
  const { data: profile } = useFirestoreDocData(accountRef)

  async function updateAccount(newAccount) {
    try {
      await auth.updateProfile(newAccount)
      await accountRef.set(newAccount, { merge: true })
      showSuccess('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile', err) // eslint-disable-line no-console
      showError(`Error updating profile: ${err.message}`)
    }
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
