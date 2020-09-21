import { DOCS_SUCCESS } from "./actionTypes";

export function docsFetchDataSuccess(docs){
  return{
      type: DOCS_SUCCESS,
      docs
  };
};
export function docsFetchData(url) {
  return(dispatch) => {
    fetch(url)
      .then(response => {
          if(!response.ok){
              throw new Error(response.statusText)
          }
          return response;
      })
      .then(response=> response.json())
      .then(docs => dispatch(docsFetchDataSuccess(docs)))
  };
};