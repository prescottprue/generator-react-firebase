import React from 'react'
import Card from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'<% if (!includeRedux) { %>
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import ProjectData from '../ProjectData'

export const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(2)
}));

function ProjectPage() {
  const theme = useTheme()
  return (
    <Root>
      <Card sx={{ marginBottom: theme.spacing(2) }}><% if (includeRedux) { %>
        <ProjectData /><% } %><% if (!includeRedux) { %>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <ProjectData />
        </SuspenseWithPerf><% } %>
      </Card>
    </Root>
  )
}

export default ProjectPage
