import { createSelector } from 'reselect'
import createDeepEqualSelector from './deepEqualSelector'

const selectUser = (state) => state.auth

export const getAuth = createSelector(
  [selectUser],
  (user) => user.isAuthenticated
)

export const getUser = createDeepEqualSelector(
  [selectUser],
  (user) => user.user
)

export const getUserId = createDeepEqualSelector([getUser], (user) => +user.id)
