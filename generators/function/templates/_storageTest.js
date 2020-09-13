import <%= camelName %>Unwrapped from './index'

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped)

describe('<%= camelName %> Storage Cloud Function (Storage:<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    functionsTest.cleanup()
  })

  it('should handle event', async () => {
    const results = await <%= camelName %>({})
    expect(results).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>
  })
})
