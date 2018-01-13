import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'
import AccountCircle from 'material-ui-icons/AccountCircle'
import classes from './ProviderDataForm.scss'

export const ProviderData = ({ providerData }) => (
  <div className={classes.container}>
    <List subheader={<ListSubheader>Accounts</ListSubheader>}>
      {providerData.map((providerAccount, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={providerAccount.providerId} />
        </ListItem>
      ))}
    </List>
  </div>
)

ProviderData.propTypes = {
  providerData: PropTypes.array.isRequired
}

export default ProviderData
