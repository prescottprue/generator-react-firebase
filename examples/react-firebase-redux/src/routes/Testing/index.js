import { Loadable } from 'utils/components'
import { TESTING_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Testing' */ './components/TestingPage')
  })
}
