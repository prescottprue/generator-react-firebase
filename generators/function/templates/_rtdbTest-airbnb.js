import <%= camelName %>Unwrapped from './index';

const { cleanup, functionsTesting } = registerFunctionsTesting();
const <%= camelName %> = functionsTesting.wrap(<%= camelName %>Unwrapped);

const eventPath = '<%= camelName %>';

describe('<%= camelName %> RTDB Cloud Function (RTDB:<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    await cleanup();
  });

  it('should handle event', async () => {
    const eventData = { some: 'value' };<% if (eventType === 'onWrite') { %>
    const beforeData = { another: 'thing' };
    // Build create change event
    const beforeSnap = functionsTesting.database.makeDataSnapshot(
      beforeData,
      eventPath
    );
    const afterSnap = functionsTesting.database.makeDataSnapshot(
      eventData,
      eventPath
    );
    const changeEvent = { before: beforeSnap, after: afterSnap };
    const fakeContext = {
      params: {},
    };
    const results = await <%= camelName %>(changeEvent, fakeContext)<% } else { %>
    // Build fake onCreate event
    const snap = functionsTesting.database.makeDataSnapshot(eventData, eventPath);
    const fakeContext = {
      params: {},
    };
    const results = await <%= camelName %>(snap, fakeContext)<% } %>;
    expect(results).<% if (jestTesting) { %>toBeNull()<% } else { %>to.be.null<% } %>;
  });
});
