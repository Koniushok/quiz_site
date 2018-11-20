import React, { Component } from "react";
import HeaderNav from "./headerNav.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const UserLinks = [
  {
    id: 0,
    title: "Home",
    url: "/"
  }
];

const VisitorLinks = [
  {
    id: 0,
    title: "Home",
    url: "/"
  },
  {
    id: 1,
    title: "Registration",
    url: "/registration"
  },
  {
    id: 2,
    title: "Authorization",
    url: "/authorization"
  }
];

class Header extends Component {
  render() {
    const { user } = this.props.state;
    return (
      <HeaderNav
        navLinks={user._id ? UserLinks : VisitorLinks}
        bg={this.props.bg}
        minHeight={this.props.minHeight}
      />
    );
  }
}

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(Header)
);
