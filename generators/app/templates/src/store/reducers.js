import { combineReducers } from 'redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'<% if (includeRedux && includeFirestore) { %>
import { reducer as firestore } from 'redux-firestore'<% } %>
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'modules/notification'
import locationReducer from './location'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    // Add sync reducers here
    firebase,<% if (includeRedux && includeFirestore) { %>
    firestore,<% } %>
    form,
    notifications,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
