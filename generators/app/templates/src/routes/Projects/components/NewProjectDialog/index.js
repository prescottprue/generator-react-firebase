import NewProjectDialog from './NewProjectDialog'<% if (includeRedux) { %>
import enhance from './NewProjectDialog.enhancer'<% } %>

export default <% if (includeRedux) { %>enhance(NewProjectDialog)<% } %><% if (!includeRedux) { %>NewProjectDialog<% } %>
