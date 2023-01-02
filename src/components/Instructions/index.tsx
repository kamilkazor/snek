import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  color: white;
  background-color: black;
  margin-top: 50px;
  border-radius: 15px;
  border: 10px double gray;
  box-sizing: border-box;
  opacity: 0.5;
  padding: 25px;
  font-size: 1rem;
  font-family: "Prosto One";
`;

const Instructions = () => {
  return (
    <Wrapper>
      <p>MOVEMENT - ARROW KEYS / A, W, S, D</p>
      <p>PLAY / PAUSE - SPACEBAR</p>
      <p>ON / OFF SCREEN FLICKERING - F</p>
      <p>NEW GAME - N</p>
      <p>CHANGE GAME THEME - T</p>
    </Wrapper>
  );
};

export default Instructions;
