import {
  ADD_NEWS,
  DELETE_NEWS,
  EDIT_NEWS,
  FETCH_NEWS,
  NEWS_LOADING,
} from "../actions/actionTypes";

const initialState = {
  news: [],
  isLoading: true
};

const newsReducer = (state = initialState, action) => {    
  switch(action.type) {
      case ADD_NEWS:            
          return { ...state, news: [ ...state.news, action.payload ]};       
      case EDIT_NEWS:            
          const updatedNews = state.news.filter(news => news.id !== action.payload.id);    
          return { ...state, news: [...updatedNews, action.payload ]};   
      case DELETE_NEWS:
          const filteredNews = state.news.filter(news => news.id !== action.payload.id);
          return { ...state, news: filteredNews };
      case FETCH_NEWS:  
          return { ...state, news: action.payload }
      case NEWS_LOADING:
          return { ...state, isLoading: action.payload }
      default:
          return state;
  }
};

export default newsReducer;
