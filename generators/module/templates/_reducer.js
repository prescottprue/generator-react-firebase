import { combineReducers } from 'redux'
import { SOME_ACTION } from './actionTypes'

export default <%= camelName %>(state = {}, action = {}) {
  switch (action.type) {
    case SOME_ACTION:
      return {
        ...state,
        some: action.payload
      }
    default:
      return state
  }
}
