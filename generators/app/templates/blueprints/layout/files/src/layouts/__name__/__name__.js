import React from 'react'
import classes from './<%= pascalEntityName %>.scss'

export const <%= pascalEntityName %> = ({ children }) => (
  <div className={classes['<%= pascalEntityName %>']}>
    {children}
  </div>
)

<%= pascalEntityName %>.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default <%= pascalEntityName %>
