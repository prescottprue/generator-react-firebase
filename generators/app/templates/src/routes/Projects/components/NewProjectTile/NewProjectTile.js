import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import ContentAddCircle from <% if (!materialv1) { %>'material-ui/svg-icons/content/add-circle'<% } %><% if (materialv1) { %>'material-ui-icons/AddCircle'<% } %>
import classes from './NewProjectTile.scss'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }
const color = '#979797'
const hoverColor = '#616161'

export const NewProjectTile = ({ onClick }) => (
  <Paper className={classes.container} onClick={onClick}>
    <ContentAddCircle <% if (materialv1) { %>style={iconStyle}<% } %>
      <% if (!materialv1) { %>style={iconStyle}
      color={color}
      hoverColor={hoverColor}<% } %>
    />
  </Paper>
)

NewProjectTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProjectTile
