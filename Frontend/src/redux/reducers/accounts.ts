import { AccountType } from '../../common/types/types';
import { createSlice } from '@reduxjs/toolkit'

const accountsReducer = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [] as Array<AccountType>,
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
  },
})

export const {
  addAccount,
  editAccount,
  deleteAccount,
  fetchAccounts,
} = accountsReducer.actions
export default accountsReducer.reducer
