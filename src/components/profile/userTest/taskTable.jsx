import React, { Component } from "react";
import { TableItem, BgTable, TableControl } from "./style";
import { Button } from "../../../assets/styles/styledcomponents/component.js";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UserTest extends Component {
  state = {
    taskName: {}
  };

  render() {
    const { user } = this.props.state;

    return (
      <BgTable>
        <h2>{this.props.testsActive.name + "(List tasks):"}</h2>
        <TableTask
          tasks={this.props.testsActive.tasks}
          taskActive={this.props.taskActive}
          Сhoicetask={this.props.СhoiceTask}
        />
        <TableControl>
          {this.props.taskActive && <Button light>Remove</Button>}
          <Button margin="0 10px 0 0" light>
            Add
          </Button>
        </TableControl>
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

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(UserTest)
);
