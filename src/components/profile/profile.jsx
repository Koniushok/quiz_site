import React, { Component } from "react";
import Sidebar from "./sidebar/sidebar.jsx";
import { Switch, Route } from "react-router-dom";
import { BgProfile } from "./style.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//page
import UserData from "./userData/userData.jsx";
import UserTest from "./userTest/userTest.jsx";

const urlProfile = "/profile";
const MenuLinks = [
  {
    id: 0,
    title: "MyData",
    url: urlProfile + "/data"
  },
  {
    id: 1,
    title: "MyTest",
    url: urlProfile + "/mytest"
  },
  {
    id: 2,
    title: "MyStatistics",
    url: urlProfile + "/statistics"
  }
];

class Profile extends Component {
  render() {
    const { user } = this.props.state;
    return (
      <BgProfile>
        <Sidebar MenuLinks={MenuLinks} />
        <Switch>
          <Route path={urlProfile + "/data"} component={UserData} />
          <Route path={urlProfile + "/mytest"} component={UserTest} />
        </Switch>
      </BgProfile>
    );
  }
}

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(Profile)
);
