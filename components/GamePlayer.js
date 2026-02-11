
import React, { useState, useEffect } from 'react';
import { html } from 'htm/react';
import { Button } from './Button.js';
import { GameType } from '../types.js';
import { NeonSnake } from './games/NeonSnake.js';
import { CyberPong } from './games/CyberPong.js';

const NATIVE_GAMES = {
  'neon-snake': NeonSnake,
  'cyber-pong': CyberPong
};

const CyberLoader = () => html`
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-cyber-black overflow-hidden animate-fade-in">
    <div className="absolute inset-0 opacity-30" 
      style=${{ 
        backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg) scale(2)',
        transformOrigin: 'center -100px',
        animation: 'gridScroll 10s linear infinite'
      }}
    />
    <div className="relative w-32 h-32 flex items-center justify-center mb-8">
      <div className="absolute inset-0 border-2 border-transparent border-t-cyber-neon border-r-cyber-neon rounded-full animate-[spin_2s_linear_infinite]"></div>
      <div className="absolute inset-0 border-2 border-transparent border-t-cyber-neon border-r-cyber-neon rounded-full animate-[spin_2s_linear_infinite] blur-[2px]"></div>
      <div className="absolute inset-4 border-2 border-transparent border-b-cyber-pink border-l-cyber-pink rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
      <div className="absolute inset-10 bg-cyber-neon/10 rounded-full animate-pulse backdrop-blur-sm border border-cyber-neon/30 flex items-center justify-center">
        <div className="w-2 h-2 bg-cyber-neon rounded-full shadow-[0_0_15px_#00f3ff]"></div>
      </div>
    </div>
    <div className="text-center relative z-20 space-y-4">
      <div className="text-3xl font-display font-bold text-white tracking-[0.2em] relative">
        <span className="relative z-10">INITIALIZING</span>
        <span className="absolute top-0 left-0 -ml-[2px] text-cyber-pink opacity-70 animate-pulse" style=${{clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px)'}}>INITIALIZING</span>
        <span className="absolute top-0 left-0 ml-[2px] text-cyber-neon opacity-70 animate-pulse" style=${{clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)', transform: 'translate(2px)'}}>INITIALIZING</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-48 h-1 bg-cyber-slate/50 rounded-full overflow-hidden relative">
           <div className="absolute inset-y-0 left-0 bg-cyber-neon w-1/2 animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="font-mono text-xs text-cyber-neon/80 tracking-widest animate-pulse">ESTABLISHING UPLINK...</p>
      </div>
    </div>
    <style>@keyframes gridScroll { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } } @keyframes progress { 0% { left: -50%; width: 50%; } 50% { left: 25%; width: 50%; } 100% { left: 100%; width: 50%; } }</style>
  </div>
`;

export const GamePlayer = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = React.useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const container = document.getElementById('game-container');
      if (container) container.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (game.type === GameType.NATIVE) {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }
  }, [game.id, game.type]);

  const isNative = game.type === GameType.NATIVE;
  const NativeGameComponent = isNative ? NATIVE_GAMES[game.id] : null;

  return html`
    <div className="animate-fade-in flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 bg-cyber-slate/20 p-4 border border-cyber-slate backdrop-blur-sm gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
          <${Button} onClick=${onBack} variant="secondary" size="sm" icon=${html`<span>←</span>`}>ABORT</${Button}>
          <h2 className="text-xl font-display font-bold text-white sm:block tracking-wider uppercase truncate max-w-[150px] sm:max-w-none">${game.title}</h2>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
           <${Button} onClick=${toggleFullscreen} variant="secondary" size="sm" className="hidden md:inline-flex">${isFullscreen ? 'MINIMIZE' : 'FULLSCREEN'}</${Button}>
           ${!isNative && html`<${Button} variant="primary" size="sm" onClick=${() => window.open(game.url, '_blank')} title="Open in new tab" className="whitespace-nowrap shadow-neon hover:scale-105 transition-transform">OPEN IN NEW TAB ↗</${Button}>`}
        </div>
      </div>

      <div id="game-container" className=${`relative w-full overflow-hidden bg-black border border-cyber-slate shadow-neon-pink/10 flex-grow flex flex-col ${isFullscreen ? 'p-0 border-none' : 'aspect-video md:aspect-auto border-t-2 border-b-2 border-cyber-neon/50'}`}>
        ${isLoading && html`<${CyberLoader} />`}
        ${isNative && NativeGameComponent ? html`
          <div className=${`w-full h-full ${isLoading ? 'hidden' : 'block animate-fade-in'}`}>
            <${NativeGameComponent} />
          </div>
        ` : html`
          <iframe ref=${iframeRef} src=${game.url} title=${game.title} className=${`w-full h-full border-0 flex-grow transition-opacity duration-1000 ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-storage-access-by-user-activation allow-pointer-lock" allowFullScreen onLoad=${() => { if (!isNative) setTimeout(() => setIsLoading(false), 500); }} />
        `}
      </div>
      
      <div className="mt-6 text-slate-400 bg-cyber-slate/10 p-6 border-l-4 border-cyber-neon">
        <h3 className="text-lg font-display font-bold text-white mb-2 uppercase">Mission Briefing</h3>
        <p className="font-light">${game.description}</p>
        <p className="mt-2 text-xs text-cyber-neon font-mono font-bold">${isNative ? '// SYSTEM ALERT: NATIVE SIMULATION LOADED.' : '// SYSTEM ALERT: IF SCREEN REMAINS BLACK, CLICK "OPEN IN NEW TAB".'}</p>
      </div>
    </div>
  `;
};
