<% if (hasPropTypes) { %>import React from 'react'
import PropTypes from 'prop-types'<% } else { %>import React, { PropTypes } from 'react'<% } %>;<% if (addStyle) { %>
import classes from './<%= name %>.scss';<%}%>

export const <%= name %> = ({ <%= camelName %> }) => (
  <% if (addStyle) { %><div className={classes.container}><% } else { %><div className='<%= name %>'><%}%>
    <span><%= name %> Component</span>
    <pre>{JSON.stringify(<%= camelName %>, null, 2)}</pre>
  </div>
);

<%= name %>.propTypes = {
  <%= camelName %>: PropTypes.object, <% if (includeEnhancer) { %> // from enhancer (firestoreConnect + connect)<% } %>
};

export default <%= name %>;
