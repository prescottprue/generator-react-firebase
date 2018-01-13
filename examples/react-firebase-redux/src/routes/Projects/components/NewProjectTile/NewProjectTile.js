import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import ContentAddCircle from 'material-ui-icons/AddCircle'
import classes from './NewProjectTile.scss'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }

export const NewProjectTile = ({ onClick }) => (
  <Paper className={classes.container} onClick={onClick}>
    <ContentAddCircle style={iconStyle} />
  </Paper>
)

NewProjectTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProjectTile
