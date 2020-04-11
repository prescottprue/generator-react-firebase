<% if (includeSegment) { %>import { init as initAnalytics } from './analytics'<% } %><% if (includeSegment && includeErrorHandling) { %>
<% } %><% if (includeErrorHandling) { %>import { init as initErrorHandling } from './errorHandler'<% } %><% if (includeSegment || includeErrorHandling) { %>

<% } %>/**
 * Initialize global scripts including analytics and error handling
 */
export function initScripts() {
  <% if (includeSegment && includeErrorHandling) { %>initAnalytics()
  initErrorHandling()<% } else { %>// Initialize global scripts here<% } %><% if (includeSegment && !includeErrorHandling) { %>
  initAnalytics()<% } %><% if (includeErrorHandling && !includeSegment) { %>
  initErrorHandling()<% } %>
}
