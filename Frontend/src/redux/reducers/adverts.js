import { GET_ADVERTS, ADD_ADVERTS, DELETE_ADVERTS, CHANGE_ADVERTS } from "./actionTypes";
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

    case DELETE_ADVERTS:
      return state.filter(item => item.id !== action.adId);

    case CHANGE_ADVERTS:
      return state.map(item => {
        if (item.id === action.advert.id ) return action.advert;
        return item;
      })
      
    default: return state;
  };
};

export const setAd = (adverts) => ({type:GET_ADVERTS, payload:adverts})
export const addAd = (adverts) => ({type:ADD_ADVERTS, payload:adverts})
export const changeAd = (advert) => ({type:CHANGE_ADVERTS, payload:advert})
export const deleteAd = (adId) => ({type:DELETE_ADVERTS, payload:adId})