import { combineReducers } from "redux";
import {adverts} from "./ads";
import {news} from "./news";
import {docs} from "./documets";

const rootReducer = combineReducers({
  adverts,
  news,
  docs
});


export default rootReducer;