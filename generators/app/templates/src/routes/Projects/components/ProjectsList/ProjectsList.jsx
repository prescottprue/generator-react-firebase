import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'<% if (!includeRedux && includeFirestore) { %>
import { getFirestore, collection, addDoc, query, where, orderBy, serverTimestamp, documentId } from 'firebase/firestore'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { ref, query, orderByChild, equalTo, push } from 'firebase/database'
import { useDatabase, useUser, useDatabaseList } from 'reactfire'<% } %><% if (includeRedux && !includeFirestore) { %>
import { useSelector } from 'react-redux'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %>
import { useNotifications } from 'modules/notification'<% if (includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectCard from '../ProjectCard'
import NewProjectDialog from '../NewProjectDialog'
import { Root, CardsList } from './ProjectsList.styled'

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  <% if (!includeRedux) { %>// Get current user (loading handled by Suspense in ProjectsList)
  const { data: auth } = useUser()<% } %><% if (!includeRedux && includeFirestore) { %>
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
  })<% } %><% if (!includeRedux && !includeFirestore) { %>
  // Create a ref for projects owned by the current user
  const database = useDatabase()
  const { ServerValue } = useDatabase
  const projectsRef = ref(database, PROJECTS_COLLECTION)
  const projectsQuery = query(projectsRef, orderByChild('createdBy'), equalTo(auth?.uid))

  // Query for projects (loading handled by Suspense in ProjectsList)
  const { data: projects } = useDatabaseList(projectsQuery)<% } %><% if (includeRedux && !includeFirestore) { %>const firebase = useFirebase()

  // Get auth from redux state
  const auth = useSelector(({ firebase: { auth } }) => auth)
  // Create listeners based on current users UID
  useFirebaseConnect([
    {
      path: PROJECTS_COLLECTION,
      queryParams: [
        'orderByChild=createdBy',
        `equalTo=${auth.uid}`,
        'limitToLast=10'
      ]
    }
  ])

  // Get projects from redux state
  const projects = useSelector(({ firebase: { ordered } }) => ordered.projects)<% } %><% if (includeRedux && includeFirestore) { %>const firestore = useFirestore()

  // Get auth from redux state
  const auth = useSelector(({ firebase: { auth } }) => auth)

  useFirestoreConnect([
    {
      collection: PROJECTS_COLLECTION,
      where: ['createdBy', '==', auth.uid]
    }
  ])

  // Get projects from redux state
  const projects = useSelector(({ firestore: { ordered } }) => ordered.projects)<% } %>

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  async function addProject(newInstance) {<% if (includeRedux) { %>
    if (!auth.uid) {
      return showError('You must be logged in to create a project')
    }<% } %>
    try {
      await <% if (includeRedux && !includeFirestore) { %>firebase
        .push(PROJECTS_COLLECTION, {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP
      })<% } %><% if (includeRedux && includeFirestore) { %>firestore
        .add(PROJECTS_COLLECTION, {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: firestore.serverTimestamp()
      })<% } %><% if (!includeRedux && includeFirestore) { %>addDoc(
        collection(firestore, PROJECTS_COLLECTION),
        {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: serverTimestamp()
        }
      )<% } %><% if (!includeRedux && !includeFirestore) { %>push(
        ref(database, PROJECTS_COLLECTION),
        {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: ServerValue.TIMESTAMP
        }
      )<% } %>
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
  } = useProjectsList()<% if (includeRedux) { %>

  // Show spinner while projects are loading
  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }<% } %>

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
        {<% if (!includeRedux && includeFirestore) { %>projects?.length ?
          projects.map((project, ind) => {
            const { id: projectId, ...rest } = project || {}
            return (
              <ProjectCard
                key={project.id}
                projectId={projectId}
                {...rest}
              />
            )
          })<% } %><% if (!includeRedux && !includeFirestore) { %>projects?.length ?
          projects.map(({ snapshot }, ind) => {
            const { key: projectId } = snapshot.val() || {}
            return (
              <ProjectCard
                key={projectId}
                projectId={projectId}
                {...rest}
              />
            )
          })<% } %><% if (includeRedux && !includeFirestore) { %>!isEmpty(projects) ?
          projects.map((project, ind) => {
            const { key: projectId, ...rest } = project || {}
            return (
              <ProjectCard
                key={projectId}
                projectId={project.key}
                {...rest}
              />
            )
          })<% } %><% if (includeRedux && includeFirestore) { %>!isEmpty(projects) ?
          projects.map((project, ind) => {
            const { id: projectId, ...rest } = project || {}
            return (
              <ProjectCard
                key={projectId}
                projectId={projectId}
                {...rest}
              />
            )
          })<% } %>
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
