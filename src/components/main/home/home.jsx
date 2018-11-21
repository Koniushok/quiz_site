import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Styled
import { BgHome } from "./style.js";
import { BtBlock } from "../../../assets/styles/styledcomponents/component.js";

class Home extends Component {
  render() {
    const { user } = this.props.state;
    return (
      <BgHome>
        <p>Val Quiz</p>
        {user._id ? (
          <Link to="/profile">
            <BtBlock margin="10% 20px 0px 20px">Start</BtBlock>
          </Link>
        ) : (
          <React.Fragment>
            <Link to="/authorization">
              <BtBlock margin="10% 20px 0px 20px">Sign in</BtBlock>
            </Link>
            <Link to="/registration">
              <BtBlock margin="10% 20px 0px 20px">Sign up</BtBlock>
            </Link>
          </React.Fragment>
        )}
      </BgHome>
    );
  }
}

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(Home)
);
