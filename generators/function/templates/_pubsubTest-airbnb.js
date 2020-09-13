import <%= camelName %>Unwrapped from './index';

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped);

describe('<%= camelName %> PubSub Cloud Function (PubSub:<%= eventType %>)', () => {
  after<% if (jestTesting) { %>All<% } %>(async () => {
    functionsTest.cleanup();
  });

  it('should handle event', async () => {
    const results = await <%= camelName %>({});
    expect(results).<% if (jestTesting) { %>toEqual(null)<% } else { %>to.be.null<% } %>;
  });
});
