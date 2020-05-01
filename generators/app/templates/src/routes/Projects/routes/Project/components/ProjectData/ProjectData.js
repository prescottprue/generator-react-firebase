import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'<% if (includeRedux && !includeFirestore) { %>
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %><% if (includeRedux && includeFirestore) { %>
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } %><% if (!includeRedux && includeFirestore) { %>
import { useFirestoreDoc, useFirestore } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { useDatabaseObject, useDatabase } from 'reactfire'<% } %><% if (includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'

function ProjectData() {
  const { projectId } = useParams()<% if (includeRedux && !includeFirestore) { %>

  // Create listener for projects
  useFirebaseConnect([{ path: `${PROJECTS_COLLECTION}/${projectId}` }])

  // Get projects from redux state
  const project = useSelector(
    ({
      firebase: {
        data: { projects }
      }
    }) => projects && projects[projectId]
  )<% } %><% if (includeRedux && includeFirestore) { %>

  // Create listener for projects
  useFirestoreConnect([{ collection: PROJECTS_COLLECTION, doc: projectId }])

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
  const projectRef = database.ref(`${PROJECTS_COLLECTION}/${projectId}`)

  const projectSnap = useDatabaseObject(projectRef)
  const project = projectSnap.snapshot.val()<% } %><% if (!includeRedux && includeFirestore) { %>
  const firestore = useFirestore()
  const projectRef = firestore.doc(`${PROJECTS_COLLECTION}/${projectId}`)

  const projectSnap = useFirestoreDoc(projectRef)
  const project = projectSnap.data()<% } %>

  return (
    <CardContent>
      <Typography component="h2">
        {(project && project.name) || 'Project'}
      </Typography>
      <Typography>{projectId}</Typography>
      <div style={{ marginTop: '4rem' }}>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    </CardContent>
  )
}

export default ProjectData
