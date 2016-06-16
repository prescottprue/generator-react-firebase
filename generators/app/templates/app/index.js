import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
<% if (answers.includeRedux) { %>import configureStore from './store/configureStore'
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
}<% } %>
<% if (!answers.includeRedux) { %>
class Root extends Component {
  render () {
    return (
      <div>
        <AppRouter />
      </div>
    )
  }
}<% } %>
let rootElement = document.getElementById('root')

ReactDOM.render(
  <Root />, rootElement
)
