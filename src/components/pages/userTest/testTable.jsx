import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { TableItem, BgTable, TableForm, TableControl } from "./style";
import { Button } from "../../common/styledcomponents/component";
import request from "../../../services/requestServer.js";
import { API_END_POINT } from "../../../config/constants.js";
import { dispatch } from "../../../store/index.js";

class TestTable extends Component {
  state = {
    testName: "",
    testNameEdit: ""
  };

  handleChange = ({ currentTarget: input }) => {
    if (input.name === "testName") this.setState({ testName: input.value });
    if (input.name === "testNameEdit")
      this.setState({ testNameEdit: input.value });
  };

  handleTestAdd = async e => {
    e.preventDefault();
    try {
      const result = await request.post(API_END_POINT + "/api/userTest", {
        name: this.state.testName
      });
      this.setState({ testName: "" });
      dispatch("UPDATA_TEST", result.data);
    } catch (ex) {
      console.error(ex);
    }
  };
  handleTestEdit = async e => {
    e.preventDefault();
    try {
      const result = await request.post(API_END_POINT + "/api/userTest/edit", {
        name: this.state.testNameEdit,
        id: this.props.testsActive._id
      });
      dispatch("UPDATA_TEST", result.data);
      this.setState({ testNameEdit: "" });
    } catch (ex) {
      console.error(ex);
    }
  };
  handleDelete = async () => {
    try {
      const result = await request.delete(
        API_END_POINT + "/api/userTest/" + this.props.testsActive._id
      );
      this.props.СhoiceTest(null);
      dispatch("UPDATA_TEST", result.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  render() {
    const { user } = this.props.state;

    return (
      <BgTable>
        <h2>List your Test:</h2>
        <TableList
          user={user}
          testsActive={this.props.testsActive}
          СhoiceTest={this.props.СhoiceTest}
        />

        <TableControl>
          <FormAdd
            handleTestAdd={this.handleTestAdd}
            handleChange={this.handleChange}
            testName={this.state.testName}
          />
          {this.props.testsActive && (
            <React.Fragment>
              <FormEdit
                handleTestEdit={this.handleTestEdit}
                handleChange={this.handleChange}
                testNameEdit={this.state.testNameEdit}
              />
              <Button
                width="150px"
                height="50px"
                margin="auto 0"
                light
                onClick={this.handleDelete}
              >
                Remove
              </Button>
            </React.Fragment>
          )}
        </TableControl>
      </BgTable>
    );
  }
}

const TableList = props => {
  const { user, testsActive, СhoiceTest } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name Test</th>
          <th>Task</th>
          <th>Public</th>
        </tr>
      </thead>
      <tbody>
        {user.tests.map((test, index) => (
          <TableItem
            active={testsActive && testsActive._id === test._id}
            key={test._id}
            onClick={() => СhoiceTest(test)}
          >
            <td>{index + 1}</td>
            <td>{test.name}</td>
            <td>{test.tasks.length}</td>
            <td>{test.public + ""}</td>
          </TableItem>
        ))}
      </tbody>
    </Table>
  );
};
const FormAdd = props => {
  return (
    <TableForm onSubmit={props.handleTestAdd}>
      <label htmlFor="Idname" className="grey-text">
        NameTest
      </label>
      <input
        name="testName"
        type="text"
        required
        id="Idname"
        className="form-control"
        onChange={props.handleChange}
        value={props.testName}
      />

      <Button margin="10px 10px 0 0" width="150px" height="50px" light>
        Add
      </Button>
    </TableForm>
  );
};
const FormEdit = props => {
  return (
    <TableForm onSubmit={props.handleTestEdit}>
      <label htmlFor="Idname" className="grey-text">
        New name test
      </label>
      <input
        name="testNameEdit"
        type="text"
        id="Idname"
        required
        className="form-control"
        onChange={props.handleChange}
        value={props.testNameEdit}
      />

      <Button margin="10px 10px 0 0" width="150px" height="50px" light>
        editing
      </Button>
    </TableForm>
  );
};

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(TestTable)
);
