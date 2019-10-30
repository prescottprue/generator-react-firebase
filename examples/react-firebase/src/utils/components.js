import React from 'react'
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

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    // TODO: Report error to sentry
    console.log('error:', error, errorInfo) // eslint-disable-line no-console
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
