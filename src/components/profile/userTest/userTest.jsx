import React, { Component } from "react";
import { BgUserTest, TableItem, BgTable } from "./style";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TestTable from "./testTable";
import TaskTable from "./taskTable";
import { TextInf } from "../../../assets/styles/styledcomponents/component";

class UserTest extends Component {
  state = {
    testsActive: null,
    taskActive: null,
    taskFormActive: false,
    taskEdit: false
  };

  onTaskForm = () => {
    const active = !this.state.taskFormActive;
    this.setState({ taskFormActive: active, taskEdit: false });
  };
  onTaskFormEdit = () => {
    this.setState({ taskFormActive: true, taskEdit: true });
  };

  СhoiceTest = test => {
    this.setState({ taskFormActive: false, taskEdit: false });
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
    const { myTests } = this.props.state;
    if (!myTests) return null;
    return (
      <BgUserTest>
        <TestTable
          testsActive={this.state.testsActive}
          СhoiceTest={this.СhoiceTest}
        />
        {this.state.testsActive ? (
          <TaskTable
            onForm={this.onTaskForm}
            onFormEdit={this.onTaskFormEdit}
            formActive={this.state.taskFormActive}
            edit={this.state.taskEdit}
            testsActive={this.state.testsActive}
            taskActive={this.state.taskActive}
            СhoiceTask={this.СhoiceTask}
          />
        ) : (
          <TextInf>select test</TextInf>
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
