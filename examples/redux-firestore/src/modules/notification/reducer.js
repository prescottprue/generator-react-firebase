import { combineReducers } from 'redux'
import { NOTIFICATION_SHOW, NOTIFICATION_DISMISS } from './actionTypes'

function notification(state = {}, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return action.payload
    case NOTIFICATION_DISMISS:
      return undefined
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return [...state, action.payload.id]
    case NOTIFICATION_DISMISS:
      return [...state.filter((currentId) => currentId === action.payload.id)]
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return {
        ...state,
        [action.payload.id]: notification(state[action.payload.id], action)
      }
    case NOTIFICATION_DISMISS:
      // eslint-disable-next-line no-case-declarations
      const {
        [action.payload.id]: notificationToDismiss,
        ...newState
      } = state
      return newState
    default:
      return state
  }
}

export const notifications = combineReducers({ byId, allIds })

export default notifications
