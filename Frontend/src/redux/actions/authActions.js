import setAuthorizationToken from "../../utils/setAuthToken";
import { SET_CURRENT_USER } from "./actionTypes";
import jwt from "jsonwebtoken";
import { showAlert } from "./AlertMessages";
import axios from "axios";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return async (dispatch) => {
    try {
      await axios.post(`http://${window.location.hostname}:5000/api/token`, data).then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(showAlert("Неверный логин или пароль"));
      }
    }
  };
}
