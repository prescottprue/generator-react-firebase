import React from 'react'
import PropTypes from 'prop-types'
import ContentAddCircle from '@mui/icons-material/AddCircle'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles';
import styles from './NewProjectTile.styles'

const useStyles = makeStyles(styles)

function NewProjectTile({ onClick }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} onClick={onClick}>
      <ContentAddCircle className={classes.newIcon} />
    </Paper>
  )
}

NewProjectTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProjectTile
