import React, { Component } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//content pages
import Home from "./home/home.jsx";
import Registration from "./registration/registration.jsx";
import Authorization from "./authorization/authorization.jsx";

class Main extends Component {
  render() {
    const { user } = this.props.state;
    return (
      <React.Fragment>
        {user._id ? userRouter() : visitorRouter()}
      </React.Fragment>
    );
  }
}

const userRouter = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/not-found" component={Not_fount} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

const visitorRouter = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/registration" component={Registration} />
      <Route path="/authorization" component={Authorization} />
      <Route path="/not-found" component={Not_fount} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

const Not_fount = () => {
  return <p>not-found</p>;
};

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(Main)
);
