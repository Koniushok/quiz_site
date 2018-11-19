import React, { Component } from "react";
import { BgAuthorization } from "./style.js";
import { Input } from "mdbreact";
import {
  Button,
  Title
} from "../../../assets/styles/styledcomponents/component.js";

class Authorization extends Component {
  state = {
    account: {
      login: "",
      password: ""
    }
  };
  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("Authorization hendle", this.state.account);
  };
  render() {
    return (
      <BgAuthorization>
        <Title>Sign in</Title>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.account.login}
            autoFocus
            onChange={this.handleChange}
            label="Your login"
            name="login"
            icon="envelope"
            group
            validate
            required
            error="wrong"
            success="right"
          />
          <Input
            value={this.state.account.password}
            onChange={this.handleChange}
            label="Your password"
            name="password"
            icon="lock"
            group
            type="password"
            validate
          />
          <div className="text-center">
            <Button light>Login</Button>
          </div>
        </form>
      </BgAuthorization>
    );
  }
}

export default Authorization;
