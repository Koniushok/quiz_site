import React, { Component } from "react";
import { BgTests, TableItem } from "./style.js";
import { Button } from "../../assets/styles/styledcomponents/component";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { withRouter } from "react-router-dom";

import request from "../../services/requestServer.js";
import { API_END_POINT } from "../../config/constants.js";
import { dispatch } from "../../store/index.js";

class Tests extends Component {
  state = {
    testsActive: null
  };
  componentDidMount() {
    this.getPublicTests();
  }
  getPublicTests = async () => {
    try {
      const result = await request.get(API_END_POINT + "/api/publicTests");
      console.log("PublicTests", result.data);
      result.data.map(t => {
        console.log("11", t);
      });
      dispatch("UPDATA_PUBLIC_TEST", result.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  СhoiceTest = test => {
    const choicetest = this.state.testsActive;

    if (choicetest && choicetest._id === test._id) {
      this.setState({ testsActive: null });
    } else {
      this.setState({ testsActive: test });
    }
  };

  render() {
    const { publicTests } = this.props.state;
    return (
      <BgTests>
        <h1>List public tests</h1>
        <TableList
          testsActive={this.state.testsActive}
          СhoiceTest={this.СhoiceTest}
          tests={publicTests}
        />
        {this.state.testsActive && (
          <Button width="300px" margin="0 auto" light>
            Pass the test
          </Button>
        )}
      </BgTests>
    );
  }
}

const TableList = props => {
  const { tests, testsActive, СhoiceTest } = props;
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
        {tests.map((test, index) => (
          <TableItem
            active={testsActive && testsActive._id === test._id}
            key={test._id}
            onClick={() => СhoiceTest(test)}
          >
            <td scope="row">{index + 1}</td>
            <td>{test.name}</td>
            <td>{test.tasks.length}</td>
            <td>{test.public + ""}</td>
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
  )(Tests)
);
