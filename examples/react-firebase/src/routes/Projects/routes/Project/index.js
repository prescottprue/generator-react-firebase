export default store => ({
  path: ':projectId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const Project = require('./components/ProjectPage').default

        /*  Return getComponent   */
        cb(null, Project)

        /* Webpack named bundle   */
      },
      'Project'
    )
  }
})
