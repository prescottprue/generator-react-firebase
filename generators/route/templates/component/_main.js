<% if (hasPropTypes) { %>import React from 'react'
import PropTypes from 'prop-types'<% } else { %>import React, { PropTypes } from 'react'<% } %><% if (styleType === 'scss') { %>
import classes from './<%= componentName %>.scss'<% } %>

function <%= componentName %>({ <%= camelName %><% if (styleType !== 'scss') { %>, classes<% } %> }) {
  return (
    <div className={classes.container}>
      <span><%= componentName %> Component</span>
      <pre>{JSON.stringify(<%= camelName %>, null, 2)}</pre>
    </div>
  )
}

<%= componentName %>.propTypes = {<% if (styleType !== 'scss') { %>
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)<% } %>
  <%= camelName %>: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default <%= componentName %>
