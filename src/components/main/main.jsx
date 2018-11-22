import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//content pages
import profile from "../profile/profile.jsx";
import logout from "../logout/logout.js";
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
      <Route path="/logout" component={logout} />
      <Route path="/profile" component={profile} />
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
