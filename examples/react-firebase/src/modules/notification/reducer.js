import { without, omit } from 'lodash'
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
      return without(state, action.payload)
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
      return omit(state, action.payload)
    default:
      return state
  }
}

export const notifications = combineReducers({ byId, allIds })

export default notifications
