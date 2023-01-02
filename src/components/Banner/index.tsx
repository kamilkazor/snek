import React from "react";
import styled from "styled-components";
import logo from "../../assets/sneklogo.png";

const Logo = styled.img`
  width: 100%;
  max-width: 600px;
  margin-bottom: 50px;
`;

const Banner = () => {
  return <Logo src={logo} />;
};

export default Banner;
