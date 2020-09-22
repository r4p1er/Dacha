import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import jwt from "jsonwebtoken";
import { setCurrentUser } from "./redux/actions/authActions";
import setAuthorizationToken from "./utils/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.scss";

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}


ReactDOM.render(
  <Provider store={store}>
    <Router> 
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);