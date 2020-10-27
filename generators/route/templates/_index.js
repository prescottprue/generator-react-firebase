import { loadable } from 'utils/router';
import { <%= pathName %>_PATH as path } from 'constants/paths'

export default {
  path,
  component: loadable(() =>
    import(/* webpackChunkName: '<%= camelName %>' */ './components/<%= componentName %>'),
  ),
}
