import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import { useFirestoreDoc, useFirestore } from 'reactfire'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'

function ProjectData() {
  const { projectId } = useParams()
  const firestore = useFirestore()
  const projectRef = firestore.doc(`${PROJECTS_COLLECTION}/${projectId}`)

  const projectSnap = useFirestoreDoc(projectRef)
  const project = projectSnap.data()

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
