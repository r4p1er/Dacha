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
  NotFound
} from "./components/index";


const App = (props) => {
  const { isAuthenticated } = props.auth;
  return (
    <>
      {isAuthenticated ? <Header /> : <div></div>}
      <Container fluid style={{padding:'15px', height:'100%'}}>
        <Switch>
          <Route path="/signin" component={Login} />
          <Route
            exact
            path="/"
            render={(news) =>
              isAuthenticated ? <Home /> : <Redirect to="/signin" />
            }
          />
          <Route
            path="/adverts"
            render={(adverts) =>
              isAuthenticated ? <Adverts /> : <Redirect to="/signin" />
            }
          />
          <Route
            path="/documents"
            render={(docs) =>
              isAuthenticated ? <Documents /> : <Redirect to="/signin" />
            }
          />
          <Route
            path="/vote"
            render={(props) =>
              isAuthenticated ? <Vote /> : <Redirect to="/signin" />
            }
          />
          <Route component={NotFound} />
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
