
import React, { useState } from 'react';
import { X } from 'lucide-react';

const SKILLS = [
  { 
    name: "UI UX Design", 
    level: 95, 
    icon: "fa-bezier-curve", 
    color: "text-cyan-400",
    details: {
      subSkills: ["Wireframing", "Prototyping", "User Research"],
      tools: ["Figma", "Adobe XD"]
    }
  },
  { 
    name: "Graphic Design", 
    level: 98, 
    icon: "fa-palette", 
    color: "text-purple-400",
    details: {
      subSkills: ["Visual Concepting", "Typography", "Layout Design"],
      tools: ["Adobe Photoshop", "Illustrator", "Canva"]
    }
  },
  { 
    name: "Brand Identity", 
    level: 100, 
    icon: "fa-copyright", 
    color: "text-cyan-400",
    details: {
      subSkills: ["Logo Design", "Color Theory", "Brand Guidelines"],
      tools: ["Illustrator", "Adobe Photoshop"]
    }
  },
  { 
    name: "Web Design", 
    level: 97, 
    icon: "fa-laptop", 
    color: "text-blue-400",
    details: {
      subSkills: ["Responsive Design", "Visual Design", "Interaction Design"],
      tools: ["Figma", "Adobe XD", "Photoshop"]
    }
  },
  { 
    name: "Figma Adobe XD", 
    level: 98, 
    icon: "fa-pen-nib", 
    color: "text-cyan-400",
    details: {
      subSkills: ["UI Components", "Design Systems", "Auto Layout"],
      tools: ["Figma", "Adobe XD"]
    }
  },
  { 
    name: "Photoshop", 
    level: 98, 
    icon: "fa-image", 
    color: "text-purple-400",
    details: {
      subSkills: ["Photo Manipulation", "Digital Painting", "Retouching"],
      tools: ["Adobe Photoshop"]
    }
  },
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<typeof SKILLS[0] | null>(null);

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
              <div 
                onClick={() => setSelectedSkill(skill)}
                className={`w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center ${skill.color} group-hover:scale-110 transition-transform duration-500 cursor-pointer hover:bg-white/5`}
              >
                <i className={`fas ${skill.icon} text-xl`}></i>
              </div>
              <span className="text-2xl font-black text-white/10 group-hover:text-white/30 transition-colors">0{idx + 1}</span>
            </div>
            
            <h4 className="text-xl font-bold mb-6 text-white group-hover:text-white transition-colors relative z-10">{skill.name}</h4>
            
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

      {/* Modal Structure */}
      {selectedSkill && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
          onClick={() => setSelectedSkill(null)}
        >
          <div 
            className="bg-[#0b0c10] border border-white/10 p-8 rounded-3xl max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-slate-800/50 border border-white/10 flex items-center justify-center ${selectedSkill.color}`}>
                <i className={`fas ${selectedSkill.icon} text-xl`}></i>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">{selectedSkill.name}</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-3">Sub-skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.details.subSkills.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-3">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.details.tools.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
