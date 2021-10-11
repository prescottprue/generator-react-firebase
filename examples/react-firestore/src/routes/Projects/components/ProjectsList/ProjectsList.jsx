import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { getFirestore, collection, query, where, orderBy, serverTimestamp, documentId } from 'firebase/firestore'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectTile from '../ProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import {
  Root,
  Tiles,
  EmptyMessage
} from './ProjectsList.styled'

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const { data: auth } = useUser()
  const firestore = useFirestore()
  const projectsRef = collection(firestore, PROJECTS_COLLECTION)
  // Create a ref for projects owned by the current user
  const projectsQuery = query(
    projectsRef,
    where('createdBy', '==', auth?.uid),
    orderBy(documentId())
  )

  // Query for projects (loading handled by Suspense in ProjectsList)
  const { data: projects } = useFirestoreCollectionData(projectsQuery, {
    idField: 'id'
  })

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    return firestore
      .collection(PROJECTS_COLLECTION)
      .add({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: serverTimestamp()
      })
      .then(() => {
        toggleDialog()
        showSuccess('Project added successfully')
      })
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add project')
        return Promise.reject(err)
      })
  }

  return { projects, addProject, newDialogOpen, toggleDialog }
}

function ProjectsList() {
  const {
    projects,
    addProject,
    newDialogOpen,
    toggleDialog
  } = useProjectsList()

  return (
    <Root>
      <Button variant="contained" onClick={toggleDialog}>
        Add Project
      </Button>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <Tiles role="list">
        {projects?.length ?
          projects.map((project, ind) => {
            return (
              <ProjectTile
                key={project.id}
                name={project?.name}
                projectId={project.id}
              />
            )
          })
        : (
          <EmptyMessage>
            <Typography>
              No Projects Found. Click "Add Project" above to add one
            </Typography>
          </EmptyMessage>
        )}
      </Tiles>
    </Root>
  )
}

export default ProjectsList
