import { combineReducers } from "redux";
import {adverts} from "./ads";
import {news} from "./news";
import {docs} from "./documets";
import {auth} from "./auth";

const rootReducer = combineReducers({
  adverts,
  news,
  docs,
  auth
});


export default rootReducer;