import LoadableComponent from 'react-loadable'
import LoadingSpinner from 'components/LoadingSpinner'

/**
 * Create component which is loaded async, showing a loading spinner
 * in the meantime.
 * @param {object} opts - Loading options
 * @param {Function} opts.loader - Loader function (should return import promise)
 * @returns {React.Component}
 */
export function Loadable(opts) {
  return LoadableComponent({
    loading: LoadingSpinner,
    ...opts
  })
}
