import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { browserHistory } from 'react-router'
import createRoutes from './routes'

class Root extends Component {
  render () {
    return (
      <div>
        {createRoutes(browserHistory)}
      </div>
    )
  }
}
let rootElement = document.getElementById('root')

ReactDOM.render(
  <Root />, rootElement
)
