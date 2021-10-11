import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { getFirestore, collection, addDoc, query, where, orderBy, serverTimestamp, documentId } from 'firebase/firestore'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectCard from '../ProjectCard'
import NewProjectDialog from '../NewProjectDialog'
import { Root, CardsList } from './ProjectsList.styled'

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

  async function addProject(newInstance) {
    try {
      await addDoc(
        collection(firestore, PROJECTS_COLLECTION),
        {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: serverTimestamp()
        }
      )
      toggleDialog()
      showSuccess('Project added successfully')
    } catch(err) {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not add project')
      throw err
    }
  }

  return { projects, addProject, newDialogOpen, toggleDialog }
}

function ProjectsList() {
  const theme = useTheme()
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
      <CardsList role="list">
        {projects?.length ?
          projects.map((project, ind) => {
            const { id: projectId, ...rest } = project || {}
            return (
              <ProjectCard
                key={project.id}
                projectId={projectId}
                {...rest}
              />
            )
          })
        : (
          <Typography sx={{ padding: theme.spacing(4) }} variant="h5">
            No Projects Found. Click "Add Project" above to add one
          </Typography>
        )}
      </CardsList>
    </Root>
  )
}

export default ProjectsList
