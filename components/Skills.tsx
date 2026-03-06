
import React from 'react';

const SKILLS = [
  { name: "UI/UX Design", level: 95, icon: "fa-bezier-curve", color: "text-cyan-400" },
  { name: "Graphic Design", level: 90, icon: "fa-palette", color: "text-purple-400" },
  { name: "Brand Identity", level: 85, icon: "fa-copyright", color: "text-pink-400" },
  { name: "Motion Graphics", level: 80, icon: "fa-film", color: "text-blue-400" },
  { name: "Figma / Adobe XD", level: 98, icon: "fa-pen-nib", color: "text-cyan-400" },
  { name: "Photoshop", level: 92, icon: "fa-image", color: "text-purple-400" },
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
          <div key={idx} className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 group">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${skill.color}`}>
                <i className={`fas ${skill.icon} text-xl`}></i>
              </div>
              <span className="text-2xl font-black text-white/20 group-hover:text-white/40 transition-colors">0{idx + 1}</span>
            </div>
            
            <h4 className="text-xl font-bold mb-4">{skill.name}</h4>
            
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
               <div 
                 className={`h-full bg-gradient-to-r from-transparent to-current transition-all duration-1000 ${skill.color.replace('text', 'bg')}`}
                 style={{ width: `${skill.level}%` }}
               ></div>
            </div>
            <div className="flex justify-between mt-2">
                <span className="text-[10px] font-bold text-gray-500 tracking-tighter uppercase">Proficiency</span>
                <span className={`text-xs font-black ${skill.color}`}>{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
