import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'<% if (includeRedux && !includeFirestore) { %>
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %><% if (includeRedux && includeFirestore) { %>
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %><% if (!includeRedux && includeFirestore) { %>
import { useFirestoreDoc, useFirebaseApp } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useDatabaseObject, useFirebaseApp } from 'reactfire'<% } %><% if (includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage() {
  const { projectId } = useParams()
  const classes = useStyles()<% if (includeRedux && !includeFirestore) { %>

  // Create listener for projects
  useFirebaseConnect([{ path: `projects/${projectId}` }])

  // Get projects from redux state
  const project = useSelector(
    ({
      firebase: {
        data: { projects }
      }
    }) => projects && projects[projectId]
  )<% } %><% if (includeRedux && includeFirestore) { %>

  // Create listener for projects
  useFirestoreConnect([{ collection: 'projects', doc: projectId }])

  // Get projects from redux state
  const project = useSelector(
    ({
      firestore: {
        data: { projects }
      }
    }) => projects && projects[projectId]
  )<% } %><% if (includeRedux) { %>

  // Show loading spinner while project is loading
  if (!isLoaded(project)) {
    return <LoadingSpinner />
  }<% } %><% if (!includeRedux && !includeFirestore) { %>
  const firebaseApp = useFirebaseApp()
  const projectRef = firebaseApp.database().ref(`projects/${projectId}`)

  const projectSnap = useDatabaseObject(projectRef)
  const project = projectSnap.snapshot.val()<% } %><% if (!includeRedux && includeFirestore) { %>
  const firebaseApp = useFirebaseApp()
  const projectRef = firebaseApp
    .firestore()
    .collection('projects')
    .doc(projectId)

  const projectSnap = useFirestoreDoc(projectRef)
  const project = projectSnap.data()<% } %>

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2">
            {(project && project.name) || 'Project'}
          </Typography>
          <Typography className={classes.subtitle}>{projectId}</Typography>
          <div style={{ marginTop: '10rem' }}>
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectPage
