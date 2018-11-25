import React, { Component } from "react";
import { BgUserTest, TableItem, BgTable } from "./style";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TestTable from "./testTable";
import TaskTable from "./taskTable";

class UserTest extends Component {
  state = {
    testsActive: null,
    taskActive: null
  };

  СhoiceTest = test => {
    if (!test) {
      this.setState({ testsActive: null });
      return;
    }
    const choicetest = this.state.testsActive;

    if (choicetest && choicetest._id === test._id) {
      this.setState({ testsActive: null, taskActive: null });
    } else {
      this.setState({ testsActive: test });
    }
    console.log(test);
  };

  СhoiceTask = task => {
    if (!task) {
      this.setState({ taskActive: null });
      return;
    }
    const choicetask = this.state.taskActive;

    if (choicetask && choicetask._id === task._id) {
      this.setState({ taskActive: null });
    } else {
      this.setState({ taskActive: task });
    }
  };

  render() {
    const { user } = this.props.state;

    return (
      <BgUserTest>
        <TestTable
          testsActive={this.state.testsActive}
          СhoiceTest={this.СhoiceTest}
        />
        {this.state.testsActive && (
          <TaskTable
            testsActive={this.state.testsActive}
            taskActive={this.state.taskActive}
            СhoiceTask={this.СhoiceTask}
          />
        )}
      </BgUserTest>
    );
  }
}

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(UserTest)
);
