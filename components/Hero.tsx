
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center px-6 lg:px-24 overflow-hidden pt-16">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div>
            <h2 className="text-2xl font-light text-gray-300 mb-2">Hi, I'm</h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent neon-text-blue">
                Fahad Malik
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
              Graphic & UI/UX Designer
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-cyan-600/20 border border-cyan-400 rounded-lg text-cyan-400 font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 neon-border-blue transform hover:scale-105">
              View My Work
            </button>
            <button className="px-8 py-4 bg-purple-600/20 border border-purple-400 rounded-lg text-purple-400 font-bold hover:bg-purple-400 hover:text-white transition-all duration-300 neon-border-purple transform hover:scale-105">
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Side: Visual Library / Workstation Concept */}
        <div className="relative group animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="relative w-full aspect-square md:aspect-[4/3] glass-panel rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl flex items-center justify-center p-4">
            {/* Inner "Library" Visuals */}
            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                {/* Mock Workstation Screen UI */}
                <div className="absolute inset-0 flex flex-col p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Designer Console v2.0</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="bg-gradient-to-br from-cyan-500/20 to-transparent rounded-xl border border-cyan-500/30 p-4 animate-pulse">
                            <div className="h-2 w-12 bg-cyan-400/50 rounded-full mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-1.5 w-full bg-gray-700 rounded-full"></div>
                                <div className="h-1.5 w-3/4 bg-gray-700 rounded-full"></div>
                                <div className="h-1.5 w-1/2 bg-gray-700 rounded-full"></div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl border border-purple-500/30 p-4">
                            <div className="h-2 w-12 bg-purple-400/50 rounded-full mb-4"></div>
                            <div className="flex justify-center items-center h-20">
                                <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
                            </div>
                        </div>
                        <div className="col-span-2 bg-slate-800/50 rounded-xl border border-white/5 p-4 overflow-hidden">
                             <div className="text-[10px] font-mono text-cyan-400 mb-2">// Active Projects</div>
                             <div className="grid grid-cols-3 gap-2">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className="h-12 bg-gray-900 rounded-md border border-white/5 flex items-center justify-center">
                                        <i className={`fas fa-cube text-xs text-gray-600`}></i>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
                
                {/* Visual Decoration mirroring the image */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/30 blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/30 blur-3xl"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 glass-panel rounded-2xl border border-purple-400/50 flex items-center justify-center animate-float shadow-xl">
               <i className="fas fa-palette text-3xl text-purple-400"></i>
            </div>
            <div className="absolute -bottom-6 left-12 px-6 py-3 glass-panel rounded-full border border-cyan-400/50 flex items-center space-x-3 animate-float [animation-delay:1.5s] shadow-xl">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
               <span className="text-xs font-bold text-cyan-400 uppercase">Interactive Design Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Mouse with Ring */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60 animate-bounce">
         <div className="w-6 h-10 rounded-full border-2 border-purple-500 relative flex justify-center p-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            <div className="w-1 h-2 bg-purple-400 rounded-full animate-scroll"></div>
         </div>
         <div className="w-8 h-8 rounded-full border border-purple-400/30 flex items-center justify-center animate-pulse">
            <i className="fas fa-chevron-down text-[8px] text-purple-400"></i>
         </div>
         <style>{`
            @keyframes scroll {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(12px); opacity: 0; }
            }
         `}</style>
      </div>
    </div>
  );
};

export default Hero;
