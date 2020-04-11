import React from 'react'
import PropTypes from 'prop-types'
import { SuspenseWithPerf } from 'reactfire'
import NavbarWithoutAuth from 'containers/Navbar/NavbarWithoutAuth'
import Navbar from 'containers/Navbar'
import { Notifications } from 'modules/notification'

function CoreLayout({ children }) {
  return (
    <div>
      <SuspenseWithPerf fallback={<NavbarWithoutAuth />} traceId="load-navbar">
        <Navbar />
      </SuspenseWithPerf>
      {children}
      <Notifications />
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
