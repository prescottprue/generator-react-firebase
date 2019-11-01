import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './<%= name %>.styles'

const useStyles = makeStyles(styles)

function <%= name %>(<% if (includeEnhancer) { %>{ <%= camelName %> }<% } %>) {
  const classes = useStyles()
  <% if (includeHook) { %>const {} = use<%= startCaseName %>()
  <% } %>
  return (
    <% if (addStyle) { %><div className={classes.root}><% } else { %><div className="<%= name %>"><%}%>
      <span><%= name %> Component</span><% if (includeEnhancer) { %>
      <pre>{JSON.stringify(<%= camelName %>, null, 2)}</pre><%}%>
    </div>
  )
}

export default <%= name %>
