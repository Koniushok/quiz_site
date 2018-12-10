import styled from "styled-components";

export const BgTests = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const TableItem = styled.tr`
  background: ${props => props.active && "#d1d5a6"};
  :hover {
    background: #7575755e;
    cursor: pointer;
  }
`;

export const Tdata = styled.td`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.active && "#75e875"};
`;

export const Divflex = styled.div`
  display: flex;
  justify-content: space-between;
`;
