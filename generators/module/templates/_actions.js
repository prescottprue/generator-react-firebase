import { SOME_ACTION } from './actionTypes'

export function someAsyncAction() {
  const payload = { id: Date.now() }
  return dispatch => {
    dispatch({ type: SOME_ACTION, payload })

    setTimeout(() => {
      dispatch({
        type: SOME_ACTION,
        payload: payload.id
      })
    }, payload.dismissAfter || defaultDismissTime)
  }
}

export function someAction () {
  return { type: SOME_ACTION }
}
