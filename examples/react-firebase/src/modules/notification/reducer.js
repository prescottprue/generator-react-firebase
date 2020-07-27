import { NOTIFICATION_SHOW, NOTIFICATION_DISMISS } from './actionTypes'

function combineReducers(reducers) {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers)

  return function combination(state = {}, action) {
    // This is the object we are going to return.
    const nextState = {}

    // Loop through all the reducer keys
    /* eslint-disable no-plusplus */
    for (let i = 0; i < reducerKeys.length; i++) {
      /* eslint-enable no-plusplus */
      // Get the current key name
      const key = reducerKeys[i]
      // Get the current reducer
      const reducer = reducers[key]
      // Get the the previous state
      const previousStateForKey = state[key]
      // Get the next state by running the reducer
      const nextStateForKey = reducer(previousStateForKey, action)
      // Update the new state for the current reducer
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}

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
      return [...state.filter((currentId) => currentId === action.payload.id)]
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
      return newState
    default:
      return state
  }
}

const notifications = combineReducers({ byId, allIds })

export default notifications
