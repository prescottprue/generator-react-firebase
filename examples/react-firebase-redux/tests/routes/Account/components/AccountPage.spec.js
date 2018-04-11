import React from 'react'
import AccountPage from 'routes/Account/components/AccountPage'
import { shallow } from 'enzyme'

describe.skip('(Route: Account Component) AccountPage', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<AccountPage profile={{}} updateAccount={() => {}} />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
