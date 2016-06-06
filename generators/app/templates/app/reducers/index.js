import { combineReducers } from 'redux'
import cars from './cars'
import { routeReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  cars,
  router: routeReducer
})

export default rootReducer
