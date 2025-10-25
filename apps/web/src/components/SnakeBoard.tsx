import { useRef } from "react";
import { useSnake } from "../hooks/useSnake";
import { GRID_SIZE, TILE_SIZE } from "../constants/constants";

export const SnakeBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isRunning, gameOver, paused, pauseGame, startGame, score } =
    useSnake(canvasRef);

  return (
    <div>
      <div>{score}</div>
            <button onClick={() => startGame()}>
        {gameOver || isRunning ? "Restart" : "Start"}
      </button>
      <button disabled={gameOver} onClick={() => pauseGame()}>
        {paused ? "Resume" : "Pause"}
      </button>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * TILE_SIZE}
        height={GRID_SIZE * TILE_SIZE}
        style={{
          border: "2px solid #333",
          background: "#111",
          marginTop: 10,
        }}
      />
    </div>
  );
};
