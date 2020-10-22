import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import background from "./additions/background.png";
import loader from "./additions/LoaderGif.gif";
import "./app.scss";
import {
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

const Admin = lazy(() => import("./components/Admin/AdminContainer"));
const AdminAds = lazy(() =>
  import("./components/Admin/components/Adverts/Adverts")
);
const AdminDocs = lazy(() =>
  import("./components/Admin/components/Documents/Documents")
);
const AdminNews = lazy(() => import("./components/Admin/components/News/News"));
const AdminAccounts = lazy(() =>
  import("./components/Admin/components/Accounts/Accounts")
);
const AdminVote = lazy(() => import("./components/Admin/components/Vote/Vote"));

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
    <div
      style={{
        backgroundImage: "url(" + background + ")",
        "min-height": "100vh",
      }}
    >
      {showHeader(useLocation().pathname) ? (
        isAuthenticated ? (
          <Header />
        ) : null
      ) : null}
      <Suspense
        fallback={<Image alt="ЗАГРУЗКА..." width="400px" src={loader} />}
      >
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
      </Suspense>
    </div>
  );
}

export default App;
