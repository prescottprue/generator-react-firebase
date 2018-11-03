import { loadRoute, errorLoading } from 'utils/router'

export default store => ({
  path: ':projectId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    return import('./components/ProjectPage')
      .then(loadRoute(cb))
      .catch(errorLoading)
  }
})
