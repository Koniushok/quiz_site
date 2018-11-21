import React, { Component } from "react";
import Sidebar from "./Components/sidebar.jsx";
import { BgProfile } from "./style.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const urlProfile = "/profile";
const MenuLinks = [
  {
    id: 0,
    title: "MyData",
    url: urlProfile + "/data"
  },
  {
    id: 2,
    title: "MyTask",
    url: urlProfile + "/task"
  },
  {
    id: 3,
    title: "MyFriends",
    url: urlProfile + "/friends"
  }
];

class Profile extends Component {
  render() {
    const { user } = this.props.state;
    return (
      <BgProfile>
        <Sidebar MenuLinks={MenuLinks} />
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
