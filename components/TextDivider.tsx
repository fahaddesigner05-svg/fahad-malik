
import React from 'react';

const TextDivider: React.FC = () => {
  return (
    <div className="relative py-24 overflow-hidden bg-black/20 select-none">
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      {/* Scrolling Text Container */}
      <div className="flex whitespace-nowrap cursor-default">
        <div className="animate-marquee flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center group/item">
              <span className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase px-12 text-transparent transition-all duration-500 hover:scale-105 pointer-events-auto cursor-none hover:neon-glow"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                Fahad <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: '2px #22d3ee' }}>Malik</span>
              </span>
              <div className="w-8 h-8 md:w-16 md:h-16 rounded-full border-4 border-purple-500/30 flex items-center justify-center animate-spin-slow group-hover/item:border-cyan-400 group-hover/item:scale-125 transition-all duration-500">
                <i className="fas fa-star text-purple-500 text-xs md:text-xl group-hover/item:text-cyan-400 group-hover/item:rotate-180 transition-all duration-700"></i>
              </div>
            </div>
          ))}
        </div>
        
        {/* Second copy for infinite loop */}
        <div className="animate-marquee flex items-center" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center group/item">
              <span className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase px-12 text-transparent transition-all duration-500 hover:scale-105 pointer-events-auto cursor-none hover:neon-glow"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                Fahad <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: '2px #22d3ee' }}>Malik</span>
              </span>
              <div className="w-8 h-8 md:w-16 md:h-16 rounded-full border-4 border-purple-500/30 flex items-center justify-center animate-spin-slow group-hover/item:border-cyan-400 group-hover/item:scale-125 transition-all duration-500">
                <i className="fas fa-star text-purple-500 text-xs md:text-xl group-hover/item:text-cyan-400 group-hover/item:rotate-180 transition-all duration-700"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover\\:neon-glow:hover {
          -webkit-text-stroke: 2px transparent !important;
          background: linear-gradient(to right, #22d3ee, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: white !important;
          filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 30px rgba(168, 85, 247, 0.6));
        }
        .hover\\:neon-glow:hover span {
          -webkit-text-stroke: 2px transparent !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default TextDivider;
