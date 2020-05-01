import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsList.styles'

const useStyles = makeStyles(styles)

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const auth = useUser()
  // Create a ref for projects owned by the current user
  const firestore = useFirestore()
  const { FieldValue, FieldPath } = useFirestore

  const projectsRef = firestore
    .collection(PROJECTS_COLLECTION)
    .where('createdBy', '==', auth?.uid)
    .orderBy(FieldPath.documentId())

  // Query for projects (loading handled by Suspense in ProjectsList)
  const projects = useFirestoreCollectionData(projectsRef, { idField: 'id' })

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
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <div className={classes.tiles}>
        <NewProjectTile onClick={toggleDialog} />
        {projects &&
          projects.map((project, ind) => {
            return (
              <ProjectTile
                key={`Project-${project.id}-${ind}`}
                name={project && project.name}
                projectId={project.id}
              />
            )
          })}
      </div>
    </div>
  )
}

export default ProjectsList
