<% if (hasPropTypes) { %>import React from 'react'
import PropTypes from 'prop-types'<% } else { %>import React, { PropTypes } from 'react'<% } %><% if (styleType === 'scss') { %>
import classes from './<%= componentName %>.scss'<% } %>

export const <%= componentName %> = ({ <%= lowerName %><% if (styleType !== 'scss') { %>, classes<% } %> }) => (
  <div className={classes.container}>
    <span><%= componentName %> Component</span>
    <pre>{JSON.stringify(<%= lowerName %>, null, 2)}</pre>
  </div>
)

<%= componentName %>.propTypes = {<% if (styleType !== 'scss') { %>
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)<% } %>
  <%= lowerName %>: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default <%= componentName %>
