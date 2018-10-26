import { loadRoute, errorLoading } from "utils/router";

export default () => ({
  path: "*",
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    return import("./components/NotFound")
      .then(loadRoute(cb))
      .catch(errorLoading);
  }
});
