import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as devshare } from 'redux-devshare'
import { reducer as form } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    devshare,
    form,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
