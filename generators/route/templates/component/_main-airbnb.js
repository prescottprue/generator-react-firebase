<% if (hasPropTypes) { %>import React from 'react';
import PropTypes from 'prop-types';<% } else { %>import React, { PropTypes } from 'react'<% } %>;<% if (addStyle && styleType === 'scss') { %>
import classes from './<%= componentName %>.scss';<%}%>

export const <%= componentName %> = ({ <%= camelName %><% if (addStyle && styleType !== 'scss') { %>, classes<%}%> }) => (
  <% if (addStyle) { %><div className={classes.root}><% } else { %><div className="<%= componentName %>"><%}%>
    <span><%= componentName %> Component</span>
    <pre>{JSON.stringify(<%= camelName %>, null, 2)}</pre>
  </div>
);

<%= componentName %>.propTypes = {
  <% if (addStyle && styleType !== 'scss') { %>classes: PropTypes.object, // from enhancer (withStyles)
  <% } %><%= camelName %>: PropTypes.object,<% if (includeEnhancer) { %> // from enhancer (firestoreConnect + connect)<% } %>
};

export default <%= componentName %>;
