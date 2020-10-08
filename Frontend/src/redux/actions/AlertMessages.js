import { SHOW_ALERT, HIDE_ALERT } from './actionTypes';

export function showAlert(text) {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text
    })
    setTimeout(() => {
      dispatch(hideAlert())
    },10000)
  }
}
export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}