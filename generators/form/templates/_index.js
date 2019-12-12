import <%= name %> from './<%= name %>'<% if (!hasFormik) { %>
import enhance from './<%= name %>.enhancer'<% } %>
  
export default <% if (!hasFormik) { %>enhance(<%= name %>)<% } else  { %><%= name %><% } %>
