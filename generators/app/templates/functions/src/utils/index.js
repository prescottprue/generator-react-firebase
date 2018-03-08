import { size, pick } from 'lodash'

/**
 * Whether or not object contains all parameters in a list
 * @param  {Object}  srcObj      [description]
 * @param  {Array}  keysList - List of keys to check for
 * @return {Boolean} Whether or not object has all keys
 * @example
 * const thing = { param1: 'some', param2: 'value' }
 * const keysToCheck = ['param1', 'param2']
 * hasAll(thing, keysToCheck) // true
 * hasAll(thing, ['random', 'param1']) // false
 */
export function hasAll(srcObj, keysList) {
  return keysList.every(k => k in srcObj)
}

/**
 * Async await wrapper for easy error handling
 * @param  {Promise} promise - Promise to wrap responses of
 * @return {Promise} Resolves and rejects with an array
 * @example
 * async function asyncFunctionWithThrow() {
 *  const [err, snap] = await to(
 *    admin.database().ref('some').once('value')
 *  );
 *  if (err) {
 *    console.error('Error getting data:', err.message || err)
 *    throw err
 *  }
 *  if (!snap.val()) throw new Error('Data not found');
 *  console.log('Data found:', snap.val())
 * }
 */
export function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err])
}
