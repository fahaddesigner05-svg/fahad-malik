
import React from 'react';

const PROJECTS = [
  {
    title: "Quantum Branding",
    category: "Identity Design",
    img: "https://picsum.photos/seed/qnt/800/600",
    color: "cyan"
  },
  {
    title: "Nebula UI Kit",
    category: "Mobile Design",
    img: "https://picsum.photos/seed/neb/800/600",
    color: "purple"
  },
  {
    title: "Ether Dashboard",
    category: "Web Application",
    img: "https://picsum.photos/seed/eth/800/600",
    color: "pink"
  },
  {
    title: "Cyberpunk 2077 Art",
    category: "Illustration",
    img: "https://picsum.photos/seed/cyb/800/600",
    color: "blue"
  }
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Portfolio</h3>
          <h2 className="text-4xl md:text-5xl font-black">Featured Projects</h2>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 font-semibold">
          <span>View All Work</span>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <img 
              src={project.img} 
              alt={project.title}
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-900/40 px-3 py-1 rounded-full mb-3 inline-block">
                {project.category}
              </span>
              <h4 className="text-3xl font-bold text-white mb-4">{project.title}</h4>
              <button className="flex items-center space-x-2 text-white/60 group-hover:text-white transition-colors">
                <span className="font-semibold">Case Study</span>
                <i className="fas fa-external-link-alt text-xs"></i>
              </button>
            </div>

            {/* Hover Accent Glow */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 ${idx % 2 === 0 ? 'bg-cyan-500/0 group-hover:bg-cyan-500/40' : 'bg-purple-500/0 group-hover:bg-purple-500/40'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
