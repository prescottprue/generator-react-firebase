import <%= pascalEntityName %> from 'routes/<%= pascalEntityName %>';

describe('(Route) <%= pascalEntityName %>', () => {
  let _route
  // let _component
  // let _childRoutes

  beforeEach(() => {
    _route = <%= pascalEntityName %>()
    // _component = _route.getComponent()
    // _childRoutes = _route.getChildRoutes()
  })

  it('Should return a route configuration object', () => {
    expect(<%= pascalEntityName %>).to.be.a.function
  })

  it('Sets Path to /<%= camelEntityName %>', () => {
    expect(_route.path).to.equal('/<%= camelEntityName %>')
  })
  it('Defines a getComponent function', () => {
    expect(_route.getComponent).to.be.a.function
  })
  it('Defines a getChildRoutes function', () => {
    expect(_route.getChildRoutes).to.be.a.function
  })

})
