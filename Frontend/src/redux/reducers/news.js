import { createSlice } from '@reduxjs/toolkit'

const newsReducer = createSlice({
  name: 'news',
  initialState: {
    news: [],
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
  },
})

export const { addNews, editNews, deleteNews, fetchNews } = newsReducer.actions
export default newsReducer.reducer
