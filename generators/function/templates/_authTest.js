import * as firebaseTesting from '@firebase/testing'
import <%= camelName %>Unwrapped from './index'

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped)

describe('<%= camelName %> Auth Cloud Function (Auth:<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    functionsTest.cleanup()
  })

  it('handles event', async () => {
    await <%= camelName %>({})
    // TODO: Switch this to a real assertion which confirms functionality
    expect(null).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>
  })
})
