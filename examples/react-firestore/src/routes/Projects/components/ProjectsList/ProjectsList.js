import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
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
  const { FieldValue } = useFirestore

  // TODO: Move this to top level once supported by reactfire. See
  // https://github.com/FirebaseExtended/reactfire/issues/235 for more details
  // Enable Firestore emulator if environment variable is set
  if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
    /* eslint-disable no-console */
    console.debug(
      `Firestore emulator enabled: ${process.env.REACT_APP_FIRESTORE_EMULATOR_HOST}`
    )
    /* eslint-enable no-console */
    firestore.settings({
      host: process.env.REACT_APP_FIRESTORE_EMULATOR_HOST,
      ssl: false
    })
  }

  const projectsRef = firestore
    .collection('projects')
    .where('createdBy', '==', auth.uid)

  // Query for projects (loading handled by Suspense in ProjectsList)
  const projects = useFirestoreCollectionData(projectsRef, { idField: 'id' })

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    return firestore
      .collection('projects')
      .add({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: FieldValue.serverTimestamp()
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
