/**
 * Create a selector string from a selector value.
 * @param {String} selectorValue - Value of the selector
 * @example
 * createSelector('some-btn')
 * // => [data-test=some-btn]
 */
export function createSelector(selectorValue) {
  return `[data-test=${selectorValue}]`
}
