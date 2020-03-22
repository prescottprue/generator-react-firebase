import { init as initAnalytics } from './analytics'
import { init as initErrorHandling } from './errorHandler'

/**
 * Initialize global scripts including analytics and error handling
 */
export function initScripts() {
  initAnalytics()
  initErrorHandling()
}
