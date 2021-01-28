import { createSlice } from '@reduxjs/toolkit'

const appReducer = createSlice({
  name: 'alerts',
  initialState: {
    alert: null,
  },
  reducers: {
    showAlert(state, action) {
      state.alert = action.payload
    },
    hideAlert(state) {
      state.alert = null
    },
  },
})

export default appReducer.reducer
export const { showAlert, hideAlert } = appReducer.actions
