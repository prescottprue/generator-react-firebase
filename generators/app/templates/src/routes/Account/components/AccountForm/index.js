import AccountForm from './AccountForm'<% if (includeRedux) { %>
import enhance from './AccountForm.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(AccountForm)<% } %><% if (!includeRedux) { %>AccountForm<% } %>
