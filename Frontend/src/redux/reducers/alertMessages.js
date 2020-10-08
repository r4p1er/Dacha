import {HIDE_ALERT, SHOW_ALERT} from '../actions/actionTypes'

const initialState = {
  alert: null
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {...state, alert: action.payload}
    case HIDE_ALERT:
      return {...state, alert: null}
    default: return state
  }
}