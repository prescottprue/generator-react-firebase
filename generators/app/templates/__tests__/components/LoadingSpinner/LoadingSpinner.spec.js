import React from 'react'
import LoadingSpinner from 'components/LoadingSpinner'
import renderer from 'react-test-renderer'

test('LoadingSpinner renders an svg', () => {
  const component = renderer.create(<LoadingSpinner />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
