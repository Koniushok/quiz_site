import styled from "styled-components";

export const BgNav = styled.div`
  background: #8f8f8f24;
  min-width: 170px;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  border-bottom: 2px #0000001c solid;
  margin-bottom: 10px;
`;

export const NavItem = styled.div`
  padding: 5px 10px;
  font-weight: bold;

  font-size: 20px;
  :hover {
    background: #00000047;
    cursor: pointer;
  }
  a &,
  &:hover {
    color: black;
    color: ${props => props.active && "#ddbb0a"};
  }
`;
