export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';

export function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser
  }
}

export function removeAuthedUser(authedUser) {
  return {
    type: REMOVE_AUTHED_USER,
    authedUser
  }
}
