import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { TableItem, BgTable, TableControl } from "./style";
import { Button } from "../../common/styledcomponents/component";
import FormTask from "../../common/form/formTask";
import request from "../../../services/requestServer";
import { API_END_POINT } from "../../../config/constants";
import { dispatch } from "../../../store/index";

class UserTest extends Component {
  state = {
    taskName: {}
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
      dispatch("UPDATA_TEST", result.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  render() {
    const { user } = this.props.state;
    return (
      <BgTable>
        {this.props.formActive ? (
          <React.Fragment>
            <FormTask
              test={this.props.testsActive}
              edit={this.props.edit}
              task={this.props.edit ? this.props.taskActive : null}
            />
            <Button margin="0 10px 0 0" light onClick={this.props.onForm}>
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
              <Button margin="0 10px 0 0" light onClick={this.props.onForm}>
                Add
              </Button>
              {this.props.taskActive && (
                <React.Fragment>
                  <Button light onClick={this.props.onFormEdit}>
                    Editing
                  </Button>
                  <Button light onClick={this.handleDelete}>
                    Remove
                  </Button>
                </React.Fragment>
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
              <td>{index + 1}</td>
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
    if ("" + t._id === "" + id) {
      index = i;
    }
    return null;
  });
  return index;
};

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(UserTest)
);
