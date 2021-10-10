import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useFirestore } from 'reactfire'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import makeStyles from '@mui/styles/makeStyles';
import { LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import styles from './ProjectTile.styles'

const useStyles = makeStyles(styles)

function ProjectTile({ name, projectId, showDelete }) {
  const classes = useStyles()
  const history = useHistory()
  const { showError, showSuccess } = useNotifications()
  const firestore = useFirestore()

  function goToProject() {
    return history.push(`${LIST_PATH}/${projectId}`)
  }

  function deleteProject() {
    return firestore
      .doc(`projects/${projectId}`)
      .delete()
      .then(() => showSuccess('Project deleted successfully'))
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete project')
        return Promise.reject(err)
      })
  }

  return (
    <Paper className={classes.root} role="listitem">
      <div className={classes.top}>
        <span className={classes.name} onClick={goToProject}>
          {name || 'No Name'}
        </span>
        {showDelete ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteProject} size="large">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Paper>
  );
}

ProjectTile.propTypes = {
  projectId: PropTypes.string.isRequired,
  showDelete: PropTypes.bool,
  name: PropTypes.string
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
