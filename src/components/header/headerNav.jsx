import React, { Component } from "react";
//style
import { NavItem, HeaderDiv } from "./styles/styled.js";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
//router
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

import { Logo } from "./headerNavItems.jsx";

class HeaderNav extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <HeaderDiv bg={this.props.bg} minHeight={this.props.minHeight}>
        <Navbar dark expand="md">
          <Link to="/">
            <Logo />
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.navLinks &&
                this.props.navLinks.map(link => (
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
            </Nav>
          </Collapse>
        </Navbar>
      </HeaderDiv>
    );
  }
}

const NavLink = props => {
  const link = props.link;
  return (
    <NavItem active={props.active}>
      <Link key={link.id} to={link.url}>
        {link.title}
      </Link>
    </NavItem>
  );
};
export default HeaderNav;
