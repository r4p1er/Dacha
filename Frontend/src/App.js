import React, { useState } from "react";
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

  const [showHeader, setShowHeader] = useState(false);
  
  function isNotFound(e){
    return setShowHeader(e)
  }

  return (
    <>
      {!showHeader ? isAuthenticated ? <Header /> : <div></div> : <div></div>}
        <Switch>
          <Route 
            exact 
            path="/signin" 
            render={() => 
              isAuthenticated ? <NotFound isNotFound={isNotFound}/> : <Login />
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
          <Route render={() => <NotFound isNotFound={isNotFound}/>} title="NotFound" />
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
