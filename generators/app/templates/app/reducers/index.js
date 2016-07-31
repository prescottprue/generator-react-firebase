import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import {firebaseStateReducer as firebase} from 'redux-firebasev3'
import {routeReducer as router} from 'react-router-redux'

const rootReducer = combineReducers({
  firebase,
  form,
  router
})

export default rootReducer
