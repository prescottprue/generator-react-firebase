import { NOTIFICATION_SHOW, NOTIFICATION_DISMISS } from './actionTypes'

/**
 * Reducer for managing list of ids associated with
 * visible notifications.
 * @param {Array} state - Current allIds state
 * @param {Object} action - Dispatched action
 * @returns {Array} allIds state
 */
function allIds(state = [], action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return [...state, action.payload.id]
    case NOTIFICATION_DISMISS:
      // Only update if notification being dismissed exists in state
      return state.includes(action.payload.id)
        ? state
        : [...state.filter((currentId) => currentId === action.payload.id)]
    default:
      return state
  }
}

/**
 * Reducer for storying notifications by id.
 * @param {Object} state - Current byId state
 * @param {Object} action - Dispatched action
 * @returns {Object} byId state
 */
function byId(state = {}, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case NOTIFICATION_DISMISS:
      // eslint-disable-next-line no-case-declarations
      const { [action.payload.id]: notificationToDismiss, ...newState } = state
      // Only update if notification being dismissed exists in state
      return notificationToDismiss ? newState : state
    default:
      return state
  }
}

/**
 * Reducer for notifications. Built using multiple slice reducers
 * combined into a single reducer (similar to react-redux's combineReducers).
 * @param {Object} state - Current byId state
 * @param {Object} action - Dispatched action
 * @returns {Object} notifications state with allIds and byId parameters
 */
export default function notifications(state = {}, action) {
  return {
    allIds: allIds(state?.allIds, action),
    byId: byId(state?.byId, action)
  }
}
