import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Level, Difficulty } from "../../../types";
import useInterval from "../../../hooks/useInterval";
import useGameLogic from "../../../hooks/useGameLogic";

import Brick from "../Brick";
import Notification from "../Notification";
const Board = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
`;

interface Props {
  difficulty: Difficulty;
  level: Level;
  onGameOver: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Game: React.FC<Props> = (props) => {
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(true);

  function gameOverHandler() {
    setGameOver(true);
    setRunning(false);
  }

  const gameSpeed = useRef<number>(props.difficulty.speed);
  const [bricks, setBricks] = useState<React.ReactElement[]>([]);

  const { gameMap, updateGame, changeDirrection } = useGameLogic(
    props.level,
    props.difficulty,
    gameOverHandler,
    props.setScore
  );
  useInterval(gameLoop, gameSpeed.current, running);

  function gameLoop() {
    updateGame();
    createBricks();
  }

  useEffect(() => {
    createBricks();
  }, []);

  function createBricks() {
    const bricks: React.ReactElement[] = [];
    gameMap.current.forEach((row, rowIndex) => {
      row.forEach((field, fieldIndex) => {
        bricks.push(<Brick value={field} key={`${rowIndex}-${fieldIndex}`} />);
      });
    });
    setBricks(bricks);
  }

  function keydownHandler(e: KeyboardEvent) {
    e.preventDefault();
    if (e.code === "KeyN") {
      props.onGameOver();
    }
    if (gameOver) {
      if (e.code === "Space") {
        props.onGameOver();
      }
    }
    if (!gameOver) {
      if (e.code === "Space") {
        setRunning((state) => !state);
      }
      if (running) {
        if (e.code === "ArrowDown" || e.code === "KeyS") {
          changeDirrection("DOWN");
        }
        if (e.code === "ArrowUp" || e.code === "KeyW") {
          changeDirrection("UP");
        }
        if (e.code === "ArrowLeft" || e.code === "KeyA") {
          changeDirrection("LEFT");
        }
        if (e.code === "ArrowRight" || e.code === "KeyD") {
          changeDirrection("RIGHT");
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [gameOver, running]);

  return (
    <Board>
      {bricks}
      {/* {!gameOver && !running && <Notification option="PAUSED" />} */}
      {gameOver && <Notification option="GAME OVER" />}
    </Board>
  );
};

export default Game;
