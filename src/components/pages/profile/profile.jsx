import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import { BgProfile } from "./style";

//page
import UserData from "../userData/userData";
import UserTest from "../userTest/userTest";
import Statistics from "../statistics/statistics";

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
    return (
      <BgProfile>
        <Sidebar MenuLinks={MenuLinks} />
        <Switch>
          <Route path={urlProfile + "/data"} component={UserData} />
          <Route path={urlProfile + "/mytest"} component={UserTest} />
          <Route path={urlProfile + "/statistics"} component={Statistics} />
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
