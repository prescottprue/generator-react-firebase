export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
export const SIGNUP_RESPONSE = 'SIGNUP_RESPONSE'
export const LOGOUT_RESPONSE = 'LOGOUT_RESPONSE'
export const AUTH_ERR = 'AUTH_ERR'

export function login (account) {
  return {
    type: LOGIN_RESPONSE,
    account,
    receivedAt: Date.now()
  }
}

export function signup (signupData, account) {
  return {
    type: SIGNUP_RESPONSE,
    signupData,
    account,
    receivedAt: Date.now()
  }
}


export function logout () {
  return {
    type: LOGOUT_RESPONSE,
    account: null,
    receivedAt: Date.now()
  }
}
