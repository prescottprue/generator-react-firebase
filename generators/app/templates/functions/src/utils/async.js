/**
 * Async await wrapper for easy error handling
 * @param {Promise} promise - Promise to wrap responses of
 * @returns {Promise} Resolves and rejects with an array
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
  return promise.then((data) => [null, data]).catch((err) => [err])
}
