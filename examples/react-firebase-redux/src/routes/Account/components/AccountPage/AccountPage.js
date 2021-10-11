import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccountEditor from '../AccountEditor'
import { styled } from '@mui/material/styles';

export const Root = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  overflowY: 'scroll'
}));

export const Item = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(5)
}));

export const Pane = styled(Paper)(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'space-around',
  padding: theme.spacing(6)
}));

function AccountPage() {
  const classes = useStyles()

  return (
    <Root container justifyContent="center">
      <Item item xs={10} md={8} lg={6}>
        <Pane>
          <Typography variant="h4">Account</Typography>
          <AccountEditor />
        </Pane>
      </Item>
    </Root>
  )
}

export default AccountPage
