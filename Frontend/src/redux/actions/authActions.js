import userApi from '../../utils/api/user';
import setAuthorizationToken from '../../utils/axios';
import { SET_CURRENT_USER } from "./actionTypes";
import jwt from "jsonwebtoken";

export function setCurrentUser(user) {
  return {
      type: SET_CURRENT_USER,
      user
  };
}

export function logout(){
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({})); 
  }
}

export function login(data) {
  return dispatch => {
    return userApi
      .signIn(data)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
  }
}