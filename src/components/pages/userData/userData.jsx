import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BgUserData } from "./style";
import { Title, TextInf, TitelInf } from "../profile/style";
import FomrUser from "../../common/form/formUser";
import { Button } from "../../common/styledcomponents/component";

class UserData extends Component {
  state = {
    editing: false
  };

  onEditing = () => {
    const editing = !this.state.editing;
    this.setState({ editing: editing });
  };

  render() {
    const { user } = this.props.state;
    const account = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      login: user.login
    };
    return (
      <BgUserData>
        <Title>Profile data</Title>
        {this.state.editing ? (
          <FomrUser account={account} />
        ) : (
          <React.Fragment>
            <LabelInf title="Email" value={user.email} />
            <LabelInf title="Login" value={user.login} />
            <LabelInf title="Name" value={user.name} />
            <LabelInf title="Surname" value={user.surname} />
          </React.Fragment>
        )}
        <Button
          width="150px"
          margin="0 0 20px 0"
          light
          onClick={this.onEditing}
        >
          {this.state.editing ? "cancel" : "editing"}
        </Button>
      </BgUserData>
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
  )(UserData)
);
