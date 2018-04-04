import { initGA } from './analytics'
import { init as initErrorHandler } from './errorHandler'

export const initScripts = () => {
  initGA()
  initErrorHandler()
}
