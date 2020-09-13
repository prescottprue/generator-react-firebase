import <%= camelName %>Unwrapped from './index'

const { cleanup, functionsTesting } = registerFunctionsTesting()
const <%= camelName %> = functionsTesting.wrap(<%= camelName %>Unwrapped)

describe('<%= camelName %> Auth Cloud Function (Auth:<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    await cleanup()
  })

  it('should handle event', async () => {
    const results = await <%= camelName %>({})
    expect(results).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>
  })
})
