import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/material/styles'<% if (!includeRedux) { %>
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import AccountEditor from '../AccountEditor'
import styles from './AccountPage.styles'

const useStyles = makeStyles(styles)

function AccountPage() {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justifyContent="center">
      <Grid item xs={10} md={8} lg={6} className={classes.gridItem}>
        <Paper className={classes.pane}>
          <Typography variant="h4">Account</Typography>
          <% if (!includeRedux) { %><SuspenseWithPerf
            fallback={<LoadingSpinner />}
            traceId="load-account">
            <AccountEditor />
          </SuspenseWithPerf><% } %><% if (includeRedux) { %><AccountEditor /><% } %>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AccountPage
