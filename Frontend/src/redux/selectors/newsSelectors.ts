import { AppStateType } from './../store';
import createDeepEqualSelector from './deepEqualSelector'

const selectNews = (state: AppStateType) => state.news

export const getNews = createDeepEqualSelector(
  [selectNews],
  (news: ReturnType<typeof selectNews>) => news.news
)
