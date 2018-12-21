import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Bg, BlockStat } from "./style";
import { Title, TextInf, TitelInf } from "../profile/style";

import request from "../../../services/requestServer";
import { API_END_POINT } from "../../../config/constants";
import { dispatch } from "../../../store/index";
class Statistics extends Component {
  componentDidMount() {
    this.getPublicTests();
  }
  getPublicTests = async () => {
    try {
      const result = await request.get(API_END_POINT + "/api/statistics");
      dispatch("UPDATA_STATICTICS", result.data);
    } catch (ex) {
      console.error(ex);
    }
  };
  render() {
    const { statistics } = this.props.state;
    return (
      <Bg>
        <Title>Statistics</Title>
        <BlockStat className="shadow p-3 mb-5 bg-white rounded">
          <h1>Public tests</h1>
          <LabelInf title="amount" value={statistics.publicTest} />
          <LabelInf title="correct answers" value={statistics.publicСorrect} />
          <LabelInf
            title="number of all questions"
            value={statistics.publicQuestions}
          />
          <LabelInf
            title="percent correct"
            value={
              statistics.publicСorrect
                ? (
                    statistics.publicСorrect / statistics.publicQuestions
                  ).toFixed(4) *
                    100 +
                  "%"
                : "0%"
            }
          />
        </BlockStat>
      </Bg>
    );
  }
}
const LabelInf = props => {
  return (
    <TextInf>
      <TitelInf>{props.title + ": "}</TitelInf> {props.value}
    </TextInf>
  );
};

export default withRouter(
  connect(
    state => ({ state: state }),
    dispatch => ({})
  )(Statistics)
);
