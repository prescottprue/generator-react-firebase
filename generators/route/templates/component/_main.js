import React from 'react'
import PropTypes from 'prop-types'
import classes from './<%= name %>.scss'

export const <%= name %> = ({ <%= lowerName %> }) => (
  <div className={classes.container}>
    <span><%= name %> Component</span>
    <pre>{JSON.stringify(<%= lowerName %>, null, 2)}</pre>
  </div>
)

<%= name %>.propTypes = {
  <%= lowerName %>: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default <%= name %>
