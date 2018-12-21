import styled from "styled-components";

export const BgUserTest = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;

  & th {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const BgTable = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid black;
  padding-bottom: 20px;
  & h2 {
    font-weight: bold;
  }
`;

export const TableItem = styled.tr`
  & td {
    font-size: 18px;
  }
  background: ${props => props.active && "#d1d5a6"};
  :hover {
    background: #7575755e;
    cursor: pointer;
  }
`;

export const TableControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TableForm = styled.form``;
