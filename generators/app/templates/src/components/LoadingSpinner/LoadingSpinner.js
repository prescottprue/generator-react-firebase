import React from 'react'
import PropTypes from 'prop-types'
<% if (!materialv1) { %>import CircularProgress from 'material-ui/CircularProgress'<% } %><% if (materialv1) { %>import CircularProgress from '@material-ui/core/CircularProgress'<% } %>
import classes from './LoadingSpinner.scss'

export const LoadingSpinner = ({ size }) => (
  <div className={classes.container}>
    <div className={classes.progress}>
      <CircularProgress mode="indeterminate" size={size || 80} />
    </div>
  </div>
)

LoadingSpinner.propTypes = {
  size: PropTypes.number
}

export default LoadingSpinner
