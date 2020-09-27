import { GET_ADVERTS } from "./actionTypes";
const initialState = {
  items: []
};

export function advertsReducer(state=initialState, action){
  switch(action.type){
    case GET_ADVERTS:
      return {
        ...state,
        items: action.payload
      }
    default: return state;
  };
};

export const setAdverts = (adverts) => ({type:GET_ADVERTS, payload:adverts})