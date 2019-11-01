import AccountPage from './AccountPage'<% if (includeRedux) { %>
import enhance from './AccountPage.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(AccountPage)<% } %><% if (!includeRedux) { %>AccountPage<% } %>
