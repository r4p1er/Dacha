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
import { advertsFetchData } from "./redux/actions/ads";
import { newsFetchData } from "./redux/actions/news";
import { docsFetchData } from "./redux/actions/documents";

class App extends Component {
  componentDidMount() {
    this.props.adsfetchData("http://localhost:3003/adverts");
    this.props.newsfetchData("http://localhost:3003/news");
    this.props.docsfetchData("http://localhost:3003/docs");
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const adverts = this.props.adverts;
    const news = this.props.news;
    const docs = this.props.docs;
    return (
      <>
        {isAuthenticated ? <Header /> : <div></div>}
        <Switch>
          <Route path="/signin" component={Login} />
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
    adverts: state.adverts,
    news: state.news,
    docs: state.docs,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adsfetchData: (url) => dispatch(advertsFetchData(url)),
    newsfetchData: (url) => dispatch(newsFetchData(url)),
    docsfetchData: (url) => dispatch(docsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
