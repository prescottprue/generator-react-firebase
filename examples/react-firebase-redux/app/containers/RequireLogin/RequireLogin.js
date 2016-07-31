import React, { Component, PropTypes } from 'react' //eslint-disable-line

export default class RequireLogin extends Component {
  static propTypes = {
    children: PropTypes.array
  }

  static onEnter (store) {
    return (nextState, transition) => {
      const { auth: { user } } = store.getState()
      if (!user) {
        // oops, not logged in, so can't be here!
        transition.to('/')
      }
    }
  }

  render () {
    return this.props.children
  }
}
