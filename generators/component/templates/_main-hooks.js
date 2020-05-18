import React from 'react'<% if (addStyle) { %>
import { makeStyles } from '@material-ui/core/styles'<% } %>
// import use<%= startCaseName %> from './use<%= startCaseName %>'<% if (addStyle) { %>
import styles from './<%= name %>.styles'

const useStyles = makeStyles(styles)<% } %>

function <%= name %>() {
  <% if (addStyle) { %>const classes = useStyles()<% } %>
  // const {} = use<%= startCaseName %>()

  return (
    <% if (addStyle) { %><div className={classes.root}><% } else { %><div><% } %>
      <span><%= name %> Component</span>
    </div>
  )
}

export default <%= name %>
