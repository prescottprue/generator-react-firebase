import React, { Component } from 'react'
import PropTypes from 'prop-types'<% if(usingRedux) { %>
import { connect } from 'react-redux'
import {
  firebaseConnect,
  dataToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'<% } %><% if(addStyle) { %>
import classes from './<%= name %>.scss'<% } %>
<% if(usingRedux) { %>
@firebaseConnect([
  '<%= lowerName %>'
])
@connect(
  ({ firebase }) => ({
    <%= lowerName %>: dataToJS(firebase, '<%= lowerName %>')
  })
)<% } %>
export default class <%= name %> extends Component {
  static propTypes = {
    <%= lowerName %>: PropTypes.object
  }

  render () {
    const { <%= lowerName %> } = this.props
    <% if(usingRedux) { %>
    if (!isLoaded(<%= lowerName %>)) {
      return <LoadingSpinner />
    }

    if (isEmpty(<%= lowerName %>)) {
      return (
        <div>
          No <%= name %>s found
        </div>
      )
    }<% } %>

    return (
      <% if (addStyle) { %><div className={classes.container}><%} else { %><div className='<%= name %>'><%}%>
        <p><%= name %></p>
        <pre>{JSON.stringify(<%= lowerName %>, null, 2)}</pre>
      </div>
    )
  }
}
