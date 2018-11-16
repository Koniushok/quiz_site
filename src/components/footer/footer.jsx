import React, { Component } from "react";
import { FooterDiv } from "./styles/styled.js";

class Footer extends Component {
  state = {};
  render() {
    return (
      <FooterDiv bg={this.props.bg} minHeight={this.props.minHeight}>
        © 2018 ValBat
      </FooterDiv>
    );
  }
}

export default Footer;
