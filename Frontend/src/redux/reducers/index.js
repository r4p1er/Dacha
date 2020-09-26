import { combineReducers } from "redux";
import {advertsReducer} from "./ads";
import {news} from "./news";
import {docs} from "./documets";
import {auth} from "./auth";

const rootReducer = combineReducers({
  adverts: advertsReducer,
  news,
  docs,
  auth
});


export default rootReducer;