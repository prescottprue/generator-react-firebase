import <%= name %> from './index'

<% if (eventType === 'onCall') { %>describe('<%= camelName %> HTTPS Callable Cloud Function', () => {
  <% if (jestTesting) { %>test<% } else { %>it<% } %>('responds with hello message when sent an empty request', async () => {
    const data = {}
    const context = {}
    // Invoke request handler with fake data + context objects
    const response = await <%= name %>(data, context)
    // Confirm no error is thrown
    expect(err).to.not.exist
    // Confirm response contains message
    expect(response).to.have.property('message', 'Hello World')
  })
})<% } %><% if (eventType !== 'onCall') { %>describe('<%= camelName %> HTTPS Cloud Function', () => {
  <% if (jestTesting) { %>test<% } else { %>it<% } %>('responds with hello message when sent an empty request', done => {
    const req = {}
    // Parameters of request can also be stubbed
    // const req = { query: { text: 'input' } }
    // A fake response object, with a stubbed end function which asserts that
    // it is called with a hello message
    const res = {
      end: (msg) => {
        expect(msg).to.equal('Hello from <%= name %>!')
        done()
      }
    }
    // Invoke https function with fake request + response objects
    <%= camelName %>(req, res)
  })
})<% } %>
