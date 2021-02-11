import { AdvertType } from './../../types/types';
import { createSlice } from '@reduxjs/toolkit'

const advertsReducer = createSlice({
  name: 'adverts',
  initialState: {
    adverts: [] as Array<AdvertType>,
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
  },
})

export const {
  addAdvert,
  editAdvert,
  deleteAdvert,
  fetchAdverts,
} = advertsReducer.actions
export default advertsReducer.reducer
