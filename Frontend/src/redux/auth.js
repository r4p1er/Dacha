import isEmpty from 'lodash/isEmpty'
import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {
      id: null,
      name: '',
      role: '',
    },
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = !isEmpty(action.payload)
      state.user.id =
        action.payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ]
      state.user.name =
        action.payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ]
      state.user.role =
        action.payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
    },
  },
})

export const { setUser } = authReducer.actions
export default authReducer.reducer
