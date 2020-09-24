import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  Header,
  Login,
  Home,
  Adverts,
  Documents,
  Vote,
  Footer,
} from "./components/index";

class App extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <>
        {isAuthenticated ? <Header /> : <div></div>}
        <Switch>
          <Route 
          path="/signin"
          component={Login}
          />
          <Route
            exact
            path="/"
            render={(news) =>
              isAuthenticated ? <Home /> : <Redirect to="/signin"/>
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
        </Switch>
        {isAuthenticated ? <Footer /> : <div></div>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
