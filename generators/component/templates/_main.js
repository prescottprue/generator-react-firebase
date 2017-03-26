import React, { Component } from 'react'<% if (addStyle) { %>
import classes from './<%= name %>.scss'<%}%>

export default class <%= name %> extends Component {
  static propTypes = {

  }

  render () {
    return (
      <% if (addStyle) { %><div className={classes.container}><%} else { %><div className='<%= name %>'><%}%>
        <span><%= name %> Component</span>
      </div>
    )
  }
}
