import { FETCH_DOCUMENTS } from "../actions/actionTypes";
const initialState = {
  items: [],
  isLoading: false
};

export function docsReducer(state=initialState, action){
  switch(action.type){
    case FETCH_DOCUMENTS:
      return {
        ...state,
        items: action.payload
      }
    default: return state;
  };
};

export const setDocs = (docs) => ({type:FETCH_DOCUMENTS, payload:docs})