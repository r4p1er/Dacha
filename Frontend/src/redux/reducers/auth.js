import { SET_CURRENT_USER } from "../actions/actionTypes";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {
    name: "",
    role: ""
  },
};

export function auth(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: {
          name: action.user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          role: action.user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        },
      };

    default:
      return state;
  }
};
