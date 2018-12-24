import React from "react";
import Joi from "joi-browser";

import { userEdit } from "../../../services/users";
import { dispatch } from "../../../store/index.js";
import { Button } from "../styledcomponents/component";

import Form from "./form";
import Alert from "../alert";

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
  }
];

class Edit extends Form {
  state = {
    data: this.props.account,
    errors: {},
    result: ""
  };

  schema = {
    login: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required()
  };

  doSubmit = async () => {
    try {
      const result = await userEdit(this.state.data);
      this.setState({ result: "Successfully changed" });
      dispatch("ADD_USER", result.data);
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.all = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Alert error={this.state.errors.all} message={this.state.result} />
        <form onSubmit={this.handleSubmit}>
          {formItems.map(item => (
            <React.Fragment key={item.id}>
              {this.renderInput(item)}
            </React.Fragment>
          ))}
          <Button width="150px" margin="10px 0 20px 0" light>
            Save
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default Edit;
