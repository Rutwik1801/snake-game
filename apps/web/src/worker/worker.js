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

const moveSnake = ({ snake, direction, unoccupiedCells, food, score }) => {
  const newSnake = [...snake];
  const head = newSnake[0];
  const newHead = {
    x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
    y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
  };
  unoccupiedCells.delete(toUnoccupiedCellId(newHead.x, newHead.y));

  if (newSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
    return { type: "game-over" };
  }

  newSnake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score+=1;
    food = getRandomFood(unoccupiedCells);
    return {
      type: "move",
      food: getRandomFood(unoccupiedCells),
      snake: newSnake,
      unoccupiedCells: unoccupiedCells,
      score
    };
  } else {
    let tail = newSnake.pop();
    if (tail) unoccupiedCells.add(toUnoccupiedCellId(tail.x, tail.y));
  }

  return { type: "move", food, snake: newSnake, unoccupiedCells, score };
};

const getRandomFood = (unoccupiedCells) => {
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

const toUnoccupiedCellId = (x, y) => `${x}.${y}`;

self.onmessage = (e) => {
  try {
    const result = moveSnake({ ...e.data})
    if (result) self.postMessage(result)
  } catch (err) {
    console.error('[Worker error]', err)
    self.postMessage({ type: 'error', message: err.message })
  }
}
