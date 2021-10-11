import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/material/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import AccountEditor from '../AccountEditor'

export const Root = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  overflowY: 'scroll'
}));

export const AccountItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(5)
}));

export const Pane = styled(Paper)(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'space-around',
  padding: theme.spacing(6)
}));

function AccountPage() {
  return (
    <Root container justifyContent="center">
      <AccountItem item xs={10} md={8} lg={6}>
        <Pane>
          <Typography variant="h4">Account</Typography>
          <SuspenseWithPerf
            fallback={<LoadingSpinner />}
            traceId="load-account">
            <AccountEditor />
          </SuspenseWithPerf>
        </Pane>
      </AccountItem>
    </Root>
  )
}

export default AccountPage
