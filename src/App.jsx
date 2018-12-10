import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Main from "./components/main/main.jsx";
import { login } from "./services/auth.js";

login();

class App extends Component {
  render() {
    const { style } = this.props.state;
    return (
      <React.Fragment>
        <Header bg={style.bgColor} minHeight={style.minH} />
        <Main />
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
