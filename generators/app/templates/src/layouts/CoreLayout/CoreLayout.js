import React from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { SuspenseWithPerf } from 'reactfire'
import NavbarWithoutAuth from 'containers/Navbar/NavbarWithoutAuth'<% } %>
import Navbar from 'containers/Navbar'<% if (includeRedux) { %>
import { Notifications } from 'modules/notification'<% } %>
import { makeStyles } from '@material-ui/core/styles'
import styles from './CoreLayout.styles'

const useStyles = makeStyles(styles)

function CoreLayout({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.container}><% if (!includeRedux) { %>
      <SuspenseWithPerf fallback={<NavbarWithoutAuth />} traceId="load-navbar">
        <Navbar />
      </SuspenseWithPerf><% } %><% if (includeRedux) { %>
      <Navbar /><% } %>
      <div className={classes.children}>{children}</div><% if (includeRedux) { %>
      <Notifications /><% } %>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
