import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import {
  Header,
  Login,
  Home,
  Adverts,
  Documents,
  Vote,
  NotFound,
  Admin,
  AdvertsContainer,
  CurrentAdverts,
} from "./components/index";

const App = (props) => {
  const showHeader = (location) => {
    if (location === "/not-found" || location === "/signin") {
      return false;
    } else {
      return true;
    }
  };
  const NotFoundRedirect = () => <Navigate to="/not-found" />;
  const { isAuthenticated } = props.auth;
  const role = props.auth.user.role;

  return (
    <>
      {showHeader(useLocation().pathname) ? (
        isAuthenticated ? (
          <Header />
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}
      <Routes>
        <Route
          path="/signin"
          element={isAuthenticated ? <NotFound /> : <Login {...props} />}
        />
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/adverts"
          element={
            isAuthenticated ? <AdvertsContainer /> : <Navigate to="/signin" />
          }
        >
            <Route
              path="/"
              element={
                isAuthenticated ? <Adverts /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/current_adverts"
              element={
                isAuthenticated ? <CurrentAdverts /> : <Navigate to="/signin" />
              }
            />
        </Route>
        <Route
          path="/documents"
          element={isAuthenticated ? <Documents /> : <Navigate to="/signin" />}
        />
        <Route
          path="/vote"
          element={isAuthenticated ? <Vote /> : <Navigate to="/signin" />}
        />
        <Route
          path="/admin"
          element={
            role === "admin" || role === "moder" ? (
              isAuthenticated ? (
                <Admin />
              ) : (
                <Navigate to="/signin" />
              )
            ) : null
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<NotFoundRedirect />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
