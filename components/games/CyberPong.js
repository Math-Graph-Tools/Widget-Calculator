
import React, { useRef, useEffect, useState } from 'react';
import { html } from 'htm/react';
import { Button } from '../Button.js';

export const CyberPong = () => {
  const canvasRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  // Game State
  const gameState = useRef({
    ball: { x: 0, y: 0, dx: 5, dy: 5, size: 10, speed: 7 },
    paddleHeight: 100,
    paddleWidth: 15,
    playerY: 0,
    aiY: 0,
    canvasHeight: 0,
    canvasWidth: 0
  });

  const resetBall = () => {
    const s = gameState.current;
    s.ball.x = s.canvasWidth / 2;
    s.ball.y = s.canvasHeight / 2;
    s.ball.dx = (Math.random() > 0.5 ? 1 : -1) * s.ball.speed;
    s.ball.dy = (Math.random() * 2 - 1) * s.ball.speed;
  };

  const startGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setGameStarted(true);
    setPaused(false);
    resetBall();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      gameState.current.canvasWidth = canvas.width;
      gameState.current.canvasHeight = canvas.height;
      
      // Initial positions
      if (!gameStarted) {
         gameState.current.playerY = canvas.height / 2 - gameState.current.paddleHeight / 2;
         gameState.current.aiY = canvas.height / 2 - gameState.current.paddleHeight / 2;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // Controls
    const handleMouseMove = (e) => {
       if (paused) return;
       const rect = canvas.getBoundingClientRect();
       const rootY = e.clientY - rect.top;
       gameState.current.playerY = rootY - gameState.current.paddleHeight / 2;
    };
    
    // Fallback Keyboard Controls
    const handleKeyDown = (e) => {
        if (paused) return;
        const speed = 40;
        if (e.key === 'ArrowUp' || e.key === 'w') {
            gameState.current.playerY -= speed;
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
            gameState.current.playerY += speed;
        }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    const update = () => {
       if (!gameStarted || paused) return;

       const s = gameState.current;
       const { width, height } = canvas;

       // Constrain Paddles
       if (s.playerY < 0) s.playerY = 0;
       if (s.playerY + s.paddleHeight > height) s.playerY = height - s.paddleHeight;
       if (s.aiY < 0) s.aiY = 0;
       if (s.aiY + s.paddleHeight > height) s.aiY = height - s.paddleHeight;

       // AI Movement
       const aiCenter = s.aiY + s.paddleHeight / 2;
       if (aiCenter < s.ball.y - 35) {
           s.aiY += 6;
       } else if (aiCenter > s.ball.y + 35) {
           s.aiY -= 6;
       }

       // Move Ball
       s.ball.x += s.ball.dx;
       s.ball.y += s.ball.dy;

       // Wall Collisions (Top/Bottom)
       if (s.ball.y - s.ball.size < 0 || s.ball.y + s.ball.size > height) {
           s.ball.dy *= -1;
       }

       // Paddle Collisions
       // Player
       if (s.ball.x - s.ball.size < s.paddleWidth + 10) {
           if (s.ball.y > s.playerY && s.ball.y < s.playerY + s.paddleHeight) {
               s.ball.dx *= -1.1; // Speed up
               // Add spin
               const hitPoint = s.ball.y - (s.playerY + s.paddleHeight/2);
               s.ball.dy = hitPoint * 0.15;
           } else if (s.ball.x < 0) {
               // AI Scored
               setAiScore(prev => prev + 1);
               resetBall();
           }
       }

       // AI
       if (s.ball.x + s.ball.size > width - s.paddleWidth - 10) {
           if (s.ball.y > s.aiY && s.ball.y < s.aiY + s.paddleHeight) {
               s.ball.dx *= -1.1;
               const hitPoint = s.ball.y - (s.aiY + s.paddleHeight/2);
               s.ball.dy = hitPoint * 0.15;
           } else if (s.ball.x > width) {
               // Player Scored
               setPlayerScore(prev => prev + 1);
               resetBall();
           }
       }

       // --- Draw ---
       ctx.fillStyle = '#050b14';
       ctx.fillRect(0, 0, width, height);

       // Center Line
       ctx.beginPath();
       ctx.setLineDash([10, 15]);
       ctx.moveTo(width / 2, 0);
       ctx.lineTo(width / 2, height);
       ctx.strokeStyle = '#1e293b';
       ctx.lineWidth = 2;
       ctx.stroke();
       ctx.setLineDash([]);

       // Paddles
       ctx.shadowBlur = 10;
       ctx.shadowColor = '#00f3ff';
       ctx.fillStyle = '#00f3ff';
       ctx.fillRect(10, s.playerY, s.paddleWidth, s.paddleHeight);

       ctx.shadowColor = '#bd00ff';
       ctx.fillStyle = '#bd00ff';
       ctx.fillRect(width - s.paddleWidth - 10, s.aiY, s.paddleWidth, s.paddleHeight);

       // Ball
       ctx.shadowBlur = 15;
       ctx.shadowColor = '#ffffff';
       ctx.fillStyle = '#ffffff';
       ctx.beginPath();
       ctx.arc(s.ball.x, s.ball.y, s.ball.size, 0, Math.PI * 2);
       ctx.fill();
       ctx.shadowBlur = 0;

       animationFrameId = requestAnimationFrame(update);
    };

    if (gameStarted) {
        animationFrameId = requestAnimationFrame(update);
    }

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('keydown', handleKeyDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, paused]);

  return html`
    <div className="relative w-full h-full bg-cyber-black overflow-hidden flex flex-col justify-center">
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-16 font-display text-4xl font-bold z-10 pointer-events-none select-none">
         <span className="text-cyber-neon drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">${playerScore}</span>
         <span className="text-cyber-purple drop-shadow-[0_0_10px_rgba(189,0,255,0.5)]">${aiScore}</span>
      </div>
      
      <canvas ref=${canvasRef} className="block w-full h-full"></canvas>

      ${!gameStarted && html`
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
           <h1 className="text-6xl font-display font-bold text-white mb-2 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-cyber-purple">CYBER PONG</h1>
           <p className="text-slate-400 mb-8 font-mono tracking-widest text-sm">VS AI NEURAL NETWORK</p>
           <${Button} onClick=${startGame} variant="primary" size="lg">INIT_MATCH</${Button}>
           <p className="mt-4 text-xs text-slate-600 font-mono">MOUSE TO MOVE // FIRST TO 10</p>
        </div>
      `}
    </div>
  `;
};
