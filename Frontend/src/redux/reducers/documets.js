import { GET_DOCUMENTS } from "./actionTypes";
const initialState = {
  items: []
};

export function docsReducer(state=initialState, action){
  switch(action.type){
    case GET_DOCUMENTS:
      return {
        ...state,
        items: action.payload
      }
    default: return state;
  };
};

export const setDocs = (docs) => ({type:GET_DOCUMENTS, payload:docs})