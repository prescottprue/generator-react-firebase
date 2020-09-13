import <%= name %> from './index'

<% if (eventType === 'onCall') { %>describe('<%= camelName %> HTTPS Callable Cloud Function', () => {
  it('responds with hello message when sent an empty request', async () => {
    const data = {}
    const context = {}
    // Invoke request handler with fake data + context objects
    const response = await <%= name %>(data, context)
    // Confirm response contains message
    expect(response).<% if (jestTesting) { %>toHaveProperty<% } else { %>to.have.property<% } %>('message', 'Hello from <%= name %>!')
  })
})<% } %><% if (eventType !== 'onCall') { %>describe('<%= camelName %> HTTPS Cloud Function', () => {
  it('responds with hello message when sent an empty request', async () => {
    const req = {}
    // A fake response object, with a stubbed end function
    const res = {
      end: <% if (jestTesting) { %>jest.fn()<% } else { %>sinon.stub()<% } %>
    }
    // Invoke https function with fake request + response objects
    await <%= camelName %>(req, res)
    expect(res.end).<% if (jestTesting) { %>toHaveBeenCalledWith<% } else { %>to.have.been.calledWith<% } %>('Hello from <%= name %>!')
  })
})<% } %>
