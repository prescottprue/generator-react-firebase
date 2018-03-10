import React from 'react'
import PropTypes from 'prop-types'
import classes from './<%= pascalEntityName %>Page.scss'

export const <%= pascalEntityName %>Page = ({ <%= camelEntityName %> }) => (
  <div className={classes.container}>
    <h1><%= pascalEntityName %></h1>
    <div>
      <pre>{JSON.stringify(<%= camelEntityName %>, null, 2)}</pre>
    </div>
  </div>
)

<%= pascalEntityName %>Page.propTypes = {
  <%= camelEntityName %>: PropTypes.object
}

export default <%= pascalEntityName %>Page
