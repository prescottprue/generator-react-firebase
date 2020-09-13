<% if (eventType !== 'onCall') { %>import <%= name %> from './index';<% } %><% if (eventType === 'onCall') { %>
import <%= camelName %>Unwrapped from './index';

const <%= camelName %> = functionsTest.wrap(<%= camelName %>Unwrapped);<% } %>

<% if (eventType === 'onCall') { %>describe('<%= camelName %> HTTPS Callable Cloud Function', () => {
  it('should respond with hello message when sent an empty request', async () => {
    const data = {};
    const context = {};
    // Invoke request handler with fake data + context objects
    const response = await <%= name %>(data, context);
    // Confirm response contains message
    expect(response).<% if (jestTesting) { %>toHaveProperty<% } else { %>to.have.property<% } %>('message', 'Hello from <%= name %>!');
  });
});<% } %><% if (eventType !== 'onCall') { %>describe('<%= camelName %> HTTPS Cloud Function', () => {
  it('should response with hello message when sent an empty request', async () => {
    // Create fake request and response objects, with a mock functionality
    const req = {};
    const res = {
      end: <% if (jestTesting) { %>jest.fn()<% } else { %>sinon.stub()<% } %>,
    };
    // Invoke https function with fake request + response objects
    await <%= camelName %>(req, res);
    expect(res.end).<% if (jestTesting) { %>toHaveBeenCalledWith<% } else { %>to.have.been.calledWith<% } %>('Hello from <%= name %>!');
  });
});<% } %>
