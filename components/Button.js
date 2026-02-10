import React from 'react';
import { html } from 'htm/react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant";
  
  // Cyberpunk clip-path style could be added via CSS, but for now we use borders and shadows
  const variants = {
    primary: "bg-cyber-neon text-cyber-black hover:bg-white hover:shadow-neon border border-transparent",
    secondary: "bg-transparent text-cyber-neon border border-cyber-neon hover:bg-cyber-neon/10 hover:shadow-neon",
    danger: "bg-cyber-pink text-white hover:bg-red-600 hover:shadow-neon-pink border border-transparent",
    ghost: "bg-transparent text-slate-400 hover:text-cyber-neon hover:bg-cyber-slate/50"
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return html`
    <button 
      className=${`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      ...${props}
    >
      ${icon && html`<span className="mr-2">${icon}</span>`}
      ${children}
    </button>
  `;
};