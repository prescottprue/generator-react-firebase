import SignupForm from './SignupForm'<% if (includeRedux) { %>
import enhance from './SignupForm.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(SignupForm)<% } %><% if (!includeRedux) { %>SignupForm<% } %>
