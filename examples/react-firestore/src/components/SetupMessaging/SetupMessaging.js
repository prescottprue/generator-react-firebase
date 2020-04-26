import React from 'react'
import { useMessaging, useUser } from 'reactfire'
import useSetupMessaging from './useSetupMessaging'

function LoadMessaging() {
  const { initializeMessaging } = useSetupMessaging()
  initializeMessaging()
  return null
}

function SetupMessaging() {
  const user = useUser()
  const { isSupported } = useMessaging
  // Render nothing if user is not logged in or if messaging is not supported
  if (!user || !user.uid || !isSupported()) {
    return null
  }

  // Load messaging if user is logged in
  return <LoadMessaging />
}

export default SetupMessaging
