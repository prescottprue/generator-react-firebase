import React, { Component } from 'react'<% if(usingRedux) { %>
import { connect } from 'react-redux'
import { firebaseConnect, pathToJS } from 'redux-react-firebase'<% } %><% if(addStyle) { %>
import classes from './<%= name %>.scss'<% } %>
<% if(usingRedux) { %>
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    profile: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class <%= name %> extends Component {
  static propTypes = {

  };

  render () {
    return (
      <% if (addStyle) { %><div className={classes.container}><%} else { %><div className='<%= name %>'><%}%>
        <p><%= name %></p>
      </div>
    )
  }
}
