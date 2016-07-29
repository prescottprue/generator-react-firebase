import React from 'react'
import ReactDOM from 'react-dom'
import createRoutes from './router'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { createHistory } from 'history'
import configureStore from './store/configureStore'

const initialState = { }

const store = configureStore(initialState, createHistory)

let rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(browserHistory)}
  </Provider>, rootElement
)
