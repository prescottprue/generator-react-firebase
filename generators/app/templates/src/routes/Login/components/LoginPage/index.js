import LoginPage from './LoginPage'<% if (includeRedux) { %>
import enhance from './LoginPage.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(LoginPage)<% } %><% if (!includeRedux) { %>LoginPage<% } %>
