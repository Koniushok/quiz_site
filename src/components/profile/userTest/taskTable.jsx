import React, { Component } from "react";
import { TableItem, BgTable, TableControl } from "./style";
import { Button } from "../../../assets/styles/styledcomponents/component.js";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormTask from "../form/formTask";
import request from "../../../services/requestServer.js";
import { API_END_POINT } from "../../../config/constants.js";
import { dispatch } from "../../../store/index.js";

class UserTest extends Component {
  state = {
    taskName: {},
    formAdd: false
  };

  onForm = () => {
    const formAdd = !this.state.formAdd;
    this.setState({ formAdd: formAdd });
  };

  handleDelete = async () => {
    try {
      const result = await request.delete(
        API_END_POINT +
          "/api/userTest/task/" +
          this.props.testsActive._id +
          "/" +
          this.props.taskActive._id
      );
      this.props.СhoiceTask(null);
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
        {this.state.formAdd ? (
          <React.Fragment>
            <FormTask test={this.props.testsActive} />
            <Button margin="0 10px 0 0" light onClick={this.onForm}>
              cancel
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>{this.props.testsActive.name + "(List tasks):"}</h2>
            <TableTask
              tasks={
                user.tests[GetIndexTest(user.tests, this.props.testsActive._id)]
                  .tasks
              }
              taskActive={this.props.taskActive}
              Сhoicetask={this.props.СhoiceTask}
            />
            <TableControl>
              <Button margin="0 10px 0 0" light onClick={this.onForm}>
                Add
              </Button>
              {this.props.taskActive && (
                <Button light onClick={this.handleDelete}>
                  Remove
                </Button>
              )}
            </TableControl>
          </React.Fragment>
        )}
      </BgTable>
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

const GetIndexTest = (tests, id) => {
  let index = -1;
  tests.map((t, i) => {
    if (t._id == id) {
      index = i;
    }
  });
  return index;
};

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(UserTest)
);
