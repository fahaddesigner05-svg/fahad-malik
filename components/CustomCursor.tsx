
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.onclick
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Smoother ring tracking
  useEffect(() => {
    let animationFrameId: number;
    
    const followMouse = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(followMouse);
    };
    
    animationFrameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <div className={`custom-cursor-container hidden md:block ${isHovering ? 'cursor-hover' : ''}`}>
      {/* The Standard Arrow Shape in Neon Purple (Size reduced) */}
      <div 
        className="custom-pointer"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.8))' }}
        >
          {/* Classic Cursor Path */}
          <path 
            d="M5.5 3.21V20.8L10.07 16.23L13.19 23.39L16.21 22.07L13.09 14.91H19.79L5.5 3.21Z" 
            fill="#a855f7" 
            stroke="white" 
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* The Cyan Trailing Ring */}
      <div 
        className="custom-cursor-ring" 
        style={{ 
          left: `${ringPosition.x}px`, 
          top: `${ringPosition.y}px`,
          borderWidth: '2.5px' 
        }}
      />
    </div>
  );
};

export default CustomCursor;
