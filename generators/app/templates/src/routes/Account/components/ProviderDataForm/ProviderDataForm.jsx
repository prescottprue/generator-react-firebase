import React from 'react'
import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import AccountCircle from '@mui/icons-material/AccountCircle'

function ProviderData({ providerData }) {
  return (
    <List subheader={<ListSubheader>Accounts</ListSubheader>}>
      {providerData.map((providerAccount) => (
        <ListItem key={`Provider-${providerAccount.providerId}`}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={providerAccount.providerId} />
        </ListItem>
      ))}
    </List>
  )
}

ProviderData.propTypes = {
  providerData: PropTypes.array.isRequired
}

export default ProviderData
