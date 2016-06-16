import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'


class Root extends Component {
  render () {
    return (
      <div>
        <AppRouter />
      </div>
    )
  }
}
let rootElement = document.getElementById('root')

ReactDOM.render(
  <Root />, rootElement
)
