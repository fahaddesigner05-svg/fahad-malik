
import React, { useState, useEffect } from 'react';

interface ProjectData {
  _id: string;
  title: string;
  category: string;
  img: string;
  color: string;
  description: string;
  demoLink?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const result = await response.json();
        
        if (result.success) {
          setProjects(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch projects');
        }
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-400 font-bold mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-cyan-600/20 border border-cyan-400 rounded-lg text-cyan-400"
        >
          Retry
        </button>
      </div>
    );
  }

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
        {projects.length > 0 ? (
          projects.map((project, idx) => (
            <div key={project._id} className="group relative overflow-hidden rounded-3xl cursor-pointer">
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
          ))
        ) : (
          <div className="col-span-2 text-center py-20 text-gray-500">
            No projects found. Add some to your database!
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
