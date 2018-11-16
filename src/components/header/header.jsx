import React, { Component } from "react";
import HeaderNav from "./headerNav.jsx";

const links = [
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
  state = {};
  render() {
    return (
      <HeaderNav
        navLinks={links}
        bg={this.props.bg}
        minHeight={this.props.minHeight}
      />
    );
  }
}

export default Header;
