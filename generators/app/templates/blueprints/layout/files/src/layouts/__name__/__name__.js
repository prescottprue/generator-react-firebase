import React from 'react'
import PropTypes from 'prop-types'
import classes from './<%= pascalEntityName %>.scss'

export const <%= pascalEntityName %> = ({ children }) => (
  <div className={classes.container}>
    {children}
  </div>
)

<%= pascalEntityName %>.propTypes = {
  children: PropTypes.element.isRequired
}

export default <%= pascalEntityName %>
