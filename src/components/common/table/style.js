import styled, { css } from "styled-components";

export const TableDiv = styled.div`
  width: 100%;
`;

export const Search = styled.div`
  margin-left: auto;
  margin-right: 20px;
  width: 250px;
`;

export const TableHead = styled.tr`
  & th {
    font-weight: bold;
    font-size: 22px;
  }
  & td {
    font-weight: 400;
    font-size: 20px;
  }
  :hover {
    cursor: pointer;
  }
`;

export const TableItem = styled.tr`
  background: ${props => props.active && "#c6c6c630"};
  & th {
    font-weight: bold;
    font-size: 22px;
  }
  & td {
    font-weight: 400;
    font-size: 20px;
  }
  :hover {
    cursor: pointer;
    background: #c6c6c630;
  }
`;
