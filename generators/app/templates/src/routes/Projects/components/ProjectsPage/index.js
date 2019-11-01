import ProjectsPage from './ProjectsPage'<% if (includeRedux) { %>
import enhance from './ProjectsPage.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(ProjectsPage)<% } %><% if (!includeRedux) { %>ProjectsPage<% } %>
