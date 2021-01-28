import isEmpty from 'lodash/isEmpty'
import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {
      id: null,
      login: '',
      name: '',
      lastName: '',
      middleName: '',
      placeNum: '',
      role: '',
    },
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = !isEmpty(action.payload)
      state.user.id = action.payload.id
      state.user.placeNum = action.payload.place
      state.user.login = action.payload.login
      state.user.role = action.payload.role
      state.user.name = action.payload.name
      state.user.lastName = action.payload.last_name
      state.user.middleName = action.payload.middle_name
    },
  },
})

export const { setUser } = authReducer.actions
export default authReducer.reducer
