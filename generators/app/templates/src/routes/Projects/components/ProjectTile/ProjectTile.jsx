import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'<% if (!includeRedux && includeFirestore) { %>
import { useFirestore } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useDatabase } from 'reactfire'<% } %><% if (includeRedux && !includeFirestore) { %>
import { useFirebase } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { useFirestore } from 'react-redux-firebase'<% } %>
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
  const { showError, showSuccess } = useNotifications()<% if (includeRedux && !includeFirestore) { %>
  const firebase = useFirebase()<% } %><% if (includeRedux && includeFirestore) { %>
  const firestore = useFirestore()<% } %><% if (!includeRedux && includeFirestore) { %>
  const firestore = useFirestore()<% } %><% if (!includeRedux && !includeFirestore) { %>
  const database = useDatabase()<% } %>

  function goToProject() {
    return history.push(`${LIST_PATH}/${projectId}`)
  }

  function deleteProject() {
    <% if (includeRedux && !includeFirestore) { %>return firebase
      .remove(`projects/${projectId}`)<% } %><% if (includeRedux && includeFirestore) { %>return firestore
      .delete(`projects/${projectId}`)<% } %><% if (!includeRedux && includeFirestore) { %>return firestore
      .doc(`projects/${projectId}`)
      .delete()<% } %><% if (!includeRedux && !includeFirestore) { %>return database
      .ref(`projects/${projectId}`)
      .remove()<% } %>
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
