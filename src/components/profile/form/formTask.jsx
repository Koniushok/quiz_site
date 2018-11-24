import React, { Component } from "react";
import request from "../../../services/requestServer.js";

import { dispatch } from "../../../store/index.js";
import { API_END_POINT } from "../../../config/constants.js";
import { Button } from "../../../assets/styles/styledcomponents/component.js";

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

class Edit extends Component {
  state = {
    account: this.props.account,
    error: {},
    result: ""
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ result: "" });
    if (this.validate()) this.PostEditing(this.state.account);
    else console.error("Editing hendle");
  };
  validate() {
    let test = true;
    const { account } = this.state;
    const error = {};
    for (let item in account) {
      if (account[item].trim() === "") {
        test = false;
        error[item] = "required";
      }
    }
    this.setState({ error });
    return test;
  }
  PostEditing = async account => {
    try {
      const result = await request.post(
        API_END_POINT + "/api/users/edit",
        account
      );
      this.setState({ result: "Successfully changed" });
      dispatch("ADD_USER", result.data);
      //this.setState({ result: result.data });
    } catch (ex) {
      const error = { ...this.state.error };
      error.all = ex.response.data;
      this.setState({ error });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Alert error={this.state.error.all} message={this.state.result} />
        <form onSubmit={this.handleSubmit}>
          {formItems.map(item => (
            <React.Fragment key={item.id}>
              <label htmlFor={item.id} className="grey-text">
                {item.label}
              </label>
              <input
                name={item.name}
                type={item.type}
                id={item.id}
                className={item.className}
                onChange={this.handleChange}
                value={this.state.account[item.name]}
              />
              {this.state.error[item.name] && (
                <div className="alert alert-danger">
                  {this.state.error[item.name]}
                </div>
              )}
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
