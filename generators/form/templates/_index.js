import <%= name %> from './<%= name %>'<% if (reduxFormExists) { %>
import enhance from './<%= name %>.enhancer'<% } %>
  
export default <% if (reduxFormExists) { %>enhance(<%= name %>)<% } else  { %><%= name %><% } %>
