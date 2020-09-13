import * as firebaseTesting from '@firebase/testing'
import <%= camelName %>Original from './index'

const eventPath = '<%= camelName %>'

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Original)

describe('<%= camelName %> Firestore Cloud Function (<%= eventType %>)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    })
  })

  after<% if (jestTesting) { %>All<% } %>(async () => {
    // Restoring stubs to the original methods
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  it('should handle event', async () => {
    const eventData = { some: 'value' }<% if (eventType === 'onWrite') { %>
    const beforeData = { another: 'thing' }
    // Build create change event
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(beforeData, 'document/path')
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      eventData,
      eventPath
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    const fakeContext = {
      params: {},
    }
    const results = await <%= camelName %>({ after: snap }, fakeContext)<% } else { %>
    // Build onCreate
    const snap = functionsTest.firestore.makeDocumentSnapshot(eventData, eventPath)
    const fakeContext = {
      params: {},
    }
    const results = await <%= camelName %>(snap, fakeContext)<% } %>
    expect(results).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>
  })
})
