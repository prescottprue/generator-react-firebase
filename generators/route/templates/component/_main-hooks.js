import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './<%= componentName %>.styles'<% if (addStyle && styleType === 'scss') { %>
import classes from './<%= componentName %>.scss'<%}%>

const useStyles = makeStyles(styles)

function <%= componentName %>() {
  const classes = useStyles()<% if (includeHook) { %>
  const {} = use<%= startCaseName %>()<% } %>

  return (
    <% if (addStyle) { %><div className={classes.root}><% } else { %><div className="<%= name %>"><%}%>
      <span><%= name %> Component</span><% if (includeEnhancer) { %>
      <pre>{JSON.stringify(<%= camelName %>, null, 2)}</pre><%}%>
    </div>
  )
}

export default <%= componentName %>
