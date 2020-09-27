import { combineReducers } from "redux";
import {advertsReducer} from "./adverts";
import {newsReducer} from "./news";
import {profilesReducer} from "./profiles";
import {docs} from "./documets";
import {auth} from "./auth";

import { appReducer } from "./alertMessages";

const rootReducer = combineReducers({
  adverts: advertsReducer,
  news: newsReducer,
  docs,
  auth,
  app: appReducer,
  profiles: profilesReducer
});


export default rootReducer;