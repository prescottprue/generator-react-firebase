import <%= componentName %> from './<%= componentName %>'<% if (includeEnhancer) { %>
import enhance from './<%= componentName %>.enhancer'<% } %>

export default <% if (includeEnhancer) { %>enhance(<%= componentName %>)<% } else  { %><%= componentName %><% } %>
