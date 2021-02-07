import createDeepEqualSelector from './deepEqualSelector'

const selectAccounts = (state) => state.accounts

export const getAccounts = createDeepEqualSelector(
  [selectAccounts],
  (accounts) => accounts.accounts
)
