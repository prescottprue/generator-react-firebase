import React from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectData from '../ProjectData'
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <ProjectData />
        </SuspenseWithPerf>
      </Card>
    </div>
  )
}

export default ProjectPage
