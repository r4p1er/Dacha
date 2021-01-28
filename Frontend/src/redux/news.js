import { createSlice } from '@reduxjs/toolkit'

const newsReducer = createSlice({
  name: 'news',
  initialState: {
    news: [],
    isLoading: false,
  },
  reducers: {
    addNews(state, action) {
      state.news.push(action.payload)
    },
    editNews(state, action) {
      const updatedNews = state.news.filter(
        (news) => news.id !== action.payload.id
      )
      state.news = [...updatedNews, action.payload]
    },
    deleteNews(state, action) {
      const filteredNews = state.news.filter(
        (news) => news.id !== action.payload
      )
      state.news = filteredNews
    },
    fetchNews(state, action) {
      state.news = action.payload
    },
    loadingNews(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const {
  addNews,
  editNews,
  deleteNews,
  fetchNews,
  loadingNews,
} = newsReducer.actions
export default newsReducer.reducer
