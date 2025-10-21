import { GRID_SIZE } from "../constants/constants";

export function getRandomFood(unoccupiedCells: Set<string>) {
  let idx = Math.floor(Math.random() * unoccupiedCells.size);
  let cnt = 0;

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      // doing this to get random and not predictable next cell for food
      if (unoccupiedCells.has(toUnoccupiedCellId(i, j))) {
        cnt++;
      }
      if (cnt === idx) {
        return { x: i, y: j };
      }
    }
  }
  return { x: 0, y: 0 };
}

export const toUnoccupiedCellId = (x: number, y: number) => `${x}.${y}`;
