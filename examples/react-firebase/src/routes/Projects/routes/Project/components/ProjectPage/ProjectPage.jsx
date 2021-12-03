import React from 'react'
import Card from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectData from '../ProjectData'

export const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(2)
}));

function ProjectPage() {
  const theme = useTheme()
  return (
    <Root>
      <Card sx={{ marginBottom: theme.spacing(2) }}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <ProjectData />
        </SuspenseWithPerf>
      </Card>
    </Root>
  )
}

export default ProjectPage
