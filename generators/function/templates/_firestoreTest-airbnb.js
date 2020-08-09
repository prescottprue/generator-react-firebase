import * as firebaseTesting from '@firebase/testing'
import <%= eventType %>Original from './index';

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT,
});

const eventPath = '<%= camelName %>';

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped);

describe('<%= camelName %> Firestore Cloud Function (<%= eventType %>)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    });
  });

  after(async () => {
    // Restoring stubs to the original methods
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()));
  });

  it('handles event', async () => {
    const eventData = { some: 'value' }<% if (eventType === 'onWrite') { %>
    const beforeData = { another: 'thing' }
    // Build create change event
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(beforeData, 'document/path');
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      eventData,
      eventPath
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    const fakeContext = {
      params: {},
    }
    await <%= camelName %>({ after: snap }, fakeContext)<% } else { %>
    // Build onCreate
    const snap = functionsTest.firestore.makeDocumentSnapshot(eventData, eventPath)
    const fakeContext = {
      params: {},
    }
    await <%= camelName %>(snap, fakeContext)<% } %>
    // TODO: Uncomment and make an assertion
    // const result = await adminApp.firestore().doc('some/path').get()
    // expect(result).toEqual()
    // const fakeEvent = functionsTest.firestore.makeDocumentSnapshot({foo: 'bar'}, 'document/path');
  })
})
