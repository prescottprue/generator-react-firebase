import <%= camelName %>Original from './index';

const { cleanup, functionsTesting } = registerFunctionsTesting()
const <%= camelName %> = functionsTesting.wrap(<%= camelName %>Original);

const eventPath = '<%= camelName %>';

describe('<%= camelName %> Firestore Cloud Function (<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await cleanup();
  });

  it('should handle event', async () => {
    const eventData = { some: 'value' }<% if (eventType === 'onWrite') { %>
    const beforeData = { another: 'thing' };
    // Build create change event
    const beforeSnap = functionsTesting.firestore.makeDocumentSnapshot(beforeData, 'document/path');
    const afterSnap = functionsTesting.firestore.makeDocumentSnapshot(
      eventData,
      eventPath
    );
    const changeEvent = { before: beforeSnap, after: afterSnap };
    const fakeContext = {
      params: {},
    };
    const results = await <%= camelName %>(changeEvent, fakeContext);<% } else { %>
    // Build onCreate
    const snap = functionsTesting.firestore.makeDocumentSnapshot(eventData, eventPath);
    const fakeContext = {
      params: {},
    };
    const results = await <%= camelName %>(snap, fakeContext)<% } %>;
    expect(results).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>;
  });
});
