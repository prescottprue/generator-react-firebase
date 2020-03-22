import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'<% if (!includeRedux && includeFirestore) { %>
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
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
import { useSelector } from 'react-redux'<% } %><% if (includeRedux) { %>
import { useNotifications } from 'modules/notification'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsList.styles'

const useStyles = makeStyles(styles)

function useProjectsList() {<% if (includeRedux) { %>
  const { showSuccess, showError } = useNotifications()
  <% } %><% if (!includeRedux) { %>
  // Get current user (loading handled by Suspense in ProjectsList)
  const auth = useUser()

  <% } %><% if (!includeRedux && includeFirestore) { %>// Create a ref for projects owned by the current user
  const firestore = useFirestore()
  const { FieldValue } = useFirestore

  const projectsRef = firestore
    .collection('projects')
    .where('createdBy', '==', auth && auth.uid)

  // Query for projects (loading handled by Suspense in ProjectsList)
  const projects = useFirestoreCollectionData(projectsRef, { idField: 'id' })<% } %><% if (!includeRedux && !includeFirestore) { %>// Create a ref for projects owned by the current user
  const database = useDatabase()
  const projectsRef = database
    .ref('projects')
    .orderByChild('createdBy')
    .equalTo(auth && auth.uid)

  // Query for projects (loading handled by Suspense in ProjectsList)
  const projects = useDatabaseList(projectsRef)<% } %><% if (includeRedux && !includeFirestore) { %>const firebase = useFirebase()

  // Get auth from redux state
  const auth = useSelector(({ firebase: { auth } }) => auth)
  // Create listeners based on current users UID
  useFirebaseConnect([
    {
      path: 'projects',
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
      collection: 'projects',
      where: ['createdBy', '==', auth.uid]
    }
  ])

  // Get projects from redux state
  const projects = useSelector(({ firestore: { ordered } }) => ordered.projects)<% } %>

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {<% if (includeRedux) { %>
    if (!auth.uid) {
      return showError('You must be logged in to create a project')
    }<% } %>
    return <% if (includeRedux && !includeFirestore) { %>firebase
      .push('projects', {
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })<% } %><% if (includeRedux && includeFirestore) { %>firestore
      .add('projects', {
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firestore.FieldValue.serverTimestamp()
      })<% } %><% if (!includeRedux && includeFirestore) { %>firestore
      .collection('projects')
      .add({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: FieldValue.serverTimestamp()
      })<% } %><% if (!includeRedux && !includeFirestore) { %>database
      .ref('projects')
      .push({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: Date.now()
        // Not currently supported in reactfire (see https://github.com/FirebaseExtended/reactfire/issues/227)
        // createdAt: database.ServerValue.TIMESTAMP
      })<% } %>
      .then(() => {
        toggleDialog()<% if (includeRedux) { %>
        showSuccess('Project added successfully')<% } %>
      })
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console<% if (includeRedux) { %>
        showError(err.message || 'Could not add project')<% } %>
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
  } = useProjectsList()<% if (includeRedux) { %>

  // Show spinner while projects are loading
  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }<% } %>

  return (
    <div className={classes.root}>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <div className={classes.tiles}>
        <NewProjectTile onClick={toggleDialog} />
        {<% if (!includeRedux && includeFirestore) { %>projects &&
          projects.map((project, ind) => {
            return (
              <ProjectTile
                key={`Project-${project.id}-${ind}`}
                name={project && project.name}
                projectId={project.id}
              />
            )
          })<% } %><% if (!includeRedux && !includeFirestore) { %>projects &&
          projects.map(({ snapshot }, ind) => {
            const project = snapshot.val()
            return (
              <ProjectTile
                key={`Project-${snapshot.key}-${ind}`}
                name={project && project.name}
                projectId={snapshot.key}
              />
            )
          })<% } %><% if (includeRedux && !includeFirestore) { %>!isEmpty(projects) &&
          projects.map((project, ind) => {
            return (
              <ProjectTile
                key={`Project-${project.key}-${ind}`}
                name={project && project.value.name}
                projectId={project.key}
              />
            )
          })<% } %><% if (includeRedux && includeFirestore) { %>!isEmpty(projects) &&
          projects.map((project, ind) => {
            return (
              <ProjectTile
                key={`Project-${project.id}-${ind}`}
                name={project && project.name}
                projectId={project.id}
              />
            )
          })<% } %>}
      </div>
    </div>
  )
}

export default ProjectsList
