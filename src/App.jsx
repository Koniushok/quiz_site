import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import { login } from "./services/auth";

import { MainDiv } from "./components/common/styledcomponents/divs";

login();
class App extends Component {
  render() {
    const { style } = this.props.state;
    //main->Inf
    return (
      <React.Fragment>
        <Header bg={style.bgColor} minHeight={style.minH} />
        <MainDiv>
          <Main />
        </MainDiv>
        <Footer bg={style.bgColor} minHeight={style.minH} />
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(App)
);
