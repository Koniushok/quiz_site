import styled, { css } from "styled-components";

//background component
export const BgDiv = styled.div`
  min-height: ${props => props.height};
  background-color: ${props => props.bgColor};
  background-image: ${props => props.img && `url(${props.img})`};
  background-repeat: ${props => props.repeat && "repeat"};
  background-repeat: ${props => props.norepeat && "no-repeat"};
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: ${props => props.wrap || "wrap"};
  justify-content: ${props => props.Xalign || "flex-start"};
  align-items: ${props => props.Yalign || "flex-start"};
`;

export const Text = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.size};
  font-family: ${props => props.family};
  font-weight: ${props => props.weight};
`;
