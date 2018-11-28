import React, { Component } from "react";
import { Bg, QuestionText, QuestionBlock, Title, Answer } from "./style.js";
import { Button } from "../../assets/styles/styledcomponents/component.js";

import request from "../../services/requestServer";
import { API_END_POINT } from "../../config/constants";
import { dispatch } from "../../store/index";

class PassTest extends Component {
  handleSubmit = event => {
    event.preventDefault();
    let num = 0;
    const resultTest = this.props.test.tasks.map((task, index) => {
      //console.log("Q" + index + "==", event.target["question" + index].value);
      const res = event.target["question" + index].value == task.correctAnswer;
      if (res) num++;
      return {
        correctly: res
      };
    });
    this.postStatictic(num, this.props.test.tasks.length);
    this.props.resultTest(resultTest, num);
  };

  postStatictic = async (numCorrect, length) => {
    try {
      const result = await request.post(
        API_END_POINT + "/api/statistics/publicTest",
        { correct: numCorrect, questions: length }
      );
    } catch (ex) {
      console.error(ex);
    }
  };

  render() {
    const { test } = this.props;
    return (
      <Bg>
        <Title>{test.name}</Title>
        {this.props.result && (
          <Title>
            {this.props.correctNumber +
              " correct answers out of " +
              this.props.result.length}{" "}
          </Title>
        )}

        <form onSubmit={this.handleSubmit}>
          {test.tasks.map((task, index) => {
            return (
              <TaskItem
                key={task._id}
                task={task}
                index={index}
                correctly={
                  this.props.result ? this.props.result[index].correctly : null
                }
              />
            );
          })}
          {!this.props.result && (
            <Button margin="10px 0" light>
              result
            </Button>
          )}
        </form>
      </Bg>
    );
  }
}

const TaskItem = props => {
  const { task, index, correctly } = props;
  return (
    <QuestionBlock correctly={correctly}>
      <QuestionText>{task.question}</QuestionText>
      <Answer>
        <input
          type="radio"
          name={"question" + index}
          value="1"
          id={"ans1" + index}
        />
        <label htmlFor={"ans1" + index}>{task.answer1}</label>
      </Answer>
      <Answer>
        <input
          type="radio"
          name={"question" + index}
          value="2"
          id={"ans2" + index}
        />
        <label htmlFor={"ans2" + index}>{task.answer2}</label>
      </Answer>
      <Answer>
        <input
          type="radio"
          name={"question" + index}
          value="3"
          id={"ans3" + index}
        />
        <label htmlFor={"ans3" + index}>{task.answer3}</label>
      </Answer>
      <Answer>
        <input
          type="radio"
          name={"question" + index}
          value="4"
          id={"ans4" + index}
        />
        <label htmlFor={"ans4" + index}>{task.answer4}</label>
      </Answer>
    </QuestionBlock>
  );
};

export default PassTest;
