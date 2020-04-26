import { combineReducers } from 'redux'
import firebase from 'react-redux-firebase/lib/reducer'<% if (includeRedux && includeFirestore) { %>
import firestore from 'redux-firestore/lib/reducer'<% } %>
import locationReducer from './location'

export function makeRootReducer(asyncReducers) {
  return combineReducers({
    // Add sync reducers here
    firebase,<% if (includeRedux && includeFirestore) { %>
    firestore,<% } %>
    location: locationReducer,
    ...asyncReducers
  })
}

export function injectReducer(store, { key, reducer }) {
  store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
