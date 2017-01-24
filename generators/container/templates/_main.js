import React, { Component } from 'react'
<% if(usingRedux) { %>import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'redux-react-firebase'<% } %>
<% if(addStyle) { %>import './<%= name %>.scss'<% } %>

<% if(usingRedux) { %>const { pathToJS } = helpers

@firebaseConnect()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    profile: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class <%= name %> extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className='<%= name %>'>

      </div>
    )
  }
}
