import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import adverts from './reducers/adverts'
import news from './reducers/news'
import accounts from './reducers/accounts'
import documents from './reducers/documets'
import auth from './reducers/auth'
import alerts from './reducers/alertMessages'

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

export type AppStateType = ReturnType<typeof rootReducer>

export default store
