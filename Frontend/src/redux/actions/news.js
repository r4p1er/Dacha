import {NEWS_SUCCESS} from "./actionTypes";

export function newsFetchDataSuccess(news){
  return{
      type: NEWS_SUCCESS,
      news
  }
}
  
export function newsFetchData(url) {
  return(dispatch) => {
    fetch(url)
      .then(response => {
          if(!response.ok){
              throw new Error(response.statusText)
          }
          return response;
      })
      .then(response=> response.json())
      .then(news => dispatch(newsFetchDataSuccess(news)))
  };
};