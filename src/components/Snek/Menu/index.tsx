import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Difficulty, Level } from "../../../types";

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Heading = styled.h1`
  font-size: calc(5rem * var(--shrinkRate));
  margin: 0;
  font-weight: normal;
`;
const Label = styled.h2`
  font-size: calc(1.5rem * var(--shrinkRate));
  font-weight: normal;
  margin: 0;
`;
const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Switch = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(3rem * var(--shrinkRate));
  color: ${(props) => props.theme.options};
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;
const SwitchArrow = styled.span<{ left?: boolean }>`
  margin: 0 calc(2rem * var(--shrinkRate));
  font-size: calc(3.5rem * var(--shrinkRate));
  transform: ${(props) => props.left && "scaleX(-1)"};
`;
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
const PressSpace = styled.p`
  font-size: calc(2rem * var(--shrinkRate));
  animation: ${pressSpaceAnim} 1500ms linear infinite;
`;

interface Props {
  difficulties: Difficulty[];
  difficultyIndex: number;
  setDifficultyIndex: React.Dispatch<React.SetStateAction<number>>;
  levels: Level[];
  levelIndex: number;
  setLevelIndex: React.Dispatch<React.SetStateAction<number>>;
  startGame: () => void;
}

const Menu: React.FC<Props> = (props) => {
  type Focused = "DIFFICULTY" | "LEVEL";
  const [focused, setFocused] = useState<Focused>("DIFFICULTY");

  function changeOption(
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    options: any[],
    dirrection: "LEFT" | "RIGHT"
  ) {
    let newIndex: number;
    switch (dirrection) {
      case "LEFT":
        newIndex = index - 1 >= 0 ? index - 1 : options.length - 1;
        break;
      case "RIGHT":
        newIndex = index + 1 <= options.length - 1 ? index + 1 : 0;
        break;
    }
    setIndex(newIndex);
  }

  function difficultyLeftHandler() {
    changeOption(
      props.difficultyIndex,
      props.setDifficultyIndex,
      props.difficulties,
      "LEFT"
    );
  }
  function difficultyRightHandler() {
    changeOption(
      props.difficultyIndex,
      props.setDifficultyIndex,
      props.difficulties,
      "RIGHT"
    );
  }
  function levelLeftHandler() {
    changeOption(props.levelIndex, props.setLevelIndex, props.levels, "LEFT");
  }
  function levelRightHandler() {
    changeOption(props.levelIndex, props.setLevelIndex, props.levels, "RIGHT");
  }
  function switchFocused() {
    focused === "DIFFICULTY" ? setFocused("LEVEL") : setFocused("DIFFICULTY");
  }

  function keydownHandler(e: KeyboardEvent) {
    e.preventDefault();
    if (
      e.code === "ArrowDown" ||
      e.code === "ArrowUp" ||
      e.code === "KeyW" ||
      e.code === "KeyS"
    ) {
      switchFocused();
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
      if (focused === "DIFFICULTY") difficultyLeftHandler();
      if (focused === "LEVEL") levelLeftHandler();
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      if (focused === "DIFFICULTY") difficultyRightHandler();
      if (focused === "LEVEL") levelRightHandler();
    }
    if (e.code === "Space") {
      props.startGame();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [focused, props.difficultyIndex, props.levelIndex]);

  return (
    <MenuWrapper>
      <Heading>NEW GAME</Heading>
      <OptionsWrapper>
        <Label>DIFFICULTY:</Label>
        <Switch active={focused === "DIFFICULTY"}>
          <SwitchArrow left={true}>Þ</SwitchArrow>
          {props.difficulties[props.difficultyIndex].name}
          <SwitchArrow>Þ</SwitchArrow>
        </Switch>
        <Label>LEVEL:</Label>
        <Switch active={focused === "LEVEL"}>
          <SwitchArrow left={true}>Þ</SwitchArrow>
          {props.levels[props.levelIndex].name}
          <SwitchArrow>Þ</SwitchArrow>
        </Switch>
      </OptionsWrapper>
      <PressSpace>PRESS SPACE TO START</PressSpace>
    </MenuWrapper>
  );
};

export default Menu;
