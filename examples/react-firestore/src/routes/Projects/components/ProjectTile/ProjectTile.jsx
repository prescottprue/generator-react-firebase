import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useFirestore } from 'reactfire'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { makeStyles } from '@mui/material/styles'
import { LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import {
  Root,
  TileContent,
  ProjectName
} from './ProjectTile.styled'

function ProjectTile({ name, projectId, showDelete }) {
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
    <Root role="listitem">
      <TileContent>
        <ProjectName onClick={goToProject}>
          {name || 'No Name'}
        </ProjectName>
        {showDelete ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteProject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </TileContent>
    </Root>
  )
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
