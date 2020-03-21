import { loadable } from 'utils/components'

export default {
  component: loadable(() =>
    import(/* webpackChunkName: 'NotFound' */ './components/NotFoundPage')
  )
}
