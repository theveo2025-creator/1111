import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Trophy, Zap, Briefcase } from 'lucide-react';

interface GameState {
  score: number;
  livesDisrupted: number;
  gameOver: boolean;
  paused: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Entity extends Point {
  type: 'head' | 'body' | 'worker' | 'hr' | 'coffee' | 'pivot';
  dx?: number;
  dy?: number;
}

const GRID_SIZE = 24;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MIN_SPEED = 50;

const SYNERGY_PHRASES = ["Leveraging synergies!", "Circle back!", "Scalable?", "Paradigm shift!", "Value add!"];

const CSuiteSurgeGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    livesDisrupted: 0,
    gameOver: false,
    paused: false,
  });

  const snake = useRef<Point[]>([{ x: 10, y: 10 }]);
  const direction = useRef<Point>({ x: 1, y: 0 });
  const nextDirection = useRef<Point>({ x: 1, y: 0 });
  const food = useRef<Point[]>([]);
  const obstacles = useRef<Entity[]>([]);
  const powerups = useRef<Entity[]>([]);
  const particles = useRef<{x: number, y: number, text?: string, color: string, life: number, dx: number, dy: number}[]>([]);
  const scoreRef = useRef(0);
  const speed = useRef(150);
  const growthPending = useRef(0);
  const ghostMode = useRef(0);
  const giantMode = useRef(0);
  const lastUpdate = useRef(0);
  const animationFrameId = useRef<number>(0);

  const initGame = useCallback(() => {
    snake.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    direction.current = { x: 1, y: 0 };
    nextDirection.current = { x: 1, y: 0 };
    food.current = [];
    obstacles.current = [];
    powerups.current = [];
    particles.current = [];
    speed.current = 150;
    scoreRef.current = 0;
    setGameState({ score: 0, livesDisrupted: 0, gameOver: false, paused: false });
    spawnFood();
    spawnHR();
  }, []);

  const spawnFood = () => {
    while (food.current.length < 3) {
      const x = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE));
      const y = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE));
      if (!snake.current.some(s => s.x === x && s.y === y)) food.current.push({ x, y });
    }
  };

  const spawnHR = () => {
    const targetHR = 3 + Math.floor(scoreRef.current / 1000);
    if (obstacles.current.length < targetHR) {
      obstacles.current.push({ 
        x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)), 
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)), 
        type: 'hr', dx: 1, dy: 1 
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentDir = direction.current;
      if (['ArrowUp', 'w'].includes(e.key.toLowerCase()) && currentDir.y === 0) nextDirection.current = { x: 0, y: -1 };
      else if (['ArrowDown', 's'].includes(e.key.toLowerCase()) && currentDir.y === 0) nextDirection.current = { x: 0, y: 1 };
      else if (['ArrowLeft', 'a'].includes(e.key.toLowerCase()) && currentDir.x === 0) nextDirection.current = { x: -1, y: 0 };
      else if (['ArrowRight', 'd'].includes(e.key.toLowerCase()) && currentDir.x === 0) nextDirection.current = { x: 1, y: 0 };
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    initGame();
    const loop = (timestamp: number) => {
      if (!gameState.gameOver && !gameState.paused) {
        if (timestamp - lastUpdate.current > speed.current) {
          update();
          lastUpdate.current = timestamp;
        }
        render();
        animationFrameId.current = requestAnimationFrame(loop);
      }
    };
    animationFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameState.gameOver, gameState.paused]);

  const update = () => {
    direction.current = nextDirection.current;
    const head = { x: snake.current[0].x + direction.current.x, y: snake.current[0].y + direction.current.y };

    if (head.x < 0 || head.x >= CANVAS_WIDTH / GRID_SIZE || head.y < 0 || head.y >= CANVAS_HEIGHT / GRID_SIZE) {
      setGameState(p => ({ ...p, gameOver: true })); return;
    }

    if (ghostMode.current <= 0 && snake.current.some(s => s.x === head.x && s.y === head.y)) {
      setGameState(p => ({ ...p, gameOver: true })); return;
    }

    const foodIdx = food.current.findIndex(f => f.x === head.x && f.y === head.y);
    if (foodIdx !== -1) {
      food.current.splice(foodIdx, 1);
      growthPending.current++;
      scoreRef.current += 100;
      setGameState(p => ({ ...p, score: p.score + 100, livesDisrupted: p.livesDisrupted + 1 }));
      spawnFood();
      if (speed.current > MIN_SPEED) speed.current -= 2;
    }

    snake.current.unshift(head);
    if (growthPending.current > 0) growthPending.current--;
    else snake.current.pop();

    if (ghostMode.current > 0) ghostMode.current--;
  };

  const render = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = `${GRID_SIZE}px serif`;
    food.current.forEach(f => ctx.fillText("🏃", f.x * GRID_SIZE, (f.y + 1) * GRID_SIZE));
    snake.current.forEach((s, i) => ctx.fillText(i === 0 ? "🤑" : "👔", s.x * GRID_SIZE, (s.y + 1) * GRID_SIZE));
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-black border-4 border-degen-green shadow-[0_0_40px_rgba(0,255,0,0.3)] max-w-4xl w-full flex flex-col">
        <div className="bg-degen-green text-black px-4 py-2 flex justify-between items-center font-black">
          <span>C-SUITE SURGE: HOSTILE TAKEOVER</span>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="bg-gray-900 p-2 text-white font-mono flex justify-around">
          <span>CAPITAL: ${gameState.score}</span>
          <span>DISRUPTED: {gameState.livesDisrupted}</span>
        </div>
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full bg-black" />
        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-6xl font-black text-red-600 mb-4">LIQUIDATED</h2>
            <button onClick={initGame} className="bg-degen-green text-black px-6 py-3 font-black">RESTRUCTURE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSuiteSurgeGame;