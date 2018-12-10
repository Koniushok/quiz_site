import styled from "styled-components";

export const FooterDiv = styled.div`
  background: ${props => props.bg};
  color: ${props => props.color || "#e4e4e4"};
  min-height: ${props => props.minHeight || "72px"};
`;
