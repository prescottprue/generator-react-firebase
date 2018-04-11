import React from 'react'
import Home from 'routes/Home/components/HomePage'
import { shallow } from 'enzyme'

describe('(Route: Home Component) HomePage', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<Home />)
  })

  it('Renders', () => {
    const wrapper = _component.find('div')
    expect(wrapper).to.exist
  })

  it('Renders description', () => {
    const welcome = _component.find('h2')
    expect(welcome).to.exist
  })
})
