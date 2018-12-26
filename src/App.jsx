import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import { login } from "./services/auth";

import { MainDiv } from "./components/common/styledcomponents/divs";
import Table from "./components/common/table/table";
login();

const items = [
  { name1: "val", surname2: "bat", age: 18 },
  { name1: "val", surname2: "bat3", age: 16 },
  { name1: "val", surname2: "bat9", age: 12 },
  { name1: "val", surname2: "bat1", age: 33 }
];

const headlines = ["name", "surname", "age"];
class App extends Component {
  render() {
    const { style } = this.props.state;
    //main->Table
    return (
      <React.Fragment>
        <Header bg={style.bgColor} minHeight={style.minH} />
        <MainDiv>
          <Table headlines={headlines} items={items} />
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
