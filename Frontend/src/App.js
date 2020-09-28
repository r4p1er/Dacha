import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import {
  Header,
  Login,
  Home,
  Adverts,
  Documents,
  Vote,
  NotFound,
  Admin,
} from "./components/index";

const App = (props) => {
  const showHeader = (location) => {
    if (location === "/not-found" || location === "/signin") {
      return false
    } else {
      return true 
    }
  }
  const NotFoundRedirect = () => <Redirect to='/not-found' />
  const { isAuthenticated } = props.auth;
  const role = props.auth.user.role;

  return (
    <>
      {showHeader(props.location.pathname) ? isAuthenticated ? <Header /> : <div></div> : <div></div>}
      <Switch>
        <Route
          exact
          path="/signin"
          render={(props) =>
            isAuthenticated ? <NotFound /> : <Login {...props}/>
          }
        />
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? <Home /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/adverts"
          render={() =>
            isAuthenticated ? <Adverts /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/documents"
          render={() =>
            isAuthenticated ? <Documents /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/vote"
          render={() =>
            isAuthenticated ? <Vote /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/admin"
          render={() =>
            role === "admin" || role === "moder" ? isAuthenticated ? <Admin /> : <Redirect to="/signin" /> : null
          }
        />
        <Route path="/not-found" render={() => <NotFound />} />
        <Route component={NotFoundRedirect} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(withRouter(App));
