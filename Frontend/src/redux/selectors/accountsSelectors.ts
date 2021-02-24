import { AppStateType } from './../store'
import createDeepEqualSelector from './deepEqualSelector'

const selectAccounts = (state: AppStateType) => state.accounts

export const getAccounts = createDeepEqualSelector(
  [selectAccounts],
  (accounts: AppStateType) => accounts.accounts
)
