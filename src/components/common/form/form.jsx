import React, { Component } from "react";
import Joi from "joi-browser";
import { Button } from "../styledcomponents/component";
import _ from "lodash";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      _.omit(this.state.data, ["_id", "__v"]),
      this.schema,
      options
    );
    console.log("Form validate Error", error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };

  renderButton(label) {
    return (
      <Button width="150px" margin="10px 0 20px 0" light>
        {label}
      </Button>
    );
  }

  renderInput(inputObj) {
    return (
      <React.Fragment>
        <label htmlFor={inputObj.id} className="grey-text">
          {inputObj.label}
        </label>
        <input
          name={inputObj.name}
          type={inputObj.type}
          id={inputObj.id}
          className={inputObj.className}
          onChange={this.handleChange}
          value={this.state.data[inputObj.name]}
        />
        {this.state.errors[inputObj.name] && (
          <div className="alert alert-danger">
            {this.state.errors[inputObj.name]}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Form;
