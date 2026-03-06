
import React, { useState } from 'react';

const SKILLS = [
  { name: "UI/UX Design", level: 95, icon: "fa-bezier-curve", color: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20", bg: "group-hover:bg-cyan-400/5", spotlight: "rgba(34, 211, 238, 0.15)" },
  { name: "Graphic Design", level: 90, icon: "fa-palette", color: "text-purple-400", glow: "group-hover:shadow-purple-500/20", bg: "group-hover:bg-purple-400/5", spotlight: "rgba(192, 132, 252, 0.15)" },
  { name: "Brand Identity", level: 85, icon: "fa-copyright", color: "text-pink-400", glow: "group-hover:shadow-pink-500/20", bg: "group-hover:bg-pink-400/5", spotlight: "rgba(244, 114, 182, 0.15)" },
  { name: "Web Design", level: 88, icon: "fa-laptop-code", color: "text-blue-400", glow: "group-hover:shadow-blue-500/20", bg: "group-hover:bg-blue-400/5", spotlight: "rgba(96, 165, 250, 0.15)" },
  { name: "Figma / Adobe XD", level: 98, icon: "fa-pen-nib", color: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20", bg: "group-hover:bg-cyan-400/5", spotlight: "rgba(34, 211, 238, 0.15)" },
  { name: "Photoshop", level: 92, icon: "fa-image", color: "text-purple-400", glow: "group-hover:shadow-purple-500/20", bg: "group-hover:bg-purple-400/5", spotlight: "rgba(192, 132, 252, 0.15)" },
];

const Skills: React.FC = () => {
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number, y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [idx]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h3 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-2">Expertise</h3>
        <h2 className="text-4xl md:text-5xl font-black">Design Arsenal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS.map((skill, idx) => (
          <div 
            key={idx} 
            onMouseMove={(e) => handleMouseMove(e, idx)}
            className={`glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden ${skill.glow} ${skill.bg}`}
          >
            {/* Dynamic Spotlight Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePositions[idx]?.x || 0}px ${mousePositions[idx]?.y || 0}px, ${skill.spotlight}, transparent 40%)`
              }}
            ></div>

            {/* Animated Background Gradient (Static Fallback) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center ${skill.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/5 group-hover:border-white/10 shadow-inner`}>
                <i className={`fas ${skill.icon} text-2xl`}></i>
              </div>
              <span className="text-3xl font-black text-white/5 group-hover:text-white/20 transition-all duration-500 transform group-hover:scale-110">0{idx + 1}</span>
            </div>
            
            <h4 className="text-2xl font-bold mb-6 relative z-10 group-hover:text-white transition-colors">{skill.name}</h4>
            
            <div className="relative z-10">
              <div className="w-full bg-slate-900/50 h-2.5 rounded-full overflow-hidden border border-white/5">
                 <div 
                   className={`h-full bg-gradient-to-r from-transparent to-current transition-all duration-1000 ease-out ${skill.color.replace('text', 'bg')} group-hover:brightness-125`}
                   style={{ width: `${skill.level}%` }}
                 ></div>
              </div>
              <div className="flex justify-between mt-3">
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase group-hover:text-gray-400 transition-colors">Proficiency</span>
                  <span className={`text-sm font-black ${skill.color} group-hover:scale-110 transition-transform`}>{skill.level}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
