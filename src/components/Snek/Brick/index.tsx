import React from "react";
import styled, { keyframes, css } from "styled-components";
import { GameMapFieldValue } from "../../../types";

const pulseAnim = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  51% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`;

const animationMixin = css`
  animation: ${pulseAnim} 1000ms linear infinite;
`;

const StyledBrick = styled.div<{ color?: string; anim: boolean }>`
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: calc(3px * var(--shrinkRate));
  ${(props) => props.anim && animationMixin}
  box-shadow: 0 0 calc(3px * var(--shrinkRate))
    ${(props) => (props.color ? props.theme[props.color] : "none")};
  background-color: ${(props) =>
    props.color ? props.theme[props.color] : "none"};
`;

interface Props {
  value: GameMapFieldValue;
}

const Brick: React.FC<Props> = (props) => {
  let anim = false;
  let color;
  switch (props.value) {
    case 1:
      color = "wall";
      break;
    case "S":
      color = "snakeBody";
      break;
    case "S-1F":
      color = "snakeBodyFood";
      break;
    case "SH":
      color = "snakeHead";
      break;
    case "SH-1F":
      color = "snakeHeadFood";
      break;
    case "F":
      anim = true;
      color = "food";
      break;

    default:
      break;
  }
  return <StyledBrick color={color} anim={anim} />;
};

export default Brick;
