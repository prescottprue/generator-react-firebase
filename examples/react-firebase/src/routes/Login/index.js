import { loadable } from 'utils/components'
import { LOGIN_PATH as path } from 'constants/paths'

export default {
  path,
  component: loadable(() =>
    import(/* webpackChunkName: 'Login' */ './components/LoginPage')
  )
}
