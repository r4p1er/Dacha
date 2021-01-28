import { createSlice } from '@reduxjs/toolkit'

const advertsReducer = createSlice({
  name: 'adverts',
  initialState: {
    adverts: [],
    isLoading: true,
  },
  reducers: {
    addAdvert(state, action) {
      state.adverts.push(action.payload)
    },
    editAdvert(state, action) {
      const updatedAdverts = state.adverts.filter(
        (advert) => advert.id !== action.payload.id
      )
      state.adverts = [...updatedAdverts, action.payload]
    },
    deleteAdvert(state, action) {
      const filteredAdverts = state.adverts.filter(
        (advert) => advert.id !== action.payload
      )
      state.adverts = filteredAdverts
    },
    fetchAdverts(state, action) {
      state.adverts = action.payload
    },
    loadingAdverts(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const {
  addAdvert,
  editAdvert,
  deleteAdvert,
  fetchAdverts,
  loadingAdverts,
} = advertsReducer.actions
export default advertsReducer.reducer
