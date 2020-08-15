import <%= camelName %>Unwrapped from './index';

const eventPath = '<%= camelName %>';

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped);

describe('<%= camelName %> RTDB Cloud Function (RTDB:<%= eventType %>)', () => {
  after(async () => {
    functionsTest.cleanup();
  });

  it('handles event', async () => {
    const eventData = { some: 'value' };<% if (eventType === 'onWrite') { %>
    const beforeData = { another: 'thing' };
    // Build create change event
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      beforeData,
      eventPath
    );
    const afterSnap = functionsTest.database.makeDataSnapshot(
      eventData,
      eventPath
    );
    const changeEvent = { before: beforeSnap, after: afterSnap };
    const fakeContext = {
      params: {},
    };
    await <%= camelName %>(changeEvent, fakeContext)<% } else { %>
    // Build onCreate
    const snap = functionsTest.database.makeDataSnapshot(eventData, eventPath);
    const fakeContext = {
      params: {},
    };
    await <%= camelName %>(snap, fakeContext)<% } %>;
    // TODO: Switch this to a real assertion which confirms functionality
    expect(null).<% if (jestTesting) { %>toEqual(null)<% } else { %>to.be.null<% } %>;
  });
});
