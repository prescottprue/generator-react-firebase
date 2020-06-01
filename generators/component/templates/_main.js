import React from 'react'
import { makeStyles } from '@material-ui/core/styles'<% if (addStyle) { %>
import styles from './<%= name %>.styles'<% } %>

const useStyles = makeStyles(styles)

function <%= name %>() {
  <% if (addStyle) { %>const classes = useStyles()<% } %>

  return (
    <% if (addStyle) { %><div className={classes.root}><% } else { %><div><% } %>
      <span><%= name %> Component</span>
    </div>
  )
}

export default <%= name %>
