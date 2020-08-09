import React from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { SuspenseWithPerf } from 'reactfire'
import NavbarWithoutAuth from 'components/Navbar/NavbarWithoutAuth'<% } %>
import Navbar from 'components/Navbar'

function CoreLayout({ children }) {
  return (
    <div><% if (!includeRedux) { %>
      <SuspenseWithPerf fallback={<NavbarWithoutAuth />} traceId="load-navbar">
        <Navbar />
      </SuspenseWithPerf><% } %><% if (includeRedux) { %>
      <Navbar /><% } %>
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
