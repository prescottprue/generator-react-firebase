import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

function shallowRender(component) {
  const renderer = new ShallowRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}

describe('(Layout) Core', function() {
  let _component
  let _props
  let _child

  beforeEach(function() {
    _child = <h1 className="child">Child</h1>
    _props = {
      children: _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <div>.', function() {
    expect(_component.type).to.equal('div')
  })
})
