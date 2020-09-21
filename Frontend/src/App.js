// import React, { Component } from "react";
// import Header from "./components/Header/Header";
// import { Home } from "./Components/Main/Home";
// import  {AdsContainer}  from "./Components/Adverts/AdsContainer";
// import { Documents } from "./Components/Documents/Documents";
// import { Vote } from "./Components/Vote/Vote";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
// import { PageFooter } from "./components/Footer/Footer";
// import { connect } from "react-redux";
// import { advertsFetchData } from "./redux/actions/ads";
// import { newsFetchData } from "./redux/actions/news";
// import { docsFetchData } from "./redux/actions/documents";

// class App extends Component {
//   componentDidMount() {
//     this.props.adsfetchData("http://localhost:3003/adverts");
//     this.props.newsfetchData("http://localhost:3003/news");
//     this.props.docsfetchData("http://localhost:3003/docs");
//   }

//   render() {
//     const adverts = this.props.adverts;
//     const news = this.props.news;
//     const docs = this.props.docs;
//     console.log(docs);

//     return (
//       <BrowserRouter>
//         <Header />
//         <Switch>
//           <div style={{ flex: "1 0 auto" }}>
//             <Route exact path="/" render={(props) => <Home news={news} />} />
//             <Route
//               path="/adverts"
//               render={(props) => <AdsContainer adverts={adverts} />}
//             />

//             <Route
//               path="/documents"
//               render={(props) => <Documents docs={docs} />}
//             />
//             <Route path="/vote" component={Vote} />
//           </div>
//         </Switch>
//         <PageFooter />
//       </BrowserRouter>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     adverts: state.adverts,
//     news: state.news,
//     docs: state.docs
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     adsfetchData: (url) => dispatch(advertsFetchData(url)),
//     newsfetchData: (url) => dispatch(newsFetchData(url)),
//     docsfetchData: (url) => dispatch(docsFetchData(url))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);






import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import LoginForm from "./components/Login/index";
import Home from "./components/index";

const App = props => {
  const { isAuth } = props;
  console.log(isAuth);
  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path="/signin"
          component={LoginForm}
        />
        <Route
          path="/"
          render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
        />
      </Switch>
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);