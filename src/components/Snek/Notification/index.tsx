import React from "react";
import styled, { keyframes } from "styled-components";

const pressSpaceAnim = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  51%{
    opacity: .5;
  }
  100%{
    opacity: .5;
  }
`;
const NotificationWindow = styled.div<{
  gameOver: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: hsla(0, 0%, 0%, 0.5);
  & h1 {
    color: ${(props) => props.gameOver && props.theme.gameOver};
    font-size: calc(4rem * var(--shrinkRate));
    margin: 0;
    font-weight: normal;
  }
  & > p {
    font-size: calc(2rem * var(--shrinkRate));
    margin: 0;
    animation: ${pressSpaceAnim} 1500ms linear infinite;
  }
`;

interface Props {
  option: "PAUSED" | "GAME OVER";
}

const Notification: React.FC<Props> = (props) => {
  return (
    <NotificationWindow gameOver={props.option === "GAME OVER"}>
      <h1>{props.option}</h1>
      <p>PRESS SPACE</p>
    </NotificationWindow>
  );
};

export default Notification;
