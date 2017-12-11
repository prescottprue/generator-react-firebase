import { combineReducers } from 'redux'
import { without, omit } from 'lodash'
import { SOME_ACTION } from './actionTypes'

export default (state = {}, action) => {
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
