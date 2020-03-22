import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useFirestore, useUser, useFirestoreCollection } from 'reactfire'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsList.styles'

const useStyles = makeStyles(styles)

function useProjectsList() {
  // Get current user (loading handled by Suspense in ProjectsList)
  const auth = useUser()

  // Create a ref for projects owned by the current user
  const firestore = useFirestore()
  const projectsRef = firestore
    .collection('projects')
    .where('createdBy', '==', auth.uid)

  // Query for projects (loading handled by Suspense in ProjectsList)
  const projects = useFirestoreCollection(projectsRef)

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    return firestore
      .collection('projects')
      .add({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: Date.now()
        // Not currently supported in reactfire (see https://github.com/FirebaseExtended/reactfire/issues/227)
        // createdAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        toggleDialog()
      })
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
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
          projects.docs((projectSnap, ind) => {
            const project = projectSnap.data()
            return (
              <ProjectTile
                key={`Project-${projectSnap.id}-${ind}`}
                name={project && project.name}
                projectId={projectSnap.id}
              />
            )
          })}
      </div>
    </div>
  )
}

export default ProjectsList
