import { initGA } from './analytics'
import { init as initErrorHandler } from './errorHandler'

export const initScripts = () => {
  <% if (includeAnalytics && includeErrorHandling) { %>initGA()
  initErrorHandler()<% } %><% if (includeAnalytics && !includeErrorHandling) { %>initGA()<% } %><% if (includeErrorHandling && !includeAnalytics) { %>initErrorHandler()<% } %>
}
