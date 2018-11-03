import { LIST_PATH as path } from 'constants/paths'
import { loadRoute, loadChildRoutes, errorLoading } from 'utils/router'

export default store => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    return import('./components/ProjectsPage')
      .then(loadRoute(cb))
      .catch(errorLoading)
  },
  getChildRoutes(partialNextState, cb) {
    return Promise.all([import('./routes/Project')])
      .then(loadChildRoutes(cb, store))
      .catch(errorLoading)
  }
})
