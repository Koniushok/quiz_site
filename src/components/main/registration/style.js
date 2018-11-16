import styled, { css } from "styled-components";

export const BgRegisration = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.bg};
  padding-bottom: 40px;
`;

export const FormRegistration = styled.div`
  width: 400px;
  margin: 0 auto;
`;
