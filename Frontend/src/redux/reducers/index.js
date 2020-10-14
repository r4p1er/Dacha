import { combineReducers } from "redux";
import advertsReducer from "./adverts";
import newsReducer from "./news";
import accountsReducer from "./accounts";
import {docsReducer} from "./documets";
import {auth} from "./auth";
import { appReducer } from "./alertMessages";

const rootReducer = combineReducers({
  adverts: advertsReducer,
  news: newsReducer,
  docs: docsReducer,
  auth,
  app: appReducer,
  accounts: accountsReducer
});


export default rootReducer;