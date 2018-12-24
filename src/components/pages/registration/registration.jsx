import React from "react";
import Joi from "joi-browser";

import { addUser } from "../../../services/users";
import { BgRegisration, FormRegistration } from "./style.js";
import { Button, Title } from "../../common/styledcomponents/component";
import Form from "../../common/form/form";
import Alert from "../../common/alert";

const formItems = [
  {
    name: "login",
    type: "text",
    id: "defaultFormRegisterLoginEx",
    className: "form-control",
    label: "Your Login"
  },
  {
    name: "name",
    type: "text",
    id: "defaultFormRegisterNameEx",
    className: "form-control",
    label: "Your Name"
  },
  {
    name: "surname",
    type: "text",
    id: "defaultFormRegisterSurnameEx",
    className: "form-control",
    label: "Your Surname"
  },
  {
    name: "email",
    type: "email",
    id: "defaultFormRegisterEmailmEx",
    className: "form-control",
    label: "Your Email"
  },
  {
    name: "password",
    type: "password",
    id: "defaultFormRegisterPasswordEx",
    className: "form-control",
    label: "Your Password"
  }
];

class Registration extends Form {
  state = {
    data: {
      name: "",
      surname: "",
      email: "",
      login: "",
      password: ""
    },
    errors: {},
    result: ""
  };

  schema = {
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  };

  doSubmit = async () => {
    try {
      const result = await addUser(this.state.data);
      this.setState({ result: result.data });
      this.setState({
        data: {
          name: "",
          surname: "",
          email: "",
          login: "",
          password: ""
        }
      });
    } catch (ex) {
      const errors = { ...this.state.errors };
      console.log(ex.message);
      errors.all = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <BgRegisration>
        <Alert error={this.state.errors.all} message={this.state.result} />
        <FormRegistration onSubmit={this.handleSubmit}>
          <Title>Sign up</Title>
          {formItems.map(item => (
            <React.Fragment key={item.id}>
              {this.renderInput(item)}
            </React.Fragment>
          ))}
          <div className="text-center mt-4">
            <Button light type="submit">
              Register
            </Button>
          </div>
        </FormRegistration>
      </BgRegisration>
    );
  }
}

export default Registration;
