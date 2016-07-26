import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const initialState = { }

const store = configureStore(initialState)

class Root extends Component {
  render () {
    return (
      <div>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    )
  }
}

let rootElement = document.getElementById('root')

ReactDOM.render(
  <Root />, rootElement
)
