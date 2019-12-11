import React from 'react'
import { useFirebaseApp, useDatabaseObject, useUser } from 'reactfire'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountPage.styles'

const useStyles = makeStyles(styles)

function AccountPage() {
  const classes = useStyles()
  const firebase = useFirebaseApp()
  const auth = useUser()
  const accountRef = firebase.database().ref(`users/${auth.uid}`)
  const profileSnap = useDatabaseObject(accountRef)
  const profile = profileSnap.snapshot.val()

  function updateAccount(newAccount) {
    return firebase
      .updateProfile(newAccount)
      .then(() => accountRef.update(newAccount))
      .catch(error => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        return Promise.reject(error)
      })
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
