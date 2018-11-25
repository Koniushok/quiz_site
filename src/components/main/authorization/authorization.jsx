import React, { Component } from "react";
import { authorization } from "../../../services/auth.js";
import { BgAuthorization, FormAuth } from "./style.js";
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
    },
    error: ""
  };
  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.postAuthorization();
    console.log("Authorization hendle", this.state.account);
  };
  postAuthorization = async () => {
    try {
      await authorization(
        this.state.account.login,
        this.state.account.password
      );
      this.props.history.push("/");
    } catch (ex) {
      this.setState({ error: ex.response.data });
      this.setState({ account: { password: "" } });
    }
  };
  render() {
    return (
      <BgAuthorization>
        <Alert error={this.state.error} />
        <FormAuth onSubmit={this.handleSubmit}>
          <Title>Sign in</Title>
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
            required
            type="password"
            validate
          />
          <div className="text-center">
            <Button light>Login</Button>
          </div>
        </FormAuth>
      </BgAuthorization>
    );
  }
}

const Alert = props => {
  if (props.error)
    return <div className="alert alert-danger">{props.error}</div>;
  if (props.message)
    return <div className="alert alert-success">{props.message}</div>;

  return <React.Fragment />;
};
export default Authorization;
