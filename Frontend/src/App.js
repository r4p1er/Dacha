import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import "./app.scss";
import {
  AdminAds,
  AdminNews,
  AdminDocs,
  AdminProfiles,
  AdminVote,
} from "./components/Admin/components/index";
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

const App = () => {
  const NotFoundRedirect = () => <Navigate to="/not-found" />;
  const authState = useSelector((state) => state.auth);
  const role = authState.user.role;
  const { isAuthenticated } = authState;
  const showHeader = (location) => {
    if (location === "/not-found" || location === "/signin") {
      return false;
    } else {
      return true;
    }
  };
  const PrivateRoute = () => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    return <Outlet />;
  };
  return (
    <>
      {showHeader(useLocation().pathname) ? (
        isAuthenticated ? (
          <Header />
        ) : null
      ) : null}
      <Routes>
        <Route
          path="/signin"
          element={isAuthenticated ? <NotFound /> : <Login />}
        />
        <Route path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />

          <Route path="/adverts" element={<AdvertsContainer />}>
            <Route path="/" element={<Adverts />} />
            <Route path="/current_adverts" element={<CurrentAdverts />} />
          </Route>

          <Route path="/documents" element={<Documents />} />

          <Route path="/vote" element={<Vote />} />

          <Route
            path="/admin"
            element={role === "admin" || role === "moder" ? <Admin /> : null}
          >
            <Route path="/news" element={<AdminNews />} />
            <Route path="/adverts" element={<AdminAds />} />
            <Route path="/documents" element={<AdminDocs />} />
            <Route path="/vote" element={<AdminVote />} />
            <Route path="/profiles" element={<AdminProfiles />} />
          </Route>
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<NotFoundRedirect />} />
      </Routes>
    </>
  );
};

export default App;
