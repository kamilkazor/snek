// Declaring types for map fields
// B - body
// B-1F - body with 1 food
// H - head
// H-1F - head with 1 food
type SnakeValue = "S" | "S-1F" | "SH" | "SH-1F";

// F - normal food
type FoodValue = "F";

// 0 - empty
// 1 - wall
type LevelMapFieldValue = 0 | 1;
export type GameMapFieldValue = LevelMapFieldValue | SnakeValue | FoodValue;

type Field<T> = {
  row: number;
  col: number;
  value: T;
};

export type GameMapField = Field<GameMapFieldValue>;
export type SnakeField = Field<SnakeValue>;
export type FoodField = Field<FoodValue>;

export type Snake = SnakeField[];

// Map shoud be made of 18 rows and 18 columns;
type Row<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];
type Map<T> = [
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>
];

type LevelMap = Map<LevelMapFieldValue>;
export type GameMap = Map<GameMapFieldVield>;

export type Level = {
  name: string;
  gameMap: LevelMap;
  snake: Snake;
  dirrection: Dirrection;
  scoreModifier: number;
};
export type Difficulty = {
  name: string;
  speed: number;
  scoreModifier: number;
};

export type Dirrection = "LEFT" | "RIGHT" | "UP" | "DOWN";
