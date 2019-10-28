import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useFirebaseApp, useFirestoreCollection, useUser } from 'reactfire'
import ProjectRoute from 'routes/Projects/routes/Project'
import { renderChildren } from 'utils/router'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsPage.styles'

const useStyles = makeStyles(styles)

function useProjects() {
  const firebase = useFirebaseApp()
  const auth = useUser()
  const projectsRef = firebase
    .firestore()
    .collection('projects')
    .where('createdBy', '==', auth.uid)

  const projects = useFirestoreCollection(projectsRef)

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    return firebase
      .database()
      .ref('projects')
      .push({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        toggleDialog()
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
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
              {projects &&
                projects.map((projectSnap, ind) => {
                  const project = projectSnap.val()
                  return (
                    <ProjectTile
                      key={`Project-${projectSnap.key}-${ind}`}
                      name={project && project.name}
                      projectId={projectSnap.key}
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
  match: PropTypes.object.isRequired // from enhancer (withRouter)
}

export default ProjectsPage
