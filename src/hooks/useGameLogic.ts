import React, { useEffect, useRef } from "react";
import {
  GameMap,
  GameMapField,
  SnakeField,
  Snake,
  GameMapFieldValue,
  Dirrection,
  Level,
  Difficulty,
} from "../types";

import useFood from "./useFood";

function useGameLogic(
  level: Level,
  difficulty: Difficulty,
  onGameOver: () => void,
  setScore: React.Dispatch<React.SetStateAction<number>>
) {
  const gameMap = useRef<GameMap>(createMapDeepCopy(level.gameMap));
  const snake = useRef<Snake>(createSnakeDeepCopy(level.snake));
  const dirrection = useRef<Dirrection>(level.dirrection);
  const { foodList, updateFood, eatFood } = useFood(gameMap);

  useEffect(() => {
    initNewGame();
  }, [level]);

  function initNewGame() {
    gameMap.current = createMapDeepCopy(level.gameMap);
    snake.current = createSnakeDeepCopy(level.snake);
    dirrection.current = level.dirrection;
    foodList.current = [];
    setScore(0);
    initSnake();
  }

  function addScore() {
    const scoreModifier = level.scoreModifier * difficulty.scoreModifier;
    setScore((score) => score + 10 * scoreModifier);
  }

  function updateGame() {
    checkNextField(getNextField(dirrection.current));
    updateFood();
  }

  function changeDirrection(newDirrection: Dirrection) {
    const nextField = getNextField(newDirrection);
    const behindHead = snake.current[1];
    if (
      snake.current.length > 1 &&
      nextField.row === behindHead.row &&
      nextField.col === behindHead.col
    ) {
      return;
    }
    dirrection.current = newDirrection;
  }

  function createMapDeepCopy(map: GameMap) {
    const copiedMap = [];
    for (let row = 0; row < map.length; row++) {
      copiedMap.push([...map[row]]);
    }
    return copiedMap as GameMap;
  }
  function createSnakeDeepCopy(snake: Snake) {
    const copiedSnake: Snake = [];
    snake.forEach((part) => {
      copiedSnake.push({ ...part });
    });
    return copiedSnake;
  }

  function updateMapField(updatedField: GameMapField) {
    gameMap.current[updatedField.row][updatedField.col] = updatedField.value;
  }

  function getNextField(dirrection: Dirrection): GameMapField {
    const currentHead = snake.current[0];
    const rows = gameMap.current.length - 1;
    const cols = gameMap.current[0].length - 1;
    let nextRow: number;
    let nextCol: number;
    let nextValue: GameMapFieldValue;
    switch (dirrection) {
      case "RIGHT":
        nextRow = currentHead.row;
        nextCol = currentHead.col + 1 > cols ? 0 : currentHead.col + 1;
        break;
      case "LEFT":
        nextRow = currentHead.row;
        nextCol = currentHead.col - 1 < 0 ? cols : currentHead.col - 1;
        break;
      case "UP":
        nextRow = currentHead.row - 1 < 0 ? rows : currentHead.row - 1;
        nextCol = currentHead.col;
        break;
      case "DOWN":
        nextRow = currentHead.row + 1 > rows ? 0 : currentHead.row + 1;
        nextCol = currentHead.col;
        break;

      default:
        nextRow = currentHead.row;
        nextCol = currentHead.col;
        break;
    }
    nextValue = gameMap.current[nextRow][nextCol];
    return {
      row: nextRow,
      col: nextCol,
      value: nextValue,
    };
  }
  function checkNextField(nextField: GameMapField) {
    switch (nextField.value) {
      case 1:
        onGameOver();
        break;
      case "S":
        const currentTail = snake.current[snake.current.length - 1];
        currentTail.row !== nextField.row || currentTail.col !== nextField.col
          ? onGameOver()
          : updateSnake({
              row: nextField.row,
              col: nextField.col,
              value: "SH",
            });
        break;
      case "S-1F":
        onGameOver();
        break;
      case "F":
        updateSnake({
          row: nextField.row,
          col: nextField.col,
          value: "SH-1F",
        });
        eatFood(nextField.row, nextField.col);
        addScore();
        break;

      default:
        updateSnake({
          row: nextField.row,
          col: nextField.col,
          value: "SH",
        });
        break;
    }
  }

  function updateSnake(newHead: SnakeField) {
    const currentHead = snake.current[0];
    currentHead.value === "SH-1F"
      ? (currentHead.value = "S-1F")
      : (currentHead.value = "S");
    updateMapField(currentHead);

    const currentTail = snake.current[snake.current.length - 1];
    switch (currentTail.value) {
      case "S-1F":
        currentTail.value = "S";
        updateMapField(currentTail);
        break;
      case "S":
        updateMapField({
          row: currentTail.row,
          col: currentTail.col,
          value: 0,
        });
        snake.current.pop();
        break;

      default:
        break;
    }

    snake.current.unshift(newHead);
    updateMapField(newHead);
  }
  function initSnake() {
    snake.current.forEach((field) => {
      gameMap.current[field.row][field.col] = field.value;
    });
  }

  return { gameMap, updateGame, changeDirrection };
}

export default useGameLogic;
