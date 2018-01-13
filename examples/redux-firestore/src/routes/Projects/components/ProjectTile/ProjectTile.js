import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import classes from './ProjectTile.scss'

export const ProjectTile = ({ name, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name} onClick={onSelect}>
        {name || 'No Name'}
      </span>
      {showDelete && onDelete ? (
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </div>
  </Paper>
)

ProjectTile.propTypes = {
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
