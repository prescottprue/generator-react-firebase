import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import {firebaseStateReducer as firebase} from 'redux-firebasev3'

const rootReducer = combineReducers({
  firebase,
  router: routeReducer
})

export default rootReducer
