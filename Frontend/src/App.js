import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./app.scss";
import {
  AdminAds,
  AdminDocs,
  AdminNews,
  AdminAccounts,
  AdminVote,
} from "./components/Admin/components/index";
import {
  Admin,
  Adverts,
  AdvertsContainer,
  CurrentAdverts,
  Documents,
  Header,
  Home,
  Login,
  NotFound,
  Vote,
} from "./components/index";

function App(props) {
  const authState = useSelector((state) => state.auth);
  const role = authState.user.role;
  const { isAuthenticated } = authState;
  const NotFoundRedirect = () => <Navigate to="/not-found" />;
  const showHeader = (location) => {
    return !(
      location === "/not-found" ||
      location === "/signin" ||
      location === "/loading"
    );
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
            <Route path="/accounts" element={<AdminAccounts />} />
          </Route>
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<NotFoundRedirect />} />
      </Routes>
    </>
  );
}

export default App;
