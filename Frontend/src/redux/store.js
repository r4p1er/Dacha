import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import adverts from './adverts'
import news from './news'
import accounts from './accounts'
import documents from './documets'
import auth from './auth'
import alerts from './alertMessages'

const rootReducer = combineReducers({
  adverts,
  news,
  documents,
  auth,
  alerts,
  accounts,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export default store
