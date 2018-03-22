import React from 'react'
import <%= pascalEntityName %>Form from 'components/<%= pascalEntityName %>Form'
import { shallow } from 'enzyme'

describe('(Component) <%= pascalEntityName %>Form', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <<%= pascalEntityName %>Form
        onSubmit={() => { }}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})
