import { 
  ADS_SUCCESS
 } from "../constants/ActionTypes";



export function advertsFetchDataSuccess(adverts){
  return{
      type: ADS_SUCCESS,
      adverts
  }
}



export function advertsFetchData(url) {
  return(dispatch) => {
    fetch(url)
      .then(response => {
          if(!response.ok){
              throw new Error(response.statusText)
          }
          return response;
      })
      .then(response=> response.json())
      .then(adverts => dispatch(advertsFetchDataSuccess(adverts)))
  };
};
