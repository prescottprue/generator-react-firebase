import { LOGIN_PATH as path } from 'constants/paths'
import { loadRoute, errorLoading } from 'utils/router'

export default store => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    return import("./components/LoginPage")
      .then(loadRoute(cb))
      .catch(errorLoading);
  }
});
