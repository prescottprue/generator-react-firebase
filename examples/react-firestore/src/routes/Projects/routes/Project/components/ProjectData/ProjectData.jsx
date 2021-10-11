import React from 'react'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { useFirestoreDocData, useFirestore } from 'reactfire'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'

function ProjectData() {
  const { projectId } = useParams()
  const firestore = useFirestore()
  const projectRef = doc(firestore, PROJECTS_COLLECTION, projectId)

  const { data: project } = useFirestoreDocData(projectRef)

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
