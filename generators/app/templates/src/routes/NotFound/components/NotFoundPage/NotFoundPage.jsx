import React from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/material/styles'
import styles from './NotFoundPage.styles'

const useStyles = makeStyles(styles)

function NotFoundPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h2">Whoops! 404!</Typography>
      <p>This page was not found.</p>
    </div>
  )
}

export default NotFoundPage
