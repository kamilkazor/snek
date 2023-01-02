import { Difficulty } from "../types";

const difficulties: Difficulty[] = [
  { name: "STRATEGIST", speed: 800, scoreModifier: 0.5 },
  { name: "EASY", speed: 400, scoreModifier: 1 },
  { name: "NORMAL", speed: 200, scoreModifier: 2 },
  { name: "HARD", speed: 100, scoreModifier: 4 },
  { name: "MADMAN", speed: 50, scoreModifier: 8 },
];

export default difficulties;
