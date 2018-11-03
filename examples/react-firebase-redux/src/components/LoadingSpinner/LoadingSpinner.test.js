import React from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './index'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LoadingSpinner />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders a spinner', () => {
  const tree = renderer.create(<LoadingSpinner />).toJSON()
  expect(tree).toMatchSnapshot()
})
