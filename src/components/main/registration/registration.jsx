import React, { Component } from "react";
import { BgRegisration, FormRegistration } from "./style.js";
import {
  Button,
  Title
} from "../../../assets/styles/styledcomponents/component.js";

class Registration extends Component {
  render() {
    return (
      <BgRegisration>
        <FormRegistration>
          <Title>Sign up</Title>
          <form>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Your name
            </label>
            <input
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormRegisterEmailEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormRegisterConfirmEx"
              className="form-control"
            />
            <br />
            <label
              htmlFor="defaultFormRegisterPasswordEx"
              className="grey-text"
            >
              Your password
            </label>
            <input
              type="password"
              id="defaultFormRegisterPasswordEx"
              className="form-control"
            />
            <div className="text-center mt-4">
              <Button light type="submit">
                Register
              </Button>
            </div>
          </form>
        </FormRegistration>
      </BgRegisration>
    );
  }
}

export default Registration;
