import styled, { css } from "styled-components";

export const NavItem = styled.div`
  background: ${props => props.bg || "#9696962e"};
  margin: 8px 5px;

  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;

  :hover {
    background: ${props => props.bgHover || "#eebd00"};
    cursor: pointer;
  }

  & a,
  & a:hover {
    color: ${props => props.color || "white"};
    display: block;
    padding: 8px 7px;
  }

  ${props =>
    props.active &&
    css`
      & a {
        color: #ddbb0a;
      }
    `};
`;

export const LogoText = styled.p`
  color: ${props => props.color || "white"};
  font-weight: bold;
  font-size: ${props => props.size || "24px"};
  margin: ${props => props.margin || "8px 5px"};
`;

export const HeaderDiv = styled.div`
  background: ${props => props.bg};
  color: ${props => props.color || "#e4e4e4"};
  min-height: ${props => props.minHeight || "72px"};
`;
