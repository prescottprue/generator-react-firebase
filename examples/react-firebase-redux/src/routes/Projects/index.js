import { LIST_PATH as path } from 'constants/paths'
import { loadable } from 'utils/components'

export default {
  path,
  component: loadable(() =>
    import(/* webpackChunkName: 'Projects' */ './components/ProjectsPage')
  )
}
