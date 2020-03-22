import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'<% if (includeRedux && !includeFirestore) { %>
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %><% if (includeRedux && includeFirestore) { %>
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %><% if (!includeRedux && includeFirestore) { %>
import { useFirestoreDoc, useFirestore } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useDatabaseObject, useDatabase } from 'reactfire'<% } %><% if (includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import styles from './ProjectData.styles'

const useStyles = makeStyles(styles)

function ProjectData() {
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
  const database = useDatabase()
  const projectRef = database.ref(`projects/${projectId}`)

  const projectSnap = useDatabaseObject(projectRef)
  const project = projectSnap.snapshot.val()<% } %><% if (!includeRedux && includeFirestore) { %>
  const firestore = useFirestore()
  const projectRef = firestore.doc(`projects/${projectId}`)

  const projectSnap = useFirestoreDoc(projectRef)
  const project = projectSnap.data()<% } %>

  return (
    <CardContent>
      <Typography className={classes.title} component="h2">
        {(project && project.name) || 'Project'}
      </Typography>
      <Typography className={classes.subtitle}>{projectId}</Typography>
      <div style={{ marginTop: '4rem' }}>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    </CardContent>
  )
}

export default ProjectData
