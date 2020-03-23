import { loadable } from 'utils/router'

export default {
  path: ':projectId',
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Project' */ './components/ProjectPage')
  )
}
