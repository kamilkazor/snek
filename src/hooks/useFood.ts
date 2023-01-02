import React, { useRef } from "react";
import { FoodField, GameMapField, GameMap } from "../types";

const useFood = (gameMap: React.MutableRefObject<GameMap>) => {
  const foodList = useRef<FoodField[]>([]);

  function updateMapField(updatedField: GameMapField) {
    gameMap.current[updatedField.row][updatedField.col] = updatedField.value;
  }

  function getEmptyFields() {
    const emptyFields: GameMapField[] = [];
    gameMap.current.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (gameMap.current[rowIndex][colIndex] === 0)
          emptyFields.push({
            row: rowIndex,
            col: colIndex,
            value: 0,
          });
      });
    });
    return emptyFields;
  }
  function getRandomFields(amount: number) {
    const emptyFields = getEmptyFields();
    const randomFields = [];
    for (let i = 0; i < amount && emptyFields.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * emptyFields.length);
      const randomField = emptyFields.splice(randomIndex, 1);
      randomFields.push(...randomField);
    }
    return randomFields;
  }
  function createFood(amount: number = 1) {
    const randomFields = getRandomFields(amount);
    for (let field of randomFields) {
      const newFood: FoodField = {
        row: field.row,
        col: field.col,
        value: "F",
      };
      foodList.current.push(newFood);
      updateMapField(newFood);
    }
  }

  function updateFood() {
    if (foodList.current.length === 0) {
      createFood();
    }
  }

  function eatFood(row: number, col: number) {
    foodList.current = foodList.current.filter((food) => {
      return food.row !== row || food.col !== col;
    });
  }

  return { foodList, updateFood, eatFood };
};

export default useFood;
