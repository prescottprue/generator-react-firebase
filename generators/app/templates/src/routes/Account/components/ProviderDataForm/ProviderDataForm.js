import React from 'react'
import PropTypes from 'prop-types'
<% if (!materialv1) { %>import { List, ListItem } from 'material-ui/List'<% } %><% if (materialv1) { %>import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'<% } %>
import AccountCircle from <% if (materialv1) { %>'material-ui-icons/AccountCircle'<% } %><% if (!materialv1) { %>'material-ui/svg-icons/action/account-circle'<% } %>
import classes from './ProviderDataForm.scss'

export const ProviderData = ({ providerData }) => (
  <div className={classes.container}>
    <% if (!materialv1) { %><List>
      {providerData.map((providerAccount, i) => (
        <% if (!materialv1) { %><ListItem
          key={i}
          primaryText={providerAccount.providerId}
          leftIcon={<AccountCircle />}
          nestedItems={[
            <ListItem
              key="displayName"
              primaryText={providerAccount.displayName}
            />,
            <ListItem
              key="email"
              label="email"
              primaryText={providerAccount.email}
              disabled
            /><% } %><% if (materialv1) { %><ListItem button>
              <ListItemText primary={providerAccount.displayName} />
            </ListItem>,
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={providerAccount.email} />
            </ListItem>
            <% } %>
          ]}
        />
      ))}
    </List><% } %><% if (materialv1) { %><List subheader={<ListSubheader>Accounts</ListSubheader>}>
      {providerData.map((providerAccount, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={providerAccount.providerId} />
        </ListItem>
      ))}
    </List><% } %>
  </div>
)

ProviderData.propTypes = {
  providerData: PropTypes.array.isRequired
}

export default ProviderData
