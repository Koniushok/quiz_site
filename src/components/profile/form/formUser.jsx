import React, { Component } from "react";
import request from "../../../services/requestServer.js";
import Joi from "joi-browser";

import { dispatch } from "../../../store/index.js";
import { API_END_POINT } from "../../../config/constants.js";
import { Button } from "../../../assets/styles/styledcomponents/component.js";

import Form from "../../common/form/form.jsx";

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
      const result = await request.post(
        API_END_POINT + "/api/users/edit",
        this.state.data
      );
      this.setState({ result: "Successfully changed" });
      dispatch("ADD_USER", result.data);
      //this.setState({ result: result.data });
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
const Alert = props => {
  if (props.error)
    return <div className="alert alert-danger">{props.error}</div>;
  if (props.message)
    return <div className="alert alert-success">{props.message}</div>;

  return null;
};

export default Edit;
