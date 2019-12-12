import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'
import styles from './ProjectData.styles'

const useStyles = makeStyles(styles)

function ProjectData() {
  const { projectId } = useParams()
  const classes = useStyles()

  // Create listener for projects
  useFirebaseConnect([{ path: `projects/${projectId}` }])

  // Get projects from redux state
  const project = useSelector(
    ({
      firebase: {
        data: { projects }
      }
    }) => projects && projects[projectId]
  )

  // Show loading spinner while project is loading
  if (!isLoaded(project)) {
    return <LoadingSpinner />
  }

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
