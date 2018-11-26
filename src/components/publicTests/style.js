import styled from "styled-components";

export const BgTests = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  margin: 20px;
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
