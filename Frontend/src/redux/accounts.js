import { createSlice } from '@reduxjs/toolkit'

const accountsReducer = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    isLoading: true,
  },
  reducers: {
    addAccount(state, action) {
      state.accounts.push(action.payload)
    },
    editAccount(state, action) {
      const updatedAccount = state.accounts.filter(
        (account) => account.id !== action.payload.id
      )
      state.accounts = [...updatedAccount, action.payload]
    },
    deleteAccount(state, action) {
      const filteredAccounts = state.accounts.filter(
        (account) => account.id !== action.payload
      )
      state.accounts = filteredAccounts
    },
    fetchAccounts(state, action) {
      state.accounts = action.payload
    },
    loadingAccounts(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const {
  addAccount,
  editAccount,
  deleteAccount,
  fetchAccounts,
  loadingAccounts,
} = accountsReducer.actions
export default accountsReducer.reducer
