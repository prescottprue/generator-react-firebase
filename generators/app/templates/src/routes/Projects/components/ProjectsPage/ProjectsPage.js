import React, { useState } from 'react'
import PropTypes from 'prop-types'<% if (includeRedux) { %>
import { isEmpty, isLoaded } from 'react-redux-firebase'<% } %>
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'<% if (!includeRedux) { %>
import { useFirebaseApp, useFirestoreCollection, useUser } from 'reactfire'<% } %><% if (includeRedux && !includeFirestore) { %>
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %>
import ProjectRoute from 'routes/Projects/routes/Project'
import { renderChildren } from 'utils/router'<% if (includeRedux) { %>
import { useNotifications } from 'modules/notification'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsPage.styles'

const useStyles = makeStyles(styles)

function useProjects() {<% if (includeRedux) { %>
  const { showSuccess, showError } = useNotifications()<% } %>
  <% if (!includeRedux) { %>const firebase = useFirebaseApp()
  const auth = useUser()
  const projectsRef = firebase
    .firestore()
    .collection('projects')
    .where('createdBy', '==', auth.uid)

  const projects = useFirestoreCollection(projectsRef)<% } %><% if (includeRedux && !includeFirestore) { %>const firebase = useFirebase()

  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)
  // Create listeners based on current users UID
  useFirebaseConnect([
    {
      path: 'projects',
      queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`, 'limitToLast=10']
    }
  ])

  // Get projects from redux state
  const projects = useSelector(state => state.firebase.ordered.projects)<% } %><% if (includeRedux && includeFirestore) { %>const firestore = useFirestore()

  useFirestoreConnect([
    {
      collection: 'projects',
      where: ['createdBy', '==', auth.uid]
    }
  ])

  // Get projects from redux state
  const projects = useSelector(state => state.firestore.ordered.projects)<% } %>

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
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })<% } %><% if (!includeRedux && includeFirestore) { %>firebase
      .firestore()
      .collection('projects')
      .add({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })<% } %><% if (!includeRedux && !includeFirestore) { %>firebase
      .database()
      .ref('projects')
      .push({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })<% } %>
      .then(() => {
        toggleDialog()<% if (includeRedux) { %>
        showSuccess('Project added successfully')<% } %>
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console<% if (includeRedux) { %>
        showError(err.message || 'Could not add project')<% } %>
        return Promise.reject(err)
      })
  }

  return { auth, projects, addProject, newDialogOpen, toggleDialog }
}

function ProjectsPage({ match }) {
  const classes = useStyles()
  const {
    auth,
    projects,
    addProject,
    newDialogOpen,
    toggleDialog
  } = useProjects()<% if (includeRedux) { %>

  // Show spinner while projects are loading
  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }<% } %>

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute], match, { auth })}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <div className={classes.root}>
            <NewProjectDialog
              onSubmit={addProject}
              open={newDialogOpen}
              onRequestClose={toggleDialog}
            />
            <div className={classes.tiles}>
              <NewProjectTile onClick={toggleDialog} />
              {<% if (!includeRedux && includeFirestore) { %>!isEmpty(projects) && projects.docs((projectSnap, ind) => {
                  const project = projectSnap.data()
                  return (
                    <ProjectTile
                      key={`Project-${projectSnap.id}-${ind}`}
                      name={project && project.name}
                      projectId={projectSnap.id}
                    />
                  )
                })<% } %><% if (!includeRedux && !includeFirestore) { %>projects &&
                projects.map((projectSnap, ind) => {
                  const project = projectSnap.val()
                  return (
                    <ProjectTile
                      key={`Project-${projectSnap.key}-${ind}`}
                      name={project && project.name}
                      projectId={projectSnap.key}
                    />
                  )
                })<% } %><% if (includeRedux && !includeFirestore) { %>!isEmpty(projects) && projects.map((project, ind) => {
                  return (
                    <ProjectTile
                      key={`Project-${project.key}-${ind}`}
                      name={project && project.value.name}
                      projectId={project.key}
                    />
                  )
                })<% } %>}
            </div>
          </div>
        )}
      />
    </Switch>
  )
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired // from enhancer (withRouter)
}

export default ProjectsPage
