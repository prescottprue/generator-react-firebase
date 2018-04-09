import React from 'react'
import LoadingSpinner from 'components/LoadingSpinner'
import renderer from 'react-test-renderer'

test('Matches snapshot', () => {
  const component = renderer.create(<LoadingSpinner />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
