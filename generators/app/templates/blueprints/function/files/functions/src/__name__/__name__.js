import React from 'react'
import PropTypes from 'prop-types'
import classes from './<%= pascalEntityName %>.scss'

export const <%= pascalEntityName %> = ({ <%= camelEntityName %> }) => (
  <div className={classes.container}>
    <h1><%= pascalEntityName %></h1>
    <div>
      <pre>{JSON.stringify(<%= camelEntityName %>, null, 2)}</pre>
    </div>
  </div>
)

<%= pascalEntityName %>.propTypes = {
  <%= camelEntityName %>: PropTypes.object
}

export default <%= pascalEntityName %>
