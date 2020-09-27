import { GET_NEWS } from "./actionTypes";
const initialState = {
  items: []
};

export function newsReducer(state=initialState, action){
  switch(action.type){
    case GET_NEWS:
      return {
        ...state,
        items: action.payload
      }
    default: return state;
  };
};

export const setNews = (news) => ({type:GET_NEWS, payload:news})