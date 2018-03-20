import { firebase, googleApis } from '../config'
import { version, env } from '../../package.json'

let errorHandler

export function init() {
  if (googleApis && googleApis.apiKey && env === 'production') {
    window.addEventListener('DOMContentLoaded', () => {
      errorHandler = new window.StackdriverErrorReporter()
      errorHandler.start({
        key: googleApis.apiKey,
        projectId: firebase.projectId,
        service: '<%= appName %>-site',
        version
      })
    })
  } else {
    errorHandler = console.error // eslint-disable-line no-console
  }
  return errorHandler
}

export default errorHandler
