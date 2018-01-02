import React from 'react'
import PropTypes from 'prop-types'<% if (materialv1) { %>
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'<% } %>
import classes from './ProjectPage.scss'

const Project = ({ params, project }) => (
  <div className={classes.container}>
    <% if (!materialv1) { %><h2>Project Container</h2>
    <pre>Project Key: {params.projectname}</pre>
    <pre>{JSON.stringify(project, null, 2)}</pre><% } %><% if (materialv1) { %><Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} component="h2">
          {project.name || 'Project'}
        </Typography>
        <Typography className={classes.subtitle}>
          {params.projectname}
        </Typography>
        <Typography component="p">
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </Typography>
      </CardContent>
    </Card><% } %>
  </div>
)

Project.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default Project
