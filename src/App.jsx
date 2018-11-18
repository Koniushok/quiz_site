import React, { Component } from "react";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Main from "./components/main/main.jsx";

const bgColor = "#24292e";
const minH = "72px";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header bg={bgColor} minHeight={minH} />
        <Main />
        <Footer bg={bgColor} minHeight={minH} />
      </React.Fragment>
    );
  }
}

export default App;
