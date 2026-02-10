
import React, { useRef, useEffect, useState } from 'react';
import { html } from 'htm/react';
import { Button } from '../Button.js';

export const NeonSnake = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game Constants
  const CELL_SIZE = 20;
  const GRID_COLOR = '#1e293b';
  const SNAKE_COLOR = '#00f3ff';
  const FOOD_COLOR = '#ff0099';
  
  // Game State Refs (to avoid closure staleness in loop)
  const gameState = useRef({
    snake: [{x: 10, y: 10}],
    direction: {x: 1, y: 0},
    nextDirection: {x: 1, y: 0},
    food: {x: 15, y: 15},
    gridSize: {w: 0, h: 0},
    lastUpdate: 0,
    interval: 100 // Speed in ms
  });

  const generateFood = (w, h, snake) => {
    let newFood;
    let isColliding;
    do {
      newFood = {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h)
      };
      // eslint-disable-next-line no-loop-func
      isColliding = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isColliding);
    return newFood;
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const w = Math.floor(canvas.width / CELL_SIZE);
    const h = Math.floor(canvas.height / CELL_SIZE);
    
    gameState.current = {
      snake: [{x: Math.floor(w/2), y: Math.floor(h/2)}],
      direction: {x: 1, y: 0},
      nextDirection: {x: 1, y: 0},
      food: generateFood(w, h, [{x: Math.floor(w/2), y: Math.floor(h/2)}]),
      gridSize: {w, h},
      lastUpdate: 0,
      interval: 100
    };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      // Re-calculate grid size
      if (gameState.current.gridSize.w === 0) {
          gameState.current.gridSize.w = Math.floor(canvas.width / CELL_SIZE);
          gameState.current.gridSize.h = Math.floor(canvas.height / CELL_SIZE);
          gameState.current.food = generateFood(gameState.current.gridSize.w, gameState.current.gridSize.h, gameState.current.snake);
      }
    };

    window.addEventListener('resize', resize);
    resize();
    // Initial setup if not started
    if (!gameStarted) resetGame();

    const handleKeyDown = (e) => {
      const { direction, nextDirection } = gameState.current;
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) gameState.current.nextDirection = {x: 0, y: -1};
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) gameState.current.nextDirection = {x: 0, y: 1};
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) gameState.current.nextDirection = {x: -1, y: 0};
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) gameState.current.nextDirection = {x: 1, y: 0};
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const update = (timestamp) => {
      if (gameOver) return;

      const state = gameState.current;
      
      // Game Loop Speed Control
      if (timestamp - state.lastUpdate < state.interval) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      state.lastUpdate = timestamp;

      // Logic
      state.direction = state.nextDirection;
      const head = { 
        x: state.snake[0].x + state.direction.x, 
        y: state.snake[0].y + state.direction.y 
      };

      // Collision with walls
      if (head.x < 0 || head.x >= state.gridSize.w || head.y < 0 || head.y >= state.gridSize.h) {
        setGameOver(true);
        return;
      }

      // Collision with self
      if (state.snake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [head, ...state.snake];

      // Eat Food
      if (head.x === state.food.x && head.y === state.food.y) {
        setScore(s => s + 10);
        state.food = generateFood(state.gridSize.w, state.gridSize.h, newSnake);
        // Speed up slightly
        state.interval = Math.max(50, 100 - (newSnake.length * 0.5));
      } else {
        newSnake.pop();
      }

      state.snake = newSnake;

      // Render
      // Clear
      ctx.fillStyle = '#050b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i <= state.gridSize.w; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= state.gridSize.h; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
      }

      // Food
      ctx.fillStyle = FOOD_COLOR;
      ctx.shadowBlur = 15;
      ctx.shadowColor = FOOD_COLOR;
      ctx.beginPath();
      ctx.arc(
        state.food.x * CELL_SIZE + CELL_SIZE/2, 
        state.food.y * CELL_SIZE + CELL_SIZE/2, 
        CELL_SIZE/2 - 2, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Snake
      ctx.fillStyle = SNAKE_COLOR;
      ctx.shadowBlur = 10;
      ctx.shadowColor = SNAKE_COLOR;
      state.snake.forEach((segment, index) => {
        // Head is slightly bigger or different color?
        if (index === 0) {
           ctx.fillStyle = '#ccfbff';
        } else {
           ctx.fillStyle = SNAKE_COLOR;
        }
        ctx.fillRect(
          segment.x * CELL_SIZE + 1, 
          segment.y * CELL_SIZE + 1, 
          CELL_SIZE - 2, 
          CELL_SIZE - 2
        );
      });
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(update);
    };

    if (gameStarted && !gameOver) {
      animationFrameId = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, gameStarted]);

  return html`
    <div className="relative w-full h-full bg-cyber-black flex items-center justify-center overflow-hidden">
      <canvas ref=${canvasRef} className="block"></canvas>
      
      <div className="absolute top-4 left-4 text-white font-display text-2xl z-10 select-none pointer-events-none drop-shadow-md">
        SCORE: <span className="text-cyber-neon">${score}</span>
      </div>

      ${(!gameStarted || gameOver) && html`
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tighter animate-pulse">
            ${gameOver ? 'SYSTEM FAILURE' : 'NEON SNAKE'}
          </h1>
          ${gameOver && html`
            <p className="text-cyber-pink font-mono mb-8 text-xl">FINAL SCORE: ${score}</p>
          `}
          <${Button} 
            onClick=${resetGame} 
            variant="primary" 
            size="lg"
            className="shadow-neon animate-pulse-fast"
          >
            ${gameOver ? 'REBOOT SYSTEM' : 'INITIALIZE'}
          </${Button}>
          <p className="mt-8 text-slate-500 font-mono text-sm">USE ARROW KEYS or WASD TO NAVIGATE</p>
        </div>
      `}
    </div>
  `;
};
