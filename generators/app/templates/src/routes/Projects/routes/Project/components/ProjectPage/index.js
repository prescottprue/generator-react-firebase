import ProjectPage from './ProjectPage'<% if (includeRedux) { %>
import enhance from './ProjectPage.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(ProjectPage)<% } %><% if (!includeRedux) { %>ProjectPage<% } %>
