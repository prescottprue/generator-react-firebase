import React, { useState } from 'react'
import { makeStyles } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectTile from '../ProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsList.styles'

const useStyles = makeStyles(styles)

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const { data: auth } = useUser()
  // Create a ref for projects owned by the current user
  const firestore = useFirestore()
  const { FieldValue, FieldPath } = useFirestore

  const projectsRef = firestore
    .collection(PROJECTS_COLLECTION)
    .where('createdBy', '==', auth?.uid)
    .orderBy(FieldPath.documentId())

  // Query for projects (loading handled by Suspense in ProjectsList)
  const { data: projects } = useFirestoreCollectionData(projectsRef, {
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
        createdAt: FieldValue.serverTimestamp()
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
  const classes = useStyles()
  const {
    projects,
    addProject,
    newDialogOpen,
    toggleDialog
  } = useProjectsList()

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={toggleDialog}>
        Add Project
      </Button>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <div className={classes.tiles} role="list">
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
          <Paper className={classes.empty}>
            <Typography>
              No Projects Found. Click "Add Project" above to add one
            </Typography>
          </Paper>
        )}
      </div>
    </div>
  )
}

export default ProjectsList
