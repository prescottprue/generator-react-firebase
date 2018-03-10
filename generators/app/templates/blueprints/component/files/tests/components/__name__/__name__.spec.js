import React from 'react'
import <%= pascalEntityName %> from 'components/<%= pascalEntityName %>'
import { shallow } from 'enzyme'

describe('(Component) <%= pascalEntityName %>', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <<%= pascalEntityName %>
        <%= camelEntityName %>={{}}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})
