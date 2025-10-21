export const GRID_SIZE = 20; // number of tiles per row/column
export const TILE_SIZE = 20; // pixels per tile
export const SPEED = 120; // ms between moves
export const INITIAL_SNAKE = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION = "r";
export const DIRECTIONS_MAP = {
  d: { x: 0, y: 1 },
  u: { x: 0, y: -1 },
  l: { x: -1, y: 0 },
  r: { x: 1, y: 0 },
};
