import React from 'react'<% if (!includeRedux) { %>
import { useMessaging, useUser } from 'reactfire'<% } %><% if (includeRedux) { %>
import firebase from 'firebase/app'
import 'firebase/messaging'<% } %>
import useSetupMessaging from './useSetupMessaging'

function LoadMessaging() {
  const { initializeMessaging } = useSetupMessaging()
  initializeMessaging()
  return null
}

function SetupMessaging() {<% if (!includeRedux) { %>
  const user = useUser()
  const { isSupported } = useMessaging<% } %><% if (includeRedux) { %>
  const user = firebase.auth().currentUser
  const { isSupported } = firebase.messaging<% } %>
  // Render nothing if user is not logged in or if messaging is not supported
  if (!user || !user.uid || !isSupported()) {
    return null
  }

  // Load messaging if user is logged in
  return <LoadMessaging />
}

export default SetupMessaging
