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
      placeNum: null,
      role: {
        id: null,
        name: '',
      },
    },
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = !isEmpty(action.payload)
      state.user.id = action.payload.id
      state.user.login = action.payload.login
      state.user.name = action.payload.name
      state.user.lastName = action.payload.lastName
      state.user.middleName = action.payload.middleName
      state.user.placeNum = action.payload.place
      state.user.role = action.payload.role
    },
  },
})

export const { setUser } = authReducer.actions
export default authReducer.reducer
