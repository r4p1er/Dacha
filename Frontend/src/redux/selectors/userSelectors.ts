import { AppStateType } from './../store'
import { createSelector } from 'reselect'
import createDeepEqualSelector from './deepEqualSelector'
import { UserType } from '../../types/types'

const selectUser = (state: AppStateType) => state.auth

export const getAuth = createSelector(
  [selectUser],
  (user: ReturnType<typeof selectUser>) => user.isAuthenticated
)

export const getUser = createDeepEqualSelector(
  [selectUser],
  (user: ReturnType<typeof selectUser>) => user.user
)

export const getUserId = createDeepEqualSelector(
  [getUser],
  (user: UserType) => {
    if (!user) {
      return
    } else {
      return user.id
    }
  }
)
