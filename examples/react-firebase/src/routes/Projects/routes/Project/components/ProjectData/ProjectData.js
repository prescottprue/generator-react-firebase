import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useDatabaseObject, useDatabase } from 'reactfire'
import styles from './ProjectData.styles'

const useStyles = makeStyles(styles)

function ProjectData() {
  const { projectId } = useParams()
  const classes = useStyles()
  const database = useDatabase()
  const projectRef = database.ref(`projects/${projectId}`)

  const projectSnap = useDatabaseObject(projectRef)
  const project = projectSnap.snapshot.val()

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
