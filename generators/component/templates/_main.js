import React from 'react'
import PropTypes from 'prop-types'<% if (addStyle) { %>
import classes from './<%= name %>.scss'<%}%>

export const <%= name %> = ({ <%= name %> }) => (
  <% if (addStyle) { %><div className={classes.container}><%} else { %><div className='<%= name %>'><%}%>
    <span><%= name %> Component</span>
  </div>
)

<%= name %>.propTypes = {
  <%= name %>: PropTypes.object
}
