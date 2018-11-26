import styled from "styled-components";

export const Bg = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const QuestionText = styled.p`
  font-weight: bold;
  font-size: 30px;
`;

export const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: solid 1px black;
  padding: 20px;

  background: ${props => (props.correctly ? "#01ff0166" : "#ff000057")};
  background: ${props => props.correctly === null && "#fff"};
`;

export const Title = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 60px;
`;

export const Answer = styled.div`
  padding: 0 40px;
  font-weight: bold;
  font-size: 20px;
  & label {
    margin-left: 20px;
  }
  & input {
    width: 15px;
    height: 15px;
  }
`;
