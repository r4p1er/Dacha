import { NEWS_SUCCESS } from "../actions/actionTypes";
const initialState = {
  items: [],
  isLoading: true,
};

export function newsReducer(state=initialState, action){
  switch(action.type){
    case NEWS_SUCCESS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  };
};

export const setNews = (news) => ({type:NEWS_SUCCESS, payload:news})