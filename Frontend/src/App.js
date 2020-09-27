import React from "react";
import { Container } from "react-bootstrap";
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
} from "./components/index";

const App = (props) => {
  const { isAuthenticated } = props.auth;

  return (
    <>
     {isAuthenticated ? <Header /> : null}
      <Container fluid style={{ padding: "15px", height: "100%" }}>
        <Switch>
          <Route exact path="/signin" component={Login} />
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
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
