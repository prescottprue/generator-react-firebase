import React, { Component, PropTypes } from 'react'

import LoadingSpinner from 'components/LoadingSpinner'
import classes from './ProjectContainer.scss'


export default class Project extends Component {
  

  render () {
    const { project, params } = this.props

    

    return (
      <div className={classes.container}>
        <h2>Project Container</h2>
        <pre>Project Key: {params.projectname}</pre>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    )
  }
}
