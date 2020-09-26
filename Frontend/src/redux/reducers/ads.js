import { ADS_SUCCESS } from "../actions/actionTypes";
const initialState = {
  items: [],
  isLoading: true,
};

export function advertsReducer(state=initialState, action){
  switch(action.type){
    case ADS_SUCCESS:
      return {
        ...state,
        items: action.payload.items
      }
    default:
      return state;
  };
};

export const setAdverts = (adverts) => ({type:ADS_SUCCESS, payload:adverts})