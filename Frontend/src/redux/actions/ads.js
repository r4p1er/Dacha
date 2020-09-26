import { ADS_SUCCESS } from "./actionTypes";
import axios from "axios";
import { setAdverts } from "../reducers/ads";

export const getAdverts = () => {
  return async (dispatch) => {
    const adverts = await axios.get("http://localhost:5000/api/news")
    dispatch(setAdverts(adverts.data))
  }
}



// export function advertsFetchDataSuccess(adverts){
//   return{
//       type: ADS_SUCCESS,
//       adverts
//   }
// }

// export function advertsFetchData(url) {
//   return(dispatch) => {
//     fetch(url)
//       .then(response => {
//           if(!response.ok){
//               throw new Error(response.statusText)
//           }
//           return response;
//       })
//       .then(response=> response.json())
//       .then(adverts => dispatch(advertsFetchDataSuccess(adverts)))
//   };
// };
