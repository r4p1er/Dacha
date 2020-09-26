import { combineReducers } from "redux";
import {advertsReducer} from "./ads";
import {newsReducer} from "./news";
import {docs} from "./documets";
import {auth} from "./auth";

const rootReducer = combineReducers({
  adverts: advertsReducer,
  news: newsReducer,
  docs,
  auth
});


export default rootReducer;