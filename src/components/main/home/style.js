import styled from "styled-components";
import fonImg from "../../../assets/images/fon.jpg";

export const BgHome = styled.div`
  background: url(${fonImg}) no-repeat;
  background-size: cover;
  flex: auto;

  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: "Mali", cursive, Arial, sans-serif;
  padding-top: 50px;

  & p {
    font-size: 130px;
  }
  & a,
  a:hover {
    color: #fff;
  }
`;
