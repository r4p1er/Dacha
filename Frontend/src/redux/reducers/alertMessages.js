import {HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from './actionTypes'

const initialState = {
  loading: false,
  alert: null
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {...state, loading: true}
    case HIDE_LOADER:
      return {...state, loading: false}
    case SHOW_ALERT:
      return {...state, alert: action.payload}
    case HIDE_ALERT:
      return {...state, alert: null}
    default: return state
  }
}

export const showLoader = () => ({type:SHOW_LOADER})
export const hideLoader = () => ({type:HIDE_LOADER})