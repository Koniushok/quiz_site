import React, { Component } from "react";
import request from "../../../services/requestServer.js";

import { dispatch } from "../../../store/index.js";
import { API_END_POINT } from "../../../config/constants.js";
import { Button } from "../../../assets/styles/styledcomponents/component.js";

const formItems = [
  {
    name: "answer1",
    type: "text",
    id: "defaultFormRegisterAnswer1Ex",
    className: "form-control",
    label: "1 Answer"
  },
  {
    name: "answer2",
    type: "text",
    id: "defaultFormRegisterAnswer2Ex",
    className: "form-control",
    label: "2 Answer"
  },
  {
    name: "answer3",
    type: "text",
    id: "defaultFormRegisterAnswer3Ex",
    className: "form-control",
    label: "3 Answer"
  },
  {
    name: "answer4",
    type: "text",
    id: "defaultFormRegisterAnswer4Ex",
    className: "form-control",
    label: "4 Answer"
  },
  {
    name: "answer1",
    type: "number",
    id: "defaultFormRegisterCorAnswerEx",
    className: "form-control",
    label: "CorrectAnswer"
  }
];

class FomrTask extends Component {
  state = {
    Task: {
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer
    },
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

export default FomrTask;
