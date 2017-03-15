import React, { Component } from 'react'
<% if (addStyle) { %>import './<%= name %>.scss'<%}%>

export default class <%= name %> extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className='<%= name %>'>
        <%= name %> Component
      </div>
    )
  }
}
