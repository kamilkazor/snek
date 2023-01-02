import React from "react";
import styled, { css, keyframes } from "styled-components";

const DisplayWrapper = styled.div`
  width: 100%;
  background-color: #050505;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  user-select: none;
  color: ${(props) => props.theme.text};
  font-family: "Silkscreen", monospace;
  box-shadow: 0 0 8px hsla(0, 0%, 100%, 0.1);
`;

const flickerAnim = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
  100% {
    opacity: 1;
  }
`;

const animationMixin = css`
  animation: ${flickerAnim} 5ms linear infinite;
`;

const StyledDisplay = styled.div<{ flicker: boolean }>`
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.display};
  display: flex;
  flex-direction: column;
  padding: 1%;
  box-sizing: border-box;
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
  ${(props) => props.flicker && animationMixin}
`;

const ScoreBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: calc(1.3rem * var(--shrinkRate));
  margin-bottom: calc(5px * var(--shrinkRate));
`;

const MainScreen = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;

interface Props {
  children: React.ReactNode;
  flicker: boolean;
  score: number;
  bestScore: number;
}

const Display: React.FC<Props> = (props) => {
  return (
    <DisplayWrapper>
      <StyledDisplay flicker={props.flicker}>
        <ScoreBar>
          <div>SCORE: {props.score}</div>
          <div>BEST: {props.bestScore}</div>
        </ScoreBar>
        <MainScreen>{props.children}</MainScreen>
      </StyledDisplay>
    </DisplayWrapper>
  );
};

export default Display;
