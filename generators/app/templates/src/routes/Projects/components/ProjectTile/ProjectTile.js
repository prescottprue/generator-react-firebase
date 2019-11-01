import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'<% if (!includeRedux) { %>
import { useFirebaseApp } from 'reactfire'<% } %><% if (includeRedux) { %>
import { useFirebase } from 'react-redux-firebase'<% } %>
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { LIST_PATH } from 'constants/paths'<% if (includeRedux) { %>
import useNotifications from 'modules/notification/useNotifications'<% } %>
import styles from './ProjectTile.styles'

const useStyles = makeStyles(styles)

function ProjectTile({ name, projectId, showDelete }) {
  const classes = useStyles()
  const history = useHistory()<% if (includeRedux) { %>
  const firebase = useFirebase()
  const { showError, showSuccess } = useNotifications()<% } %><% if (!includeRedux) { %>
  const firebase = useFirebaseApp()<% } %>

  function goToProject() {
    return history.push(`${LIST_PATH}/${projectId}`)
  }

  function deleteProject() {
    <% if (includeRedux) { %>return firebase
      .remove(`projects/${projectId}`)
      .then(() => showSuccess('Project deleted successfully'))
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete project')
        return Promise.reject(err)
      })<% } %><% if (!includeRedux) { %>return firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .delete()
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        return Promise.reject(err)
      })<% } %>
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <span className={classes.name} onClick={goToProject}>
          {name || 'No Name'}
        </span>
        {showDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={deleteProject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Paper>
  )
}

ProjectTile.propTypes = {
  name: PropTypes.string
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
