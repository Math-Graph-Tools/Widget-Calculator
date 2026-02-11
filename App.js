
import React, { useState, useMemo, useEffect } from 'react';
import { html } from 'htm/react';
import { GameCategory } from './types.js';
import { GAMES_DATA, APP_NAME, PANIC_URL, REQUEST_GAME_URL } from './constants.js';
import { GameCard } from './components/GameCard.js';
import { GamePlayer } from './components/GamePlayer.js';
import { HomeMenu } from './components/HomeMenu.js';
import { Button } from './components/Button.js';

const PanicIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 animate-pulse">
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
`;

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);
  return html`
    <div className="font-mono text-xl md:text-2xl font-bold text-white drop-shadow-md tracking-wider mr-4">
      <span>${time}</span>
    </div>
  `;
};

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const bootText = [
      "INITIALIZING NEON CORE V4.6.0...",
      "CHECKING MEMORY INTEGRITY...",
      "LOADING ASSETS...",
      "VERIFYING SECURITY PROTOCOLS...",
      "ESTABLISHING SECURE CONNECTION...",
      "DECRYPTING GAME DATABASE...",
      "SYSTEM READY."
    ];

    let currentLine = 0;
    
    const textInterval = setInterval(() => {
      if (currentLine < bootText.length) {
        setLines(prev => [...prev, bootText[currentLine]]);
        currentLine++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) return 100;
            const increment = Math.random() * 5;
            return Math.min(prev + increment, 100);
        });
    }, 100);

    const totalTime = (bootText.length * 400) + 500;
    const timeout = setTimeout(() => {
        onComplete();
    }, totalTime);

    return () => {
        clearInterval(textInterval);
        clearInterval(progressInterval);
        clearTimeout(timeout);
    };
  }, [onComplete]);

  return html`
    <div className="fixed inset-0 bg-[#050b14] z-[100] flex flex-col items-center justify-center p-8 font-mono text-cyber-neon text-sm md:text-base cursor-wait selection:bg-cyber-pink selection:text-white overflow-hidden">
      <div className="w-full max-w-lg mb-12 relative">
         <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-6xl opacity-10 font-display font-bold select-none">SYSTEM</div>
         <div className="space-y-2 font-bold tracking-wider">
            ${lines.map((line, i) => html`<div key=${i} className="animate-fade-in drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">> ${line}</div>`)}
            <div className="animate-pulse">> _</div>
         </div>
      </div>
      <div className="w-full max-w-lg space-y-2">
         <div className="flex justify-between text-xs text-cyber-slate uppercase tracking-widest">
            <span>System Boot</span>
            <span>${Math.floor(progress)}%</span>
         </div>
         <div className="w-full h-2 bg-cyber-slate/30 border border-cyber-slate/50 rounded-sm overflow-hidden relative">
            <div className="h-full bg-cyber-neon shadow-[0_0_10px_#00f3ff] transition-all duration-75 relative" style=${{ width: `${progress}%` }}>
               <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50"></div>
            </div>
         </div>
      </div>
      <div className="absolute bottom-8 text-xs text-cyber-slate/50 font-mono text-center">
        NEON ARCADE OS // v4.6.0 // UNBLOCKED
      </div>
    </div>
  `;
};

const WelcomeModal = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return html`
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#0a0f1e] border border-cyber-neon shadow-[0_0_30px_rgba(0,243,255,0.2)] max-w-lg w-full relative p-1">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-neon"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-neon"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-neon"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-neon"></div>
        
        <div className="bg-cyber-black/90 p-8 text-center space-y-6">
          <div className="mb-6">
             <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase">System Notification</h2>
             <div className="h-0.5 w-24 bg-cyber-neon mx-auto mt-2 shadow-[0_0_10px_#00f3ff]"></div>
          </div>
          <div className="text-slate-300 space-y-4 font-sans text-lg leading-relaxed">
            <p className="animate-fade-in">Welcome to my unblocked games website.</p>
            <p className="animate-fade-in delay-100">Most games should be operationonal and working.</p>
            <div className="text-left bg-cyber-pink/10 border-l-4 border-cyber-pink p-4 mt-4 animate-fade-in delay-200">
              <p className="text-cyber-pink font-bold text-sm uppercase tracking-wide mb-1">Warning // W.I.P</p>
              <p className="text-white text-sm">Note: this website is still a W.I.P so please be mindful that there could be bugs or errors! Enjoy ;)</p>
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick=${onClose}
              disabled=${timeLeft > 0}
              className=${`w-full py-3 font-display font-bold uppercase tracking-widest transition-all duration-300 border ${timeLeft > 0 ? 'border-slate-800 text-slate-600 bg-black/50 cursor-not-allowed' : 'border-cyber-neon text-cyber-black bg-cyber-neon hover:bg-white hover:shadow-[0_0_20px_#00f3ff] hover:scale-[1.02]'}`}
            >
              ${timeLeft > 0 ? `INITIALIZING... (${timeLeft}s)` : 'ACKNOWLEDGE & ENTER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const LibraryWarningModal = ({ onClose }) => html`
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
    <div className="bg-red-950/30 border-2 border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.4)] max-w-2xl w-full p-8 relative overflow-hidden">
      <div className="absolute inset-0 caution-stripe opacity-10 pointer-events-none"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-display font-black text-red-500 mb-6 tracking-tighter uppercase animate-pulse">Network Alert</h1>
        <p className="text-xl text-white font-mono mb-8 leading-relaxed">
          WARNING: We are currently aware of the games being blocked, please be patient while we are fixing this issue.
        </p>
        <button onClick=${onClose} className="bg-red-600 text-white font-bold py-3 px-8 uppercase tracking-widest hover:bg-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all">I Understand</button>
      </div>
    </div>
  </div>
`;

const MaintenanceModal = ({ onClose, gameTitle }) => html`
  <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 animate-fade-in" onClick=${onClose}>
    <div className="bg-cyber-yellow/10 border-4 border-cyber-yellow p-10 max-w-md w-full relative transform rotate-1" onClick=${e => e.stopPropagation()}>
      <div className="absolute -top-6 -left-6 text-6xl transform -rotate-12">🚧</div>
      <div className="absolute -bottom-6 -right-6 text-6xl transform rotate-12">🚧</div>
      <h2 className="text-4xl font-display font-black text-cyber-yellow mb-4 text-center uppercase tracking-tighter">Maintenance</h2>
      <div className="h-1 bg-cyber-yellow mb-6"></div>
      <p className="text-white text-lg font-mono text-center mb-6">
        <span className="text-cyber-yellow font-bold">${gameTitle}</span> is currently closed for repairs and upgrades.
      </p>
      <p className="text-slate-400 text-sm text-center mb-8">Please check back later.</p>
      <button onClick=${onClose} className="w-full bg-cyber-yellow text-black font-black py-3 uppercase tracking-widest hover:bg-white hover:scale-105 transition-transform">Understood</button>
    </div>
  </div>
`;

const EasterEggNice = () => html`
  <div className="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none animate-fade-in">
    <div className="text-9xl font-black text-cyber-neon drop-shadow-[0_0_30px_#00f3ff] transform -rotate-12 animate-pulse">
      NICE
    </div>
  </div>
`;

const AdminLoginModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const uHash = btoa(username);
    const pHash = btoa(password);
    if (uHash === 'QWRtaW4=' && pHash === 'QmVsbGEuY29tMTI=') {
      onLogin();
      onClose();
    } else {
      setError('ACCESS DENIED: INVALID ENCRYPTION KEY');
      setTimeout(() => setError(''), 3000);
    }
  };

  return html`
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in" onClick=${onClose}>
      <div className="bg-cyber-slate border border-cyber-neon/50 p-8 w-full max-w-sm relative" onClick=${e => e.stopPropagation()}>
        <div className="absolute top-0 left-0 w-2 h-2 bg-cyber-neon"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-neon"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyber-neon"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyber-neon"></div>
        <h2 className="text-2xl font-display font-bold text-white mb-6 text-center tracking-widest">SYSTEM LOGIN</h2>
        <form onSubmit=${handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-cyber-neon mb-1">IDENTIFIER</label>
            <input type="text" value=${username} onChange=${e => setUsername(e.target.value)} className="w-full bg-black border border-slate-700 p-2 text-white focus:border-cyber-neon focus:outline-none font-mono" />
          </div>
          <div>
            <label className="block text-xs font-mono text-cyber-neon mb-1">PASSKEY</label>
            <input type="password" value=${password} onChange=${e => setPassword(e.target.value)} className="w-full bg-black border border-slate-700 p-2 text-white focus:border-cyber-neon focus:outline-none font-mono" />
          </div>
          ${error && html`<p className="text-red-500 text-xs font-bold text-center animate-pulse">${error}</p>`}
          <button type="submit" className="w-full bg-cyber-neon/10 border border-cyber-neon text-cyber-neon font-bold py-2 hover:bg-cyber-neon hover:text-black transition-all">AUTHENTICATE</button>
        </form>
      </div>
    </div>
  `;
};

// Defined outside render to prevent remounting
const SidebarItem = ({ category, label, icon, isActive, onClick }) => html`
  <button
    onClick=${onClick}
    className=${`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border-l-2 flex items-center gap-3 ${
      isActive 
        ? 'border-cyber-neon bg-cyber-neon/10 text-cyber-neon shadow-[inset_10px_0_20px_-10px_rgba(0,243,255,0.2)]' 
        : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/5'
    }`}
  >
    <span>${icon}</span>
    ${label}
  </button>
`;

const App = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [isBooting, setIsBooting] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [view, setView] = useState('HOME');
  const [filter, setFilter] = useState({ search: '', category: GameCategory.ALL });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLibraryWarning, setShowLibraryWarning] = useState(false);
  const [maintenanceGame, setMaintenanceGame] = useState(null);
  
  const [onlineUsers, setOnlineUsers] = useState(1243); // Initial realistic number
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [marqueeText, setMarqueeText] = useState("/// SYSTEM UPDATE V4.6.0: SCROLLING OPTIMIZED /// WELCOME TO NEON ARCADE /// REPORT BUGS VIA REQUEST FORM");
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Deterministic "Real Time" Online Users
  // Updates every 10 seconds based on global time seed
  useEffect(() => {
    const updateOnlineUsers = () => {
      // Create a deterministic number based on the current 10-second window
      // This ensures all users see the same number at the same time
      const timeSeed = Math.floor(Date.now() / 10000); 
      
      // Seeded random function (simple)
      const seededRandom = (seed) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      // Base users + Time of day fluctuation (mock) + noise
      const now = new Date();
      const hour = now.getUTCHours();
      // Peak times (14:00 - 02:00 UTC) have multiplier
      const peakMultiplier = (hour > 14 || hour < 2) ? 1.5 : 0.8;
      
      const base = 1200 * peakMultiplier;
      const noise = seededRandom(timeSeed) * 150; // Random fluctuation 0-150
      
      setOnlineUsers(Math.floor(base + noise));
    };

    updateOnlineUsers(); // Initial
    const interval = setInterval(updateOnlineUsers, 10000); // 10s Update loop
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastKey = '';
    const handleKey = (e) => {
      if (e.key === '7' && lastKey === '6') {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 2000);
      }
      lastKey = e.key;
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handlePanic = () => { try { if (window.top && window.top !== window.self) window.top.location.replace(PANIC_URL); else window.location.replace(PANIC_URL); } catch (e) { window.location.replace(PANIC_URL); } };

  useEffect(() => {
    let lastEscTime = 0;
    const handleKeyDown = (e) => { if (e.key === 'Escape') { const currentTime = new Date().getTime(); if (currentTime - lastEscTime < 500) handlePanic(); lastEscTime = currentTime; } };
    window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(filter.search.toLowerCase());
      const matchesCategory = filter.category === GameCategory.ALL || (filter.category === GameCategory.HOT && game.isHot) || (filter.category === GameCategory.NEW && game.isNew) || game.category === filter.category;
      return matchesSearch && matchesCategory;
    });
  }, [filter]);

  const weeklyTop3 = useMemo(() => { return [...GAMES_DATA].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 3); }, []);
  const featuredGame = useMemo(() => { const hotGames = GAMES_DATA.filter(g => g.isHot && !g.maintenance); const targetGames = hotGames.length > 0 ? hotGames : GAMES_DATA.filter(g => !g.maintenance); const now = new Date(); const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`; let hash = 0; for (let i = 0; i < dateKey.length; i++) { hash = ((hash << 5) - hash) + dateKey.charCodeAt(i); hash = hash & hash; } const index = Math.abs(hash) % targetGames.length; return targetGames[index]; }, []);

  const handleBootComplete = () => { setIsBooting(false); const hasSeenWelcome = localStorage.getItem('neon_arcade_welcome_ack_v1'); if (!hasSeenWelcome) setShowWelcome(true); };
  const handleCloseWelcome = () => { localStorage.setItem('neon_arcade_welcome_ack_v1', 'true'); setShowWelcome(false); };
  const handleEnterLibrary = () => { setView('LIBRARY'); const hasSeenLibWarning = localStorage.getItem('neon_arcade_lib_warning_v1'); if (!hasSeenLibWarning) { setShowLibraryWarning(true); } };
  const handleCloseLibWarning = () => { localStorage.setItem('neon_arcade_lib_warning_v1', 'true'); setShowLibraryWarning(false); };
  const handleGameClick = (game) => { if (game.maintenance) { setMaintenanceGame(game); } else { setActiveGame(game); } };
  const handleQuickPlay = (specificGame = null) => { if (specificGame) { if (specificGame.maintenance) { setMaintenanceGame(specificGame); } else { setActiveGame(specificGame); } } else { const availableGames = GAMES_DATA.filter(g => !g.maintenance); const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)]; setActiveGame(randomGame); } };

  if (isBooting) return html`<${BootSequence} onComplete=${handleBootComplete} />`;

  if (activeGame) {
    const PanicIcon = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 animate-pulse"><path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>`;
    return html`
      <div className="fixed inset-0 bg-cyber-black text-slate-200 flex flex-col font-sans animate-fade-in cursor-auto overflow-hidden">
        <header className="h-16 border-b border-cyber-slate bg-cyber-black sticky top-0 z-50 px-4 flex items-center justify-between shadow-neon-pink/20 flex-shrink-0">
           <div className="flex items-center gap-2 cursor-pointer hover:text-cyber-neon transition-colors" onClick=${() => { setActiveGame(null); setView('HOME'); }}>
             <span className="text-xl">←</span><span className="font-display font-bold tracking-widest hidden sm:inline">EXIT SIMULATION</span>
           </div>
           <div className="flex items-center gap-4"><${Clock} /><${Button} onClick=${handlePanic} variant="danger" size="md" icon=${PanicIcon} className="shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,1)] font-bold tracking-widest border border-white/20">PANIC</${Button}></div>
        </header>
        <main className="flex-1 overflow-hidden bg-black p-0 sm:p-4 relative">
          <${GamePlayer} game=${activeGame} onBack=${() => { setActiveGame(null); setView('LIBRARY'); }} />
        </main>
      </div>
    `;
  }

  const PanicIcon = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 animate-pulse"><path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>`;

  return html`
    <div className="fixed inset-0 bg-[#050b14] text-slate-200 font-sans flex overflow-hidden animate-fade-in">
      ${showWelcome && html`<${WelcomeModal} onClose=${handleCloseWelcome} />`}
      ${showLibraryWarning && html`<${LibraryWarningModal} onClose=${handleCloseLibWarning} />`}
      ${maintenanceGame && html`<${MaintenanceModal} gameTitle=${maintenanceGame.title} onClose=${() => setMaintenanceGame(null)} />`}
      ${showLogin && html`<${AdminLoginModal} onClose=${() => setShowLogin(false)} onLogin=${() => setIsAdmin(true)} />`}
      ${showEasterEgg && html`<${EasterEggNice} />`}

      ${view === 'HOME' && html`
         <div className="absolute inset-0 z-50 bg-[#050b14] flex flex-col">
            <${HomeMenu} 
              onEnterLibrary=${handleEnterLibrary} 
              onQuickPlay=${handleQuickPlay} 
              featuredGame=${featuredGame} 
              onPanic=${handlePanic}
              onlineUsers=${onlineUsers}
              onLoginClick=${() => setShowLogin(true)}
            />
            <footer className="relative z-10 bg-black border-t-2 border-white py-4 overflow-hidden shadow-[0_-5px_20px_rgba(255,255,255,0.1)] flex-shrink-0">
              <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] font-mono text-4xl font-black text-white tracking-widest drop-shadow-[0_0_10px_white] py-2 flex items-center">
                <span className="text-cyber-neon mx-12"><span>${marqueeText}</span></span>
                <span className="mx-12">/// ${APP_NAME} © ${new Date().getFullYear()}</span>
              </div>
              ${isAdmin && html`
                <div className="absolute bottom-2 right-2 flex gap-2 bg-black/80 p-2 border border-cyber-neon">
                  <span className="text-cyber-neon font-bold text-xs uppercase self-center mr-2">ADMIN CONTROLS:</span>
                  <input type="text" value=${marqueeText} onChange=${e => setMarqueeText(e.target.value)} className="bg-slate-900 text-white text-xs border border-slate-600 px-2 py-1 w-64" placeholder="Update Marquee..." />
                </div>
              `}
            </footer>
            <style>@keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }</style>
         </div>
      `}

      <aside className=${`fixed inset-y-0 left-0 z-40 w-64 bg-[#0a0f1e] border-r border-cyber-slate/50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col flex-shrink-0`}>
        <div className="h-20 flex items-center px-6 border-b border-cyber-slate/50 cursor-pointer" onClick=${() => setView('HOME')}>
          <div className="w-8 h-8 bg-cyber-neon text-cyber-black flex items-center justify-center font-bold font-display text-xl mr-3 shadow-neon">N</div>
          <h1 className="font-display font-bold text-xl tracking-wider text-white italic">NEON</h1>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-cyber-slate">
          <button onClick=${() => setView('HOME')} className="w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border-l-2 border-transparent text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-3 mb-4"><span>🏠</span>BASE / HOME</button>
          
          <div className="text-xs font-mono text-slate-600 mb-2 px-4 mt-2">DISCOVER</div>
          <${SidebarItem} isActive=${filter.category === GameCategory.ALL} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.ALL }))} label="All Games" icon="👾" />
          <${SidebarItem} isActive=${filter.category === GameCategory.HOT} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.HOT }))} label="Trending" icon="🔥" />
          <${SidebarItem} isActive=${filter.category === GameCategory.NEW} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.NEW }))} label="New Arrivals" icon="✨" />
          
          <div className="text-xs font-mono text-slate-600 mb-2 px-4 mt-6">GENRES</div>
          <${SidebarItem} isActive=${filter.category === GameCategory.ACTION} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.ACTION }))} label="Action" icon="⚔️" />
          <${SidebarItem} isActive=${filter.category === GameCategory.STRATEGY} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.STRATEGY }))} label="Strategy" icon="🧠" />
          <${SidebarItem} isActive=${filter.category === GameCategory.RACING} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.RACING }))} label="Racing" icon="🏎️" />
          <${SidebarItem} isActive=${filter.category === GameCategory.SPORTS} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.SPORTS }))} label="Sports" icon="🏀" />
          <${SidebarItem} isActive=${filter.category === GameCategory.PUZZLE} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.PUZZLE }))} label="Puzzle" icon="🧩" />
          <${SidebarItem} isActive=${filter.category === GameCategory.RHYTHM} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.RHYTHM }))} label="Rhythm" icon="🎵" />
          <${SidebarItem} isActive=${filter.category === GameCategory.PLATFORMER} onClick=${() => setFilter(prev => ({ ...prev, category: GameCategory.PLATFORMER }))} label="Platformer" icon="🏃" />
          
          <div className="mt-8 px-4"><a href=${REQUEST_GAME_URL} target="_blank" className="block text-center py-2 border border-dashed border-slate-600 text-slate-500 text-xs hover:border-cyber-neon hover:text-cyber-neon transition-colors">+ REQUEST GAME</a></div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-[#050b14]/95 backdrop-blur border-b border-cyber-slate/50 flex items-center justify-between px-4 sm:px-8 z-30 flex-shrink-0">
          <button className="md:hidden text-white" onClick=${() => setIsSidebarOpen(!isSidebarOpen)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
          <div className="flex-1 max-w-xl mx-4"><div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">🔍</span><input type="text" placeholder="Search database..." className="w-full bg-[#0f172a] text-white border-none rounded-sm py-2 pl-10 pr-4 focus:ring-1 focus:ring-cyber-neon placeholder-slate-600" value=${filter.search} onChange=${(e) => setFilter(prev => ({ ...prev, search: e.target.value }))} /></div></div>
          <div className="flex items-center gap-4"><${Clock} /><${Button} onClick=${handlePanic} variant="danger" size="md" icon=${PanicIcon} className="shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,1)] font-bold tracking-widest border border-white/20">PANIC</${Button}></div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-thin scrollbar-thumb-cyber-slate scrollbar-track-transparent">
          ${filter.category === GameCategory.ALL && !filter.search && html`
            <div className="mb-8 p-6 bg-gradient-to-r from-cyber-purple/20 to-transparent border-l-4 border-cyber-purple">
              <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-widest">Weekly Top 3</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                ${weeklyTop3.map((game, index) => html`
                   <div onClick=${() => handleGameClick(game)} className="bg-black/40 p-4 flex items-center gap-4 border border-white/10 hover:border-cyber-purple transition-all cursor-pointer group">
                      <span className="text-4xl font-black text-white/10 group-hover:text-cyber-purple transition-colors">0${index + 1}</span>
                      <div>
                         <div className="font-bold text-white truncate">${game.title}</div>
                         <div className="text-xs text-cyber-purple">${game.category}</div>
                      </div>
                   </div>
                `)}
              </div>
            </div>
          `}
          <div className="mb-6 flex items-end justify-between">
            <div><h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">${filter.category === GameCategory.ALL ? 'System Library' : filter.category}</h2><p className="text-slate-500 font-mono text-sm mt-1">// ${filteredGames.length} TITLES LOADED</p></div>
          </div>
          ${filteredGames.length > 0 ? html`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">${filteredGames.map((game) => html`<${GameCard} key=${game.id} game=${game} onClick=${handleGameClick} />`)}</div>` : html`<div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-cyber-slate/30 rounded-lg"><p className="text-slate-500 font-display text-xl">NO GAMES FOUND</p><button className="mt-4 text-cyber-neon hover:underline" onClick=${() => setFilter({ search: '', category: GameCategory.ALL })}>Reset Filters</button></div>`}
        </main>
      </div>
    </div>
  `;
};

export default App;
