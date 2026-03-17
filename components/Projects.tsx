
import React from 'react';

interface ProjectData {
  id: string;
  title: string;
  category: string;
  img: string;
  color: string;
  description: string;
}

const Projects: React.FC = () => {
  const projects: ProjectData[] = [
    {
      id: "1",
      title: "Quantum Branding",
      category: "Identity Design",
      description: "A high-end branding project for a tech startup focused on established a robust and trustworthy online identity.",
      img: "https://picsum.photos/seed/qnt/800/600",
      color: "cyan",
    },
    {
      id: "2",
      title: "Nebula UI Kit",
      category: "Mobile Design",
      description: "A comprehensive UI kit for mobile applications with high-end CSS styling and optimized performance.",
      img: "https://picsum.photos/seed/neb/800/600",
      color: "purple",
    },
    {
      id: "3",
      title: "Ether Dashboard",
      category: "Web Application",
      description: "A sleek dashboard for a data analytics platform with real-time data visualization.",
      img: "https://picsum.photos/seed/eth/800/600",
      color: "cyan",
    },
    {
      id: "4",
      title: "Solaris App",
      category: "Product Design",
      description: "An innovative application for monitoring solar energy efficiency in residential areas.",
      img: "https://picsum.photos/seed/sol/800/600",
      color: "purple",
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Portfolio</h3>
          <h2 className="text-4xl md:text-5xl font-black">Featured Projects</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div 
            key={project.id} 
            className="group relative overflow-hidden rounded-3xl cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
            
            <img 
              src={project.img} 
              alt={project.title}
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-900/40 px-3 py-1 rounded-full mb-3 inline-block">
                {project.category}
              </span>
              <h4 className="text-3xl font-bold text-white mb-2 group-hover:text-white transition-all duration-500">{project.title}</h4>
              <p className="text-gray-400 text-sm line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {project.description}
              </p>
            </div>

            {/* Hover Accent Glow */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 ${idx % 2 === 0 ? 'bg-cyan-500/0 group-hover:bg-cyan-500/40' : 'bg-purple-500/0 group-hover:bg-purple-500/40'}`}></div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button 
          className="px-8 py-4 bg-cyan-600/20 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold tracking-widest uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 group"
        >
          <span>View All Work</span>
          <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};

export default Projects;
