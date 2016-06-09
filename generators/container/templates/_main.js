import React, { Component, PropTypes } from 'react'
<% if(answers.usingRedux) { %>
import { firebase, helpers } from 'redux-react-firebase'
<% } %>
<% if(answers.addStyle) { %>
import './<%= name %>.scss'
<% } %>

<% if(answers.usingRedux) { %>
const { isLoaded, isEmpty,  dataToJS, pathToJS } = helpers

// Props decorators
@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    profile: pathToJS(firebase, 'profile')
  })
)
<% } %>
export default class <%= name %> extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {

  };

  render () {
    return (
      <div className='<%= name %>'>

      </div>
    )
  }
}
