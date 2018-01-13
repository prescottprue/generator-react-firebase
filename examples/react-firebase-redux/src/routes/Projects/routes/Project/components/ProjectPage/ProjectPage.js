import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProjectPage.scss'

const Project = ({ params, project }) => (
  <div className={classes.container}>
    <h2>Project Container</h2>
    <pre>Project Key: {params.projectname}</pre>
    <pre>{JSON.stringify(project, null, 2)}</pre>
  </div>
)

Project.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default Project
