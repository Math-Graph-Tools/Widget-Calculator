
import React, { useEffect, useRef } from 'react';
import { html } from 'htm/react';

export const CursorEffect = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      if (cursor && dot) {
        // Use transform for performance
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseDown = () => {
      if (cursor) cursor.style.transform += ' scale(0.8)';
    };

    const onMouseUp = () => {
      // Re-apply current position logic naturally handled by next move, 
      // but let's just let the scale reset on next move frame or add a class
    };
    
    // Add hover effect logic
    const onMouseOver = (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('.cursor-pointer')) {
            cursor?.classList.add('scale-150', 'bg-cyber-neon/20');
        } else {
            cursor?.classList.remove('scale-150', 'bg-cyber-neon/20');
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Do not render on touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return null;

  return html`
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div 
        ref=${cursorRef} 
        className="absolute top-0 left-0 w-8 h-8 border-2 border-cyber-neon rounded-full -ml-4 -mt-4 transition-all duration-100 ease-out shadow-[0_0_15px_#00f3ff] mix-blend-screen"
      ></div>
      <div 
        ref=${dotRef} 
        className="absolute top-0 left-0 w-2 h-2 bg-cyber-pink rounded-full -ml-1 -mt-1 shadow-[0_0_10px_#ff0099]"
      ></div>
    </div>
  `;
};
