import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//content pages

import {
  Home,
  Registration,
  Profile,
  Logout,
  Tests,
  Authorization
} from "../pages/index";

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
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route path="/tests" component={Tests} />
      <Route component={Not_fount} />
    </Switch>
  );
};

const visitorRouter = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/registration" component={Registration} />
      <Route path="/authorization" component={Authorization} />
      <Route component={Not_fount} />
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
