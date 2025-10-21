import { GRID_SIZE } from "../constants/constants";
import type { CoOrdinateObject } from "../types/types";

export const board = Array.from({ length: GRID_SIZE - 1 }, (_, i) => i);

// Need to fix this logic
export function getRandomFood(snake: CoOrdinateObject[]) {
  const snakeX = snake.map((x) => x.x);
  const snakeY = snake.map((y) => y.y);

  const getUnoccupiedIndices = () => {
    return {
      X: board.filter((val) => !snakeX.includes(val)),
      Y: board.filter((val) => !snakeY.includes(val)),
    };
  };
  const { X, Y } = getUnoccupiedIndices();

  return {
    x: X[Math.floor(Math.random() * X.length - 1)],
    y: Y[Math.floor(Math.random() * Y.length - 1)],
  };
}
