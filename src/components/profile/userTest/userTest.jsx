import React, { Component } from "react";
import { BgUserTest, TableItem, BgTable } from "./style";
import { Button } from "../../../assets/styles/styledcomponents/component.js";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import request from "../../../services/requestServer.js";
import { API_END_POINT } from "../../../config/constants.js";
import { dispatch } from "../../../store/index.js";
import TestTable from "./testTable";

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
          <BgTable>
            <h2>{this.state.testsActive.name + "(List tasks):"}</h2>
            <TableTask
              tasks={this.state.testsActive.tasks}
              taskActive={this.state.taskActive}
              Сhoicetask={this.СhoiceTask}
            />
            <div>
              <Button margin="0 10px 0 0" light>
                Add
              </Button>
              <Button light>Remove</Button>
            </div>
          </BgTable>
        )}
      </BgUserTest>
    );
  }
}

const TableTask = props => {
  const { tasks, taskActive, Сhoicetask } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>answer1</th>
          <th>answer2</th>
          <th>answer3</th>
          <th>answer4</th>
          <th>correctAnswer</th>
          <th>question</th>
        </tr>
      </thead>
      <tbody>
        {tasks &&
          tasks.map((task, index) => (
            <TableItem
              key={task._id}
              onClick={() => Сhoicetask(task)}
              active={taskActive && taskActive._id === task._id}
            >
              <td scope="row">{index + 1}</td>
              <td>{task.answer1}</td>
              <td>{task.answer2}</td>
              <td>{task.answer3}</td>
              <td>{task.answer4}</td>
              <td>{task.correctAnswer}</td>
              <td>{task.question}</td>
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
  )(UserTest)
);