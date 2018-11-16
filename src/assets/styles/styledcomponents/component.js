import styled, { css } from "styled-components";

const StButton = css`
  font-size: 20px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  background: black;
  border: solid 2px #fff;
  padding: 10px 40px;
  margin: ${props => props.margin};

  &:hover {
    border: solid 2px #d7ad1b;
    color: #d7ad1b;
  }

  ${props =>
    props.light &&
    css`
      border: none;
      background: #393d41;
      &:hover {
        border: none;
        color: #fff;
        background: #eebd00;
      }
    `};
`;

export const Button = styled.button`
  ${StButton};
`;

export const BtLink = styled.a`
  ${StButton};
`;

export const BtBlock = styled.a`
  ${StButton};
  display: inline-block;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
`;
