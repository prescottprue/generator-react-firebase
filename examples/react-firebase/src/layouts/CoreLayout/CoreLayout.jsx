import React from 'react'
import PropTypes from 'prop-types'
import { SuspenseWithPerf } from 'reactfire'
import NavbarWithoutAuth from 'components/Navbar/NavbarWithoutAuth'
import Navbar from 'components/Navbar'

function CoreLayout({ children }) {
  return (
    <div>
      <SuspenseWithPerf fallback={<NavbarWithoutAuth />} traceId="load-navbar">
        <Navbar />
      </SuspenseWithPerf>
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
