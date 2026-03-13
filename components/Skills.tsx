
import React from 'react';

const SKILLS = [
  { name: "UI/UX Design", level: 95, icon: "fa-bezier-curve", color: "text-cyan-400" },
  { name: "Graphic Design", level: 98, icon: "fa-palette", color: "text-purple-400" },
  { name: "Brand Identity", level: 100, icon: "fa-copyright", color: "text-cyan-400" },
  { name: "Web Design", level: 97, icon: "fa-laptop-code", color: "text-blue-400" },
  { name: "Figma / Adobe XD", level: 98, icon: "fa-pen-nib", color: "text-cyan-400" },
  { name: "Photoshop", level: 98, icon: "fa-image", color: "text-purple-400" },
];

const Skills: React.FC = () => {
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
            className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
          >
            {/* Subtle Background Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${skill.color.replace('text', 'bg')}`}></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center ${skill.color} group-hover:scale-110 transition-transform duration-500`}>
                <i className={`fas ${skill.icon} text-xl`}></i>
              </div>
              <span className="text-2xl font-black text-white/10 group-hover:text-white/30 transition-colors">0{idx + 1}</span>
            </div>
            
            <h4 className="text-xl font-bold mb-6 text-white/90 group-hover:text-white transition-colors relative z-10">{skill.name}</h4>
            
            <div className="relative z-10">
              <div className="w-full bg-slate-900/50 h-2 rounded-full overflow-hidden border border-white/5">
                 <div 
                   className={`h-full rounded-full bg-gradient-to-r from-transparent via-current to-current transition-all duration-1000 ease-out relative ${skill.color.replace('text', 'bg')}`}
                   style={{ width: `${skill.level}%` }}
                 >
                   {/* Subtle Tip Glow */}
                   <div className="absolute right-0 top-0 h-full w-4 bg-white blur-sm opacity-30"></div>
                 </div>
              </div>
              <div className="flex justify-between mt-3 items-center">
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Proficiency</span>
                  <span className={`text-xs font-black ${skill.color} tabular-nums`}>{skill.level}%</span>
              </div>
            </div>

            {/* Subtle Bottom Accent */}
            <div className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ${skill.color.replace('text', 'bg')} opacity-30`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
