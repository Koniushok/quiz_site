import React from "react";
import request from "../../../services/requestServer.js";
import Joi from "joi-browser";

import { dispatch } from "../../../store/index.js";
import { API_END_POINT } from "../../../config/constants.js";
import { Button } from "../styledcomponents/component";

import Form from "./form";

const formItems = [
  {
    name: "question",
    type: "text",
    id: "defaultFormRegisterQuestionEx",
    className: "form-control",
    label: "Question"
  },
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
    name: "correctAnswer",
    type: "number",
    id: "defaultFormRegisterCorrectAnswerEx",
    className: "form-control",
    label: "CorrectAnswer"
  }
];

class FormTask extends Form {
  state = {
    data:
      this.props.task != null
        ? this.props.task
        : {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: 1
          },
    errors: {},
    result: ""
  };

  schema = {
    question: Joi.string().required(),
    answer1: Joi.string().required(),
    answer2: Joi.string().required(),
    answer3: Joi.string().required(),
    answer4: Joi.string().required(),
    correctAnswer: Joi.number()
      .min(1)
      .max(4)
      .required()
  };

  doSubmit = async () => {
    try {
      let result;
      if (!this.props.edit) {
        result = await request.post(API_END_POINT + "/api/userTest/task", {
          task: this.state.data,
          testId: this.props.test._id
        });
      } else {
        result = await request.post(API_END_POINT + "/api/userTest/task/edit", {
          task: this.state.data,
          testId: this.props.test._id
        });
      }
      this.setState({ result: "Successfully changed" });
      dispatch("UPDATA_TEST", result.data);
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.all = ex.response.data;
      console.log("Form task Error:", ex.response.data);
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
            {this.props.edit ? "Editing" : "Add"}
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

export default FormTask;
