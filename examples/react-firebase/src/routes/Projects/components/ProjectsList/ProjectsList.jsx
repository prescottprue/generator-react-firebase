import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ref, query, orderByChild, equalTo, push } from 'firebase/database'
import { useDatabase, useUser, useDatabaseList } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectCard from '../ProjectCard'
import NewProjectDialog from '../NewProjectDialog'
import { Root, CardsList } from './ProjectsList.styled'

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const { data: auth } = useUser()
  // Create a ref for projects owned by the current user
  const database = useDatabase()
  const { ServerValue } = useDatabase
  const projectsRef = ref(database, PROJECTS_COLLECTION)
  const projectsQuery = query(projectsRef, orderByChild('createdBy'), equalTo(auth?.uid))

  // Query for projects (loading handled by Suspense in ProjectsList)
  const { data: projects } = useDatabaseList(projectsQuery)

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  async function addProject(newInstance) {
    try {
      await push(
        ref(database, PROJECTS_COLLECTION),
        {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: ServerValue.TIMESTAMP
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
          projects.map(({ snapshot }, ind) => {
            const { key: projectId } = snapshot.val() || {}
            return (
              <ProjectCard
                key={projectId}
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
