import React from 'react'
import classes from './<%= pascalEntityName %>.scss'

// redux/devshare
import { connect } from 'react-redux'
import { devshare, helpers } from 'redux-devshare'
const { pathToJS } = helpers

// decorators
@devshare()
@connect(
  ({devshare}) => ({
    authError: pathToJS(devshare, 'authError')
  })
)
export class <%= pascalEntityName %> extends Component {
  render() {
    return (
      <div className={classes['<%= pascalEntityName %>']}>
        <h1><%= pascalEntityName %></h1>
      </div>
    )
  }
}
export default <%= pascalEntityName %>
