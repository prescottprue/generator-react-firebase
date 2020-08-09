import * as firebaseTesting from '@firebase/testing'
import <%= camelName %>Unwrapped from './index'

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT,
})

const eventPath = '<%= camelName %>'

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped)

describe('<%= camelName %> RTDB Cloud Function (<%= eventType %>)', () => {
  after(async () => {
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  <% if (jestTesting) { %>test<% } else { %>it<% } %>('handles event', async () => {
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
    await <%= camelName %>(changeEvent, fakeContext)<% } else { %>
    // Build onCreate
    const snap = functionsTest.database.makeDataSnapshot(eventData, eventPath)
    const fakeContext = {
      params: {},
    }
    await <%= camelName %>(snap, fakeContext)<% } %>
    // TODO: Switch this to a real assertion which confirms functionality
    const result = await adminApp.database().ref('some/path').once('value')
    expect(result).<% if (jestTesting) { %>toEqual(null)<% } else { %>to.be.null<% } %>
  })
})
