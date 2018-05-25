import React from 'react'
import PropTypes from 'prop-types'<% if (!materialv1) { %>
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'<% } %><% if (materialv1) { %>
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'<% } %>
import classes from './ProjectTile.scss'

export const ProjectTile = ({ name, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name} onClick={onSelect}>
        {name || 'No Name'}
      </span>
      {showDelete && onDelete ? (
        <% if (materialv1) { %><Tooltip title="delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip><% } %><% if (!materialv1) { %><IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton><% } %>
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
