import { AdvertType } from './../../types/types'
import { AppStateType } from './../store'
import { createSelector } from 'reselect'
import createDeepEqualSelector from './deepEqualSelector'
import { getUserId } from './userSelectors'

const selectAdverts = (state: AppStateType) => state.adverts

export const getAdverts = createDeepEqualSelector(
  [selectAdverts],
  (adverts: ReturnType<typeof selectAdverts>) => adverts.adverts
)

export const getUserAdverts = createSelector(
  getAdverts,
  getUserId,
  (adverts: AdvertType[], userId: number) => {
    const userAdverts = adverts.filter(
      (adverts) => adverts.accountId === +userId
    )

    return userAdverts
  }
)
