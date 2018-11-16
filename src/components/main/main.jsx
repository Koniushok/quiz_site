import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import imgFon from "../../assets/images/fon.jpg";

//content
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
      </Switch>
    );
  }
}

export default Main;
