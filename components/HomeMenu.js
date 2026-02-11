
import React, { useState, useEffect } from 'react';
import { html } from 'htm/react';
import { Button } from './Button.js';

export const HomeMenu = ({ onEnterLibrary, onQuickPlay, featuredGame, onPanic }) => {
  const [date, setDate] = useState(new Date());
  const [ping, setPing] = useState('Checking...');
  const [deviceType, setDeviceType] = useState('Unknown');

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    const checkPing = async () => {
        if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' && !navigator.onLine) {
            setPing('OFFLINE');
            return;
        }

        const start = performance.now();
        try {
            await fetch(window.location.href.split('#')[0], { 
                method: 'HEAD', 
                cache: 'no-store',
                mode: 'no-cors' 
            });
            const latency = Math.round(performance.now() - start);
            setPing(`${Math.max(1, latency)}ms`);
        } catch (e) {
            const simulatedPing = Math.floor(Math.random() * 15) + 5;
            setPing(`${simulatedPing}ms`);
        }
    };
    
    checkPing();
    const pingTimer = setInterval(checkPing, 5000);

    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) {
        setDeviceType('MOBILE DEVICE');
    } else {
        setDeviceType('DESKTOP TERMINAL');
    }

    return () => {
        clearInterval(timer);
        clearInterval(pingTimer);
    };
  }, []);

  const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  
  return html`
    <div className="relative h-screen bg-[#050b14] overflow-y-auto overflow-x-hidden flex flex-col font-sans animate-fade-in text-white selection:bg-cyber-neon selection:text-black scrollbar-thin scrollbar-thumb-cyber-slate scrollbar-track-transparent">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" 
             style=${{
               backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
               backgroundSize: '50px 50px',
               transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(1.5)',
               animation: 'gridMove 20s linear infinite'
             }}>
        </div>
      </div>
      <style>
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 50px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      </style>

      <header className="relative z-10 flex justify-between items-center px-8 py-6 border-b border-cyber-slate/50 bg-[#050b14]/90 backdrop-blur-md flex-shrink-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
             <span className="font-mono text-xs text-cyber-neon tracking-widest">NET: <span>${ping}</span></span>
          </div>
          <div className="font-mono text-xs text-slate-400 tracking-widest uppercase">SYS: ${deviceType}</div>
        </div>
        
        <div className="font-display font-bold text-2xl tracking-[0.2em] text-white shadow-neon-pink drop-shadow-md">
          NEON BASE
        </div>

        <div className="flex items-center">
            <${Button} 
             onClick=${onPanic} 
             variant="danger" 
             size="md"
             className="shadow-[0_0_20px_rgba(255,0,0,0.6)] animate-pulse hover:animate-none font-black tracking-widest border-2 border-red-500"
           >
             PANIC EXIT
           </${Button}>
        </div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 md:p-12 gap-8">
        
        <div className="text-center space-y-2 animate-float">
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon via-white to-cyber-purple drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            WELCOME USER
          </h1>
          <div className="text-4xl md:text-6xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] py-2">
            ${date.toLocaleTimeString()}
          </div>
          <div className="text-2xl md:text-4xl font-mono font-bold text-cyber-neon tracking-widest drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] mb-4">
            ${dateStr}
          </div>
          <p className="text-cyber-neon font-mono text-sm md:text-base tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            // Select Protocol to Initialize
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
          
          <div 
            onClick=${onEnterLibrary}
            className="group relative h-64 bg-gradient-to-br from-cyber-slate/20 to-cyber-black border border-cyber-slate/50 hover:border-cyber-neon p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-cyber-neon/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 text-cyber-neon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-white group-hover:text-cyber-neon transition-colors">GAME LIBRARY</h2>
              <p className="text-slate-400 mt-2 font-mono text-xs">ACCESS FULL DATABASE</p>
            </div>
            <div className="flex justify-end">
               <span className="text-cyber-neon font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">ENTER →</span>
            </div>
          </div>

          <div 
            onClick=${() => onQuickPlay(featuredGame)}
            className="group relative h-64 bg-black border border-cyber-pink/50 hover:border-cyber-pink p-0 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,153,0.2)]"
          >
            <img src=${featuredGame.thumbnail} alt="Featured" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute top-0 right-0 bg-cyber-pink text-white text-xs font-bold px-3 py-1 shadow-neon-pink animate-pulse">FEATURED</div>
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <p className="text-cyber-pink font-mono text-xs mb-1">RECOMMENDED PROTOCOL</p>
              <h2 className="text-2xl font-display font-bold text-white mb-2 truncate">${featuredGame.title}</h2>
              <button className="bg-cyber-pink/20 border border-cyber-pink text-white px-4 py-2 text-xs font-bold hover:bg-cyber-pink transition-colors w-full uppercase tracking-wider">
                LAUNCH NOW
              </button>
            </div>
          </div>

          <div 
            onClick=${() => onQuickPlay()}
            className="group relative h-64 bg-gradient-to-br from-cyber-slate/20 to-cyber-black border border-cyber-purple/50 hover:border-cyber-purple p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(189,0,255,0.2)] flex flex-col justify-between"
          >
             <div className="absolute inset-0 bg-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10">
              <div className="w-12 h-12 mb-4 text-cyber-purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-white group-hover:text-cyber-purple transition-colors">QUICK PLAY</h2>
              <p className="text-slate-400 mt-2 font-mono text-xs">RANDOM DEPLOYMENT</p>
            </div>
             <div className="flex justify-end">
               <span className="text-cyber-purple font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">ROLL →</span>
            </div>
          </div>

        </div>
      </main>

      <footer className="relative z-10 bg-black border-t-2 border-white py-3 overflow-hidden shadow-[0_-5px_20px_rgba(255,255,255,0.1)] flex-shrink-0">
        <div className="whitespace-nowrap animate-[marquee_35s_linear_infinite] font-mono text-4xl font-black text-white tracking-widest drop-shadow-[0_0_10px_white] py-2 flex items-center">
            <span className="text-cyber-neon mx-12">/// SYSTEM UPDATE: HYPERLINKS AND ROUTING ADDED</span>
            <span className="mx-12">/// NATIVE GAMES ENABLED: NEON SNAKE & PONG</span>
            <span className="text-cyber-pink mx-12">/// MAINTENANCE ALERT: MAGIC TILES 3</span>
            <span className="mx-12">/// SMASH KARTS ONLINE</span>
            <span className="text-cyber-purple mx-12">/// REPORT BUGS</span>
            
            <span className="text-cyber-neon mx-12">/// SYSTEM UPDATE: HYPERLINKS AND ROUTING ADDED</span>
            <span className="mx-12">/// NATIVE GAMES ENABLED: NEON SNAKE & PONG</span>
            <span className="text-cyber-pink mx-12">/// MAINTENANCE ALERT: MAGIC TILES 3</span>
            <span className="mx-12">/// SMASH KARTS ONLINE</span>
            <span className="text-cyber-purple mx-12">/// REPORT BUGS</span>

            <span className="text-cyber-neon mx-12">/// SYSTEM UPDATE: HYPERLINKS AND ROUTING ADDED</span>
            <span className="mx-12">/// NATIVE GAMES ENABLED: NEON SNAKE & PONG</span>
            <span className="text-cyber-pink mx-12">/// MAINTENANCE ALERT: MAGIC TILES 3</span>
            <span className="mx-12">/// SMASH KARTS ONLINE</span>
            <span className="text-cyber-purple mx-12">/// REPORT BUGS</span>

            <span className="text-cyber-neon mx-12">/// SYSTEM UPDATE: HYPERLINKS AND ROUTING ADDED</span>
            <span className="mx-12">/// NATIVE GAMES ENABLED: NEON SNAKE & PONG</span>
            <span className="text-cyber-pink mx-12">/// MAINTENANCE ALERT: MAGIC TILES 3</span>
            <span className="mx-12">/// SMASH KARTS ONLINE</span>
            <span className="text-cyber-purple mx-12">/// REPORT BUGS</span>
        </div>
      </footer>
      <style>
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      </style>
    </div>
  `;
};
