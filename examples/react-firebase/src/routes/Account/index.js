import { loadable } from 'utils/router'
import { ACCOUNT_PATH as path } from 'constants/paths'

export default {
  path,
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Account' */ './components/AccountPage')
  )
}
