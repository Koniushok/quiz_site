import React, { Component } from "react";
import { TableItem, BgTable, TableForm, TableControl } from "./style";
import { Button } from "../../../assets/styles/styledcomponents/component.js";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import request from "../../../services/requestServer.js";
import { API_END_POINT } from "../../../config/constants.js";
import { dispatch } from "../../../store/index.js";

class TestTable extends Component {
  state = {
    testName: ""
  };

  handleChange = ({ currentTarget: input }) => {
    if (input.name === "testName") this.setState({ testName: input.value });
  };

  handleTestAdd = async e => {
    e.preventDefault();
    console.log("handleTestAdd", this.state.testName);
    try {
      const result = await request.post(API_END_POINT + "/api/userTest", {
        name: this.state.testName
      });
      dispatch("UPDATA_TEST", result.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  handleDelete = async () => {
    try {
      const result = await request.delete(
        API_END_POINT + "/api/userTest/:" + this.props.testsActive._id
      );
      this.props.СhoiceTest(null);
      console.log(result.data);
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
          <TableForm onSubmit={this.handleTestAdd}>
            <label htmlFor="Idname" className="grey-text">
              NameTest
            </label>
            <input
              name="testName"
              type="text"
              required
              id="Idname"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.testName}
            />
            <Button margin="10px 10px 0 0" width="150px" height="50px" light>
              Add
            </Button>
          </TableForm>
          {this.props.testsActive && (
            <Button
              width="150px"
              height="50px"
              margin="auto 0"
              light
              onClick={this.handleDelete}
            >
              Remove
            </Button>
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
            <td scope="row">{index + 1}</td>
            <td>{test.name}</td>
            <td>{test.tasks.length}</td>
            <td>false</td>
          </TableItem>
        ))}
      </tbody>
    </Table>
  );
};

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(TestTable)
);
