import React, { useEffect, useState, useRef } from "react";

import Display from "./Display";
import Game from "./Game";
import levels from "../../GameSettings/levels";
import difficulties from "../../GameSettings/difficulties";
import Menu from "./Menu";
import styled, { ThemeProvider } from "styled-components";

const Wrapper = styled.div<{ baseWidth: number; shrinkRate: number }>`
  --shrinkRate: ${(props) => props.shrinkRate};
  width: 100%;
  max-width: ${(props) => props.baseWidth}px;
`;

const basicTheme = {
  text: "white",
  options: "red",
  gameOver: "red",
  display: "hsl(0, 0%, 4%)",
  wall: "blue",
  food: "red",
  snakeBody: "springgreen",
  snakeBodyFood: "greenyellow",
  snakeHead: "limegreen",
  snakeHeadFood: "limegreen",
};
const tapewormTheme = {
  text: "beige",
  options: "goldenrod",
  gameOver: "goldenrod",
  display: "hsl(0, 71%, 8%)",
  wall: "crimson",
  food: "goldenrod",
  snakeBody: "beige",
  snakeBodyFood: "salmon",
  snakeHead: "tan",
  snakeHeadFood: "tan",
};

const Snek = () => {
  const [game, setGame] = useState(false);
  const [flicker, setFlicker] = useState(true);
  const [difficultyIndex, setDifficultyIndex] = useState(2);
  const [levelIndex, setLevelIndex] = useState(0);

  const [alternativeTheme, setAlternativeTheme] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function getLocalBestScore(): number {
    const localBestScore = window.localStorage.getItem("BEST_SCORE");
    return localBestScore ? JSON.parse(localBestScore) : 0;
  }
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(getLocalBestScore());
  useEffect(() => {
    window.localStorage.setItem("BEST_SCORE", JSON.stringify(bestScore));
  }, [bestScore]);
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  const baseWidth = 600;
  const [shrinkRate, setShrinkRate] = useState(1);
  function updateShrink() {
    if (!wrapperRef.current) return;
    const observedRect = wrapperRef.current.getBoundingClientRect();
    setShrinkRate(observedRect.width / baseWidth);
  }
  const observer = new ResizeObserver(() => {
    updateShrink();
  });
  useEffect(() => {
    if (!wrapperRef.current) return;
    observer.observe(wrapperRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  function keydownHandler(e: KeyboardEvent) {
    e.preventDefault();
    if (e.code === "KeyF") {
      setFlicker((state) => !state);
    }
    if (e.code === "KeyT") {
      setAlternativeTheme((state) => !state);
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return (
    <ThemeProvider theme={alternativeTheme ? tapewormTheme : basicTheme}>
      <Wrapper ref={wrapperRef} shrinkRate={shrinkRate} baseWidth={baseWidth}>
        <Display flicker={flicker} score={score} bestScore={bestScore}>
          {!game && (
            <Menu
              difficulties={difficulties}
              difficultyIndex={difficultyIndex}
              setDifficultyIndex={setDifficultyIndex}
              levels={levels}
              levelIndex={levelIndex}
              setLevelIndex={setLevelIndex}
              startGame={() => {
                setGame(true);
              }}
            />
          )}
          {game && (
            <Game
              difficulty={difficulties[difficultyIndex]}
              level={levels[levelIndex]}
              onGameOver={() => {
                setGame(false);
              }}
              setScore={setScore}
            />
          )}
        </Display>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Snek;
