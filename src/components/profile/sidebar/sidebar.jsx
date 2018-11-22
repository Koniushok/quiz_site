import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { BgNav, Title, NavItem } from "./style.js";

class Sidebar extends Component {
  render() {
    return (
      <BgNav>
        <Title>Menu</Title>
        {this.props.MenuLinks &&
          this.props.MenuLinks.map(link => (
            <Route
              key={link.id}
              exact
              path={link.url}
              children={props =>
                props.match ? (
                  <NavLink active link={link} />
                ) : (
                  <NavLink link={link} />
                )
              }
            />
          ))}
      </BgNav>
    );
  }
}

const NavLink = props => {
  const link = props.link;
  return (
    <Link key={link.id} to={link.url}>
      <NavItem active={props.active}>{link.title}</NavItem>
    </Link>
  );
};
export default Sidebar;
