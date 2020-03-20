import { loadable } from 'utils/components'

export default {
  path: ':projectId',
  component: loadable(() =>
    import(/* webpackChunkName: 'Project' */ './components/ProjectPage')
  )
}
