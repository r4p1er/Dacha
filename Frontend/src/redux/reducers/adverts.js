import {
  ADD_ADVERT,
  EDIT_ADVERT,
  DELETE_ADVERT,
  FETCH_ADVERTS,
  ADVERTS_LOADING
} from "../actions/actionTypes"

const initialState = {
  adverts: [],
  isLoading: true
};

const advertsReducer = (state = initialState, action) => {    
  switch(action.type) {
      case ADD_ADVERT:            
          return { ...state, adverts: [ ...state.adverts, action.payload ]};       
      case EDIT_ADVERT:            
          const updatedAdverts = state.adverts.filter(advert => advert.id !== action.payload.id);    
          return { ...state, adverts: [...updatedAdverts, action.payload ]};   
      case DELETE_ADVERT:
          const filteredAdverts = state.adverts.filter(advert => advert.id !== action.payload.id);
          return { ...state, adverts: filteredAdverts };
      case FETCH_ADVERTS:  
          return { ...state, adverts: action.payload }
      case ADVERTS_LOADING:
          return { ...state, isLoading: action.payload }
      default:
          return state;
  }
};

export default advertsReducer;
