import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'<% if (includeRedux && !includeFirestore) { %>
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'<% } %><% if (includeRedux && includeFirestore) { %>
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %>
import ProjectRoute from 'routes/Projects/routes/Project'
import { useNotifications } from 'modules/notification'
import { renderChildren } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsPage.styles'

const useStyles = makeStyles(styles)

function useProjects() {
  const { showSuccess, showError } = useNotifications()
  <% if (includeRedux && !includeFirestore) { %>const firebase = useFirebase()<% } %><% if (includeRedux && includeFirestore) { %>const firestore = useFirestore()<% } %>
  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)
  // Create listeners based on current users UID
  <% if (includeRedux && !includeFirestore) { %>useFirebaseConnect([
    {
      path: 'projects',
      queryParams: ['limitToLast=10'],
      queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`]
    }
  ])<% } %><% if (includeRedux && includeFirestore) { %>useFirestoreConnect([
    {
      collection: 'projects',
      where: ['createdBy', '==', auth.uid]
    }
  ])<% } %>

  // Get projects from redux state
  const projects = useSelector(state => state.<% if (includeRedux && !includeFirestore) { %>firebase<% } %><% if (includeRedux && includeFirestore) {%>firestore<% } %>.ordered.projects)
  
  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    if (!auth.uid) {
      return showError('You must be logged in to create a project')
    }
    return <% if (includeRedux && !includeFirestore) { %>firebase
      .push('projects', {
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })<% } %><% if (includeRedux && includeFirestore) { %>firestore
      .add('projects', {
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })<% } %>
      .then(() => {
        toggleDialog()
        showSuccess('Project added successfully')
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add project')
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
  } = useProjects()


  // Show spinner while projects are loading
  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }

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
              {!isEmpty(projects) &&
                projects.map((project, ind) => {
                  return (
                    <ProjectTile
                      key={`Project-${project.key}-${ind}`}
                      name={project.value.name}
                      projectId={project.key}
                    />
                  )
                })}
            </div>
          </div>
        )}
      />
    </Switch>
  )
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
}

export default ProjectsPage
