import <%= name %> from './<%= name %>'<% if (includeEnhancer) { %>
import enhance from './<%= name %>.enhancer'<% } %>

export default <% if (includeEnhancer) { %>enhance(<%= name %>)<% } else  { %><%= name %><% } %>
