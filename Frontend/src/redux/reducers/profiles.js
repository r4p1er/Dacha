import { GET_PROFILES } from "./actionTypes";
const initialState = {
  items: []
};

export function profilesReducer(state=initialState, action){
  switch(action.type){
    case GET_PROFILES:
      return {
        ...state,
        items: action.payload
      }
    default: return state;
  };
};

export const setProfiles = (profiles) => ({type:GET_PROFILES, payload:profiles})