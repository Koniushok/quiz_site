import React, { Component } from "react";
import axios from "axios";
import { BgRegisration, FormRegistration } from "./style.js";
import { API_END_POINT } from "../../../config/constants.js";
import {
  Button,
  Title
} from "../../../assets/styles/styledcomponents/component.js";

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

class Registration extends Component {
  state = {
    account: {
      name: "",
      surname: "",
      email: "",
      login: "",
      password: ""
    },
    error: { all: "123" },
    result: ""
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) this.PostRegisration(this.state.account);
    else console.error("Registration hendle");
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
  PostRegisration = async account => {
    try {
      const result = await axios.post(API_END_POINT + "/api/users", account);
      this.setState({ result: result.data });
    } catch (ex) {
      const error = { ...this.state.error };
      error.all = ex.response.data;
      this.setState({ error });
      console.log(ex.response.data);
    }
  };

  render() {
    return (
      <BgRegisration>
        <Alert error={this.state.error.all} message={this.state.result} />
        <FormRegistration onSubmit={this.handleSubmit}>
          <Title>Sign up</Title>
          <form>
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
const Alert = props => {
  if (props.error)
    return <div className="alert alert-danger">{props.error}</div>;
  if (props.message)
    return <div className="alert alert-success">{props.message}</div>;

  return <React.Fragment />;
};

export default Registration;
