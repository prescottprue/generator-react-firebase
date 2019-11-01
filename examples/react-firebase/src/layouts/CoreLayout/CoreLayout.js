import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import NavbarWithoutAuth from 'containers/Navbar/NavbarWithoutAuth'
import Navbar from 'containers/Navbar'
import { makeStyles } from '@material-ui/core/styles'
import styles from './CoreLayout.styles'

const useStyles = makeStyles(styles)

function CoreLayout({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Suspense fallback={<NavbarWithoutAuth />}>
        <Navbar />
      </Suspense>
      <div className={classes.children}>{children}</div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
