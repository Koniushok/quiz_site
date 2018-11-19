import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//content pages
import Home from "./home/home.jsx";
import Registration from "./registration/registration.jsx";
import Authorization from "./authorization/authorization.jsx";
class Main extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registration" component={Registration} />
        <Route path="/authorization" component={Authorization} />
        <Route path="/not-found" component={Not_fount} />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

const Not_fount = () => {
  return <p>not-found</p>;
};

export default Main;
