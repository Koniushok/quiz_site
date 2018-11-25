import styled, { css } from "styled-components";

export const BgRegisration = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  background: ${props => props.bg};
  padding-bottom: 40px;
`;

export const FormRegistration = styled.form`
  width: 400px;
  margin: auto;
`;
