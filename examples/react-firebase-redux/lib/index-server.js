'use strict'

import React from 'react' //eslint-disable-line
import createRoutes from '../app/routes'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createLocation from 'history/lib/createLocation'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import configureStore from '../app/store/configureStore'

export default (url, cb) => {
  const memoryHistory = createMemoryHistory(url)
  let routes = createRoutes(memoryHistory)
  let location = createLocation(url)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) console.log('Error matching', error)

    let initialData = {entities: { cars: {}, account: {} }}

    const store = configureStore(initialData, memoryHistory)

    // Grab the initial state from our Redux store
    const finalState = store.getState()

    const rootComponent = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )

    return cb({
      appData: finalState,
      appMarkup: rootComponent
    })
  })
}
