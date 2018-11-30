import React, { Component } from "react";
import { BgTests, TableItem, Tdata, Divflex } from "./style.js";
import {
  Button,
  TextInf
} from "../../assets/styles/styledcomponents/component";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { withRouter } from "react-router-dom";

import PassTest from "../passTest/passTest.jsx";
import _ from "lodash";
import request from "../../services/requestServer.js";
import { API_END_POINT } from "../../config/constants.js";
import { dispatch } from "../../store/index.js";

class Tests extends Component {
  state = {
    testsActive: null,
    result: null,
    correctNumber: 0,
    pass: false
  };

  resultTest = (result, correctNumber) => {
    this.setState({ result: result, correctNumber: correctNumber });
  };

  componentDidMount() {
    this.getPublicTests();
  }
  upData = () => {
    this.getPublicTests();
  };
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
  onPass = () => {
    this.setState({ result: null, correctNumber: 0 });
    const p = this.state.pass;
    this.setState({ pass: !p });
  };
  render() {
    const { publicTests } = this.props.state;
    const { statistics } = this.props.state;
    return (
      <BgTests>
        {this.state.pass ? (
          <React.Fragment>
            <PassTest
              test={this.state.testsActive}
              result={this.state.result}
              correctNumber={this.state.correctNumber}
              resultTest={this.resultTest}
            />
            <Button width="300px" margin="0 auto" light onClick={this.onPass}>
              cancel
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Divflex>
              <h1>List public tests</h1>
              <Button light onClick={this.upData}>
                upDate
              </Button>
            </Divflex>
            <TableList
              testsActive={this.state.testsActive}
              СhoiceTest={this.СhoiceTest}
              tests={publicTests}
              publicPassed={statistics.publicPassed}
            />
            {this.state.testsActive ? (
              <Button width="300px" margin="0 auto" light onClick={this.onPass}>
                Pass the test
              </Button>
            ) : (
              <TextInf>select test</TextInf>
            )}
          </React.Fragment>
        )}
      </BgTests>
    );
  }
}

const TableList = props => {
  const { tests, testsActive, СhoiceTest, publicPassed } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name Test</th>
          <th>Task</th>
          <th>Public</th>
          <th>Passed</th>
          <th>number of passes</th>
          <th>percent correct</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((test, index) => (
          <TableItem
            active={testsActive && testsActive._id === test._id}
            key={test._id}
            onClick={() => СhoiceTest(test)}
          >
            <Tdata scope="row">{index + 1}</Tdata>
            <Tdata>{test.name}</Tdata>
            <Tdata>{test.tasks.length}</Tdata>
            <Tdata>{test.public + ""}</Tdata>
            <Tdata>
              {(-1 !=
                _.findIndex(publicPassed, function(item) {
                  return item == test._id;
                })) +
                ""}
            </Tdata>
            <Tdata>{test.statistics.passes + ""}</Tdata>
            <Tdata>
              {test.statistics.correctAnswer
                ? (
                    test.statistics.correctAnswer / test.statistics.questions
                  ).toFixed(4) *
                    100 +
                  "%"
                : "0%"}
            </Tdata>
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
