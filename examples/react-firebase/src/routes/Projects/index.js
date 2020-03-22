import { LIST_PATH as path } from 'constants/paths'
import { loadable } from 'utils/router'

export default {
  path,
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Projects' */ './components/ProjectsPage')
  )
}
