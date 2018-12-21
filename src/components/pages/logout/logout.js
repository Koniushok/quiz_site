import { Component } from "react";
import { logout } from "../../../services/auth.js";

class Logout extends Component {
  componentDidMount() {
    logout();
    this.props.history.push("/");
  }
  render() {
    return null;
  }
}

export default Logout;
