import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useFirestoreDoc, useFirebaseApp, SuspenseWithPerf } from 'reactfire'
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage() {
  const { projectId } = useParams()
  const classes = useStyles()
  const firebaseApp = useFirebaseApp()
  const projectRef = firebaseApp
    .firestore()
    .collection('projects')
    .doc(projectId)

  const projectSnap = useFirestoreDoc(projectRef)
  const project = projectSnap.data()

  return (
    <div className={classes.root}>
      <SuspenseWithPerf fallback="loading project" traceId="load-project">
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
      </SuspenseWithPerf>
    </div>
  )
}

export default ProjectPage
