import { Loadable } from 'utils/components'
import { <%= pathName %>_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: '<%= startCasedName %>' */ './components/<%= componentName %>')
  })
}
