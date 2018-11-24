import React, { Component } from "react";
import { BgUserTest, TableItem, BgTable } from "./style";
import { Button } from "../../../assets/styles/styledcomponents/component.js";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import request from "../../../services/requestServer.js";
import { API_END_POINT } from "../../../config/constants.js";
import { dispatch } from "../../../store/index.js";

class UserTest extends Component {
  state = {
    testName: "",
    testsActive: null,
    taskActive: null
  };

  СhoiceTest = test => {
    const choicetest = this.state.testsActive;

    if (choicetest && choicetest._id === test._id) {
      this.setState({ testsActive: null, taskActive: null });
    } else {
      this.setState({ testsActive: test });
    }
    console.log(test);
  };

  СhoiceTask = task => {
    const choicetask = this.state.taskActive;

    if (choicetask && choicetask._id === task._id) {
      this.setState({ taskActive: null });
    } else {
      this.setState({ taskActive: task });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    if (input.name === "testName") this.setState({ testName: input.value });
  };

  handleTestAdd = e => {
    e.preventDefault();
    try {
      const result = await request.post(
        API_END_POINT + "/api/users/edit",
        this.state.testName
      );
      dispatch("ADD_TEST", this.state.testName);
    } catch (ex) {
      console.error(ex);
    }
  };
  render() {
    const { user } = this.props.state;

    return (
      <BgUserTest>
        <BgTable>
          <h2>List your Test:</h2>
          <TableTest
            user={user}
            testsActive={this.state.testsActive}
            СhoiceTest={this.СhoiceTest}
          />
          <div>
            <form onSubmit={this.handleTestAdd}>
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
            </form>
            <Button margin="0 10px 0 0" light>
              Add
            </Button>
            <Button light>Remove</Button>
          </div>
        </BgTable>
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

const TableTest = props => {
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
