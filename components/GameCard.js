import React from 'react';
import { html } from 'htm/react';

export const GameCard = ({ game, onClick }) => {
  return html`
    <div 
      onClick=${() => onClick(game)}
      className="group relative bg-cyber-slate rounded-sm overflow-hidden cursor-pointer border border-cyber-slate hover:border-cyber-neon hover:shadow-neon transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src=${game.thumbnail} 
          alt=${game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-90" />
        
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold bg-cyber-black/80 text-cyber-neon border border-cyber-neon backdrop-blur-sm">
          ${game.category.toUpperCase()}
        </span>
        
        ${game.isHot && html`
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold bg-cyber-pink text-white shadow-neon-pink animate-pulse-fast">
            HOT
          </span>
        `}
      </div>

      ${game.maintenance && html`
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-visible">
          <div className="relative animate-swing origin-top" style=${{ top: '10px' }}>
            <div className="hanging-string" style=${{ left: '20%' }}></div>
            <div className="hanging-string" style=${{ right: '20%' }}></div>
            <div className="bg-[#facc15] text-black font-black text-sm px-6 py-4 border-4 border-black shadow-xl transform rotate-1">
              <div className="text-center leading-none">
                <span className="block text-xs opacity-80 mb-1">SORRY</span>
                <span className="block text-xl tracking-tighter">WE'RE</span>
                <span className="block text-xl tracking-tighter">CLOSED</span>
              </div>
            </div>
          </div>
        </div>
      `}

      <div className="p-4 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-cyber-neon transition-colors truncate">
          ${game.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 font-light tracking-wide">
          ${game.description}
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyber-black/80 backdrop-blur-[1px]">
        <span className=${`border px-6 py-2 font-display font-bold tracking-widest uppercase text-sm ${game.maintenance ? 'border-cyber-yellow text-cyber-yellow bg-black/50' : 'border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-cyber-black transition-colors'}`}>
          ${game.maintenance ? 'LOCKED' : 'INITIALIZE'}
        </span>
      </div>
    </div>
  `;
};