import { GET_ADVERTS, ADD_ADVERTS } from "./actionTypes";
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
    case ADD_ADVERTS:
      return {
        ...state,
        items: state.items.concat([action.payload])
      }
    default: return state;
  };
};

export const setAdverts = (adverts) => ({type:GET_ADVERTS, payload:adverts})
export const addAdvert = (adverts) => ({type:ADD_ADVERTS, payload:adverts})