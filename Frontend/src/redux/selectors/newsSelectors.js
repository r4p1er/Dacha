import createDeepEqualSelector from './deepEqualSelector'

const selectNews = (state) => state.news

export const getNews = createDeepEqualSelector(
  [selectNews],
  (news) => news.news
)
