import { createSelector } from 'reselect'
import createDeepEqualSelector from './deepEqualSelector'
import { getUserId } from './userSelectors'

const selectAdverts = (state) => state.adverts

export const getAdverts = createDeepEqualSelector(
  [selectAdverts],
  (adverts) => adverts.adverts
)

export const getUserAdverts = createSelector(
  getAdverts,
  getUserId,
  (adverts, userId) => {
    const userAdverts = adverts.filter(
      (adverts) => adverts.accountId === userId
    )
    return userAdverts
  }
)
