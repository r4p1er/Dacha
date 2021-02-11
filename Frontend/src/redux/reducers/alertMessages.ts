import { AlertType } from './../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const appReducer = createSlice({
  name: 'alerts',
  initialState: {
    alert: null,
  } as AlertType,
  reducers: {
    showAlert(state, action: PayloadAction<string>) {
      state.alert = action.payload
    },
    hideAlert(state) {
      state.alert = null
    },
  },
})

export default appReducer.reducer
export const { showAlert, hideAlert } = appReducer.actions
