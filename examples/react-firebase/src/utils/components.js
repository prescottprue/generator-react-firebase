import React, { Suspense } from 'react';
import LoadingSpinner from 'components/LoadingSpinner'

/**
 * Create component which is loaded async, showing a loading spinner
 * in the meantime.
 * @param {object} loadFunc - Loading options
 * @returns {React.Component}
 */
export function loadable(loadFunc) {
  const OtherComponent = React.lazy(loadFunc);
  return function LoadableWrapper(loadableProps) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <OtherComponent {...loadableProps} />
      </Suspense>
    );
  };
}