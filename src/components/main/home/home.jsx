import React, { Component } from "react";
import { Link } from "react-router-dom";
//Styled
import { BgHome } from "./style.js";
import { BtBlock } from "../../../assets/styles/styledcomponents/component.js";

class Home extends Component {
  render() {
    return (
      <BgHome>
        <p>Val Quiz</p>
        <Link to="/authorization">
          <BtBlock margin="10% 20px 0px 20px">Sign in</BtBlock>
        </Link>
        <Link to="/registration">
          <BtBlock margin="10% 20px 0px 20px">Sign up</BtBlock>
        </Link>
      </BgHome>
    );
  }
}

export default Home;
