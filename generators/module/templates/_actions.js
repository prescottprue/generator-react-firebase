import {
  SOME_ACTION
} from './actionTypes'

export const someAsyncAction = () => {
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

export const someAction = () => ({ type: SOME_ACTION })
