import React, { useReducer, useCallback } from 'react'
import PropTypes from 'prop-types'
import reducer from './reducer'
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_DISMISS,
  NOTIFICATION_CLEAR
} from './actionTypes'

const defaultDismissTime = 5000 // 5 seconds

export const NotificationsContext = React.createContext({
  allIds: [],
  byId: {},
  showError: () => {},
  showMessage: () => {},
  showSuccess: () => {},
  dismissNotification: () => {},
  clearNotifications: () => {}
})

export default function NotificationsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer)
  const { allIds, byId } = state || {}

  const showNotification = useCallback(
    (notif) => {
      const payload = Object.assign({}, notif)
      // Set default id to now if none provided
      if (!payload.id) {
        payload.id = Date.now()
      }
      dispatch({ type: NOTIFICATION_SHOW, payload })

      setTimeout(() => {
        dispatch({
          type: NOTIFICATION_DISMISS,
          payload: payload.id
        })
      }, payload.dismissAfter || defaultDismissTime)
    },
    [dispatch]
  )

  const contextValue = {
    allIds,
    byId,
    showSuccess: useCallback(
      (message) => showNotification({ type: 'success', message }),
      [showNotification]
    ),
    showError: useCallback(
      (message) =>
        showNotification({ type: 'error', message: `Error: ${message || ''}` }),
      [showNotification]
    ),
    showMessage: useCallback(
      (message) => showNotification({ type: 'info', message }),
      [showNotification]
    ),
    dismissNotification: useCallback(
      (payload) =>
        dispatch({
          type: NOTIFICATION_DISMISS,
          payload
        }),
      [dispatch]
    ),
    clearNotifications: useCallback(
      () => dispatch({ type: NOTIFICATION_CLEAR }),
      [dispatch]
    )
  }

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  )
}

NotificationsProvider.propTypes = {
  children: PropTypes.element
}
