import React, { Component } from "react";
import { BgAuthorization } from "./style.js";
import { Input } from "mdbreact";
import {
  Button,
  Title
} from "../../../assets/styles/styledcomponents/component.js";

class Authorization extends Component {
  render() {
    return (
      <BgAuthorization>
        <Title>Sign in</Title>
        <form>
          <div>
            <Input
              label="Your email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
            />
            <Input
              label="Your password"
              icon="lock"
              group
              type="password"
              validate
            />
          </div>
          <div className="text-center">
            <Button light>Login</Button>
          </div>
        </form>
      </BgAuthorization>
    );
  }
}

export default Authorization;
