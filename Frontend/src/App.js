import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
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
import { AdminNews, AdminDocs, AdminAds, AdminVote, AdminProfiles } from "./components/Admin/components/index";

const App = (props) => {
  const { isAuthenticated } = props.auth;
  const role = props.auth.user.role;

  const [showHeader, setShowHeader] = useState(false);

  function isNotFound(e) {
    return setShowHeader(e);
  }

  return (
    <>
      {!showHeader ? isAuthenticated ? <Header /> : <div></div> : <div></div>}
      <Switch>
        <Route
          exact
          path="/signin"
          render={(props) =>
            isAuthenticated ? <NotFound isNotFound={isNotFound} /> : <Login {...props}/>
          }
        />
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? <Home isNotFound={isNotFound}/> : <Redirect to="/signin" />
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
          path="/current_adverts"
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
        <Route path='*' exact={true} render={() => <NotFound isNotFound={isNotFound} />} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
