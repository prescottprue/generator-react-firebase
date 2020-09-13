import <%= camelName %>Unwrapped from './index'

const eventPath = '<%= camelName %>'

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped)

describe('<%= camelName %> RTDB Cloud Function (RTDB:<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    functionsTest.cleanup()
  })

  it('should handle event', async () => {
    const eventData = { some: 'value' }<% if (eventType === 'onWrite') { %>
    const beforeData = { another: 'thing' }
    // Build create change event
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      beforeData,
      eventPath
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      eventData,
      eventPath
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    const fakeContext = {
      params: {},
    }
    const results = await <%= camelName %>(changeEvent, fakeContext)<% } else { %>
    // Build onCreate
    const snap = functionsTest.database.makeDataSnapshot(eventData, eventPath)
    const fakeContext = {
      params: {},
    }
    const results = await <%= camelName %>(snap, fakeContext)<% } %>
    expect(results).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>
  })
})
