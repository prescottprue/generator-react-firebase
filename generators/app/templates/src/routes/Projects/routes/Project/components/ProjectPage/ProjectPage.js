import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'<% if (includeRedux) { %>
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'<% } else { %>
import {
  useFirestoreDoc,
  useFirebaseApp,
  SuspenseWithPerf
} from 'reactfire'<% } %><% if (includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage() {
  const { projectId } = useParams()
  const classes = useStyles()<% if (includeRedux) { %>

  // Create listener for projects
  useFirebaseConnect(() => [{ path: `projects/${projectId}` }])

  // Get projects from redux state
  const project = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectId]
  })

  // Show loading spinner while project is loading
  if (!isLoaded(project)) {
    return <LoadingSpinner />
  }<% } %><% if (!includeRedux) { %>
  const firebaseApp = useFirebaseApp()
  const projectRef = firebaseApp
    .firestore()
    .collection('projects')
    .doc(projectId)

  const projectDoc = useFirestoreDoc(projectRef)
  const project = projectDoc.data()<% } %>

  return (
    <div className={classes.root}><% if (!includeRedux) { %>
      <SuspenseWithPerf
        fallback={'loading project'}
        traceId={'load-project'}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} component="h2">
              {project.name || 'Project'}
            </Typography>
            <Typography className={classes.subtitle}>{projectId}</Typography>
            <div style={{ marginTop: '10rem' }}>
              <pre>{JSON.stringify(project, null, 2)}</pre>
            </div>
          </CardContent>
        </Card>
      </SuspenseWithPerf><% } %><% if (includeRedux) { %>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2">
            {project.name || 'Project'}
          </Typography>
          <Typography className={classes.subtitle}>{projectId}</Typography>
          <div style={{ marginTop: '10rem' }}>
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </div>
        </CardContent>
      </Card><% } %>
    </div>
  )
}

export default ProjectPage
