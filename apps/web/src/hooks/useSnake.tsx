import { useEffect, useRef, useState, type RefObject } from "react";
import {
  DIRECTIONS_MAP,
  GRID_SIZE,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  SPEED,
  TILE_SIZE,
} from "../constants/constants";
import type { CoOrdinateObject, Direction } from "../types/types";
import { getRandomFood } from "../utils/utils";

export const useSnake = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  const snakeRef = useRef<CoOrdinateObject[]>(INITIAL_SNAKE);
  const directionRef = useRef<CoOrdinateObject>(
    DIRECTIONS_MAP[INITIAL_DIRECTION]
  );
  const foodRef = useRef<CoOrdinateObject>(getRandomFood(snakeRef.current));
  const lastMoveRef = useRef<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  //   calculates the next cell to hop on
  const moveSnake = () => {
    const newSnake = [...snakeRef.current];
    const head = newSnake[0];
    const newHead = {
      x: (head.x + directionRef.current.x + GRID_SIZE) % GRID_SIZE,
      y: (head.y + directionRef.current.y + GRID_SIZE) % GRID_SIZE,
    };

    if (newSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      setGameOver(true);
      setIsRunning(false);
      return;
    }

    newSnake.unshift(newHead);

    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      setScore((prev) => prev + 1);
      foodRef.current = getRandomFood(newSnake);
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
  };

  //   draws the snake and food on canvas
  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, GRID_SIZE * TILE_SIZE, GRID_SIZE * TILE_SIZE);

      const food = foodRef.current;
      ctx.fillStyle = "tomato";
      ctx.fillRect(
        food.x * TILE_SIZE,
        food.y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
      ctx.fillStyle = "limegreen";
      for (const seg of snakeRef.current) {
        ctx.fillRect(
          seg.x * TILE_SIZE,
          seg.y * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  };

  useEffect(() => {
    if (!isRunning) return;
    let animationId: number;
    // continuous animation for snake
    const loop = (time: number) => {
      if (gameOver) return;
      if (time - lastMoveRef.current > SPEED) {
        moveSnake();
        lastMoveRef.current = time;
      }
      draw();
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationId);
  }, [isRunning, gameOver]);

  useEffect(() => {
    // listen to key press
    const handleKeyDown = (e: KeyboardEvent) => {
      const { x, y } = directionRef.current;
      let direction: keyof Direction = "d";
      switch (e.key) {
        case "ArrowUp":
          if (y === 0) direction = "u";
          break;
        case "ArrowDown":
          if (y === 0) direction = "d";
          break;
        case "ArrowLeft":
          if (x === 0) direction = "l";
          break;
        case "ArrowRight":
          if (x === 0) direction = "r";
          break;
        default:
          break;
      }
      directionRef.current = DIRECTIONS_MAP[direction];
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleStart = () => {
    snakeRef.current = INITIAL_SNAKE;
    directionRef.current = DIRECTIONS_MAP[INITIAL_DIRECTION];
    foodRef.current = getRandomFood(snakeRef.current);
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  return { score, gameOver, startGame: handleStart };
};
