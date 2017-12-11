import LoginForm from './LoginForm'<% if (includeRedux) { %>
import enhance from './LoginForm.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(LoginForm)<% } %><% if (!includeRedux) { %>LoginForm<% } %>
