import React, { Component } from 'react'
import PropTypes from 'prop-types'<% if(usingRedux) { %>
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'<% } %><% if(addStyle) { %>
import classes from './<%= name %>.scss'<% } %>
<% if(usingRedux) { %>
@firebaseConnect([
  <%= name %>
])
@connect(
  ({ firebase }) => ({
    <%= name %>: dataToJS(firebase, <%= name %>)
  })
)<% } %>
export default class <%= name %> extends Component {
  static propTypes = {
    <%= name %>: PropTypes.object
  }

  render () {
    const { <%= name %> } = this.props
    <% if(usingRedux) { %>if (!isLoaded(<%= name %>)) {
      return <LoadingSpinner />
    }

    if (isEmpty(<%= name %>)) {
      return (
        <div>
          No <%= name %>s found
        </div>
      )
    }<% } %>

    return (
      <% if (addStyle) { %><div className={classes.container}><%} else { %><div className='<%= name %>'><%}%>
        <p><%= name %></p>
        <pre>{JSON.stringify(<%= name %>, null, 2)}</pre>
      </div>
    )
  }
}
