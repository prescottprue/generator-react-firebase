import SignupPage from './SignupPage'<% if (includeRedux) { %>
import enhance from './SignupPage.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(SignupPage)<% } %><% if (!includeRedux) { %>SignupPage<% } %>
