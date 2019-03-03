import { combineReducers } from 'redux'
import firebase from 'react-redux-firebase/lib/reducers'<% if (includeRedux && includeFirestore) { %>
import firestore from 'redux-firestore/lib/reducers'<% } %>
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'modules/notification'
import locationReducer from './location'

export function makeRootReducer(asyncReducers) {
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

export function injectReducer(store, { key, reducer }) {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
