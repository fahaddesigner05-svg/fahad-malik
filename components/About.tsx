
import React from 'react';

const About: React.FC = () => {
  const stats = [
    { label: "Years Experience", value: "5+", color: "text-cyan-400", glow: "shadow-cyan-500/20" },
    { label: "Projects Completed", value: "120+", color: "text-purple-400", glow: "shadow-purple-500/20" },
    { label: "Global Clients", value: "80+", color: "text-pink-400", glow: "shadow-pink-500/20" }
  ];

  return (
    <div className="container mx-auto px-6 py-20 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Visual Storytelling */}
        <div className="relative group order-2 lg:order-1">
          <div className="relative z-10 glass-panel p-2 rounded-[2rem] border-white/10 overflow-hidden transform group-hover:rotate-1 transition-transform duration-500">
             <div className="aspect-[4/5] bg-slate-900 rounded-[1.8rem] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                  alt="Creative Workspace" 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent"></div>
                
                {/* Floating Tech Stack Badges */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                   {['React', 'Figma', 'Node', 'UI/UX'].map(tag => (
                     <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest text-white/80 border border-white/10">
                       {tag}
                     </span>
                   ))}
                </div>
             </div>
          </div>
          {/* Decorative Frames */}
          <div className="absolute -top-6 -left-6 w-full h-full border-2 border-cyan-400/20 rounded-[2rem] -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 blur-3xl -z-10 animate-pulse"></div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div>
            <h3 className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm mb-4">Discovery</h3>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Designing the <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Future</span> of Digital Experience
            </h2>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            I am Fahad Malik, a multidisciplinary designer specializing in high-end UI/UX and visual identities. My approach blends artistic intuition with data-driven strategy to create interfaces that aren't just seen—they are felt.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6">
            {stats.map((stat, i) => (
              <div key={i} className={`p-4 glass-panel rounded-2xl border-white/5 shadow-lg ${stat.glow}`}>
                <div className={`text-2xl md:text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-8 flex items-center space-x-6">
            <button className="flex items-center space-x-3 group">
               <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center group-hover:bg-cyan-400 transition-all duration-300">
                  <i className="fas fa-play text-cyan-400 group-hover:text-black text-xs ml-1"></i>
               </div>
               <span className="font-bold uppercase tracking-widest text-xs text-white/80 group-hover:text-white transition-colors">See the process</span>
            </button>
            <div className="h-px w-20 bg-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
