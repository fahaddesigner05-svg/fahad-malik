
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Calendar, Tag, Info } from 'lucide-react';

interface ProjectData {
  _id: string;
  title: string;
  category: string;
  img: string;
  color: string;
  description: string;
  videoLink?: string;
  createdAt: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects`);
        const result = await response.json();
        if (result.success) {
          const foundProject = result.data.find((p: ProjectData) => p._id === id);
          if (foundProject) {
            setProject(foundProject);
          } else {
            throw new Error('Project not found');
          }
        } else {
          throw new Error(result.error || 'Failed to fetch project');
        }
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-400 font-bold mb-4">Error: {error || 'Project not found'}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-cyan-600/20 border border-cyan-400 rounded-lg text-cyan-400 font-bold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white selection:bg-cyan-500 selection:text-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>
          <div className="text-sm font-black tracking-tighter">
            FAHAD<span className="text-cyan-400">MALIK</span>
          </div>
        </div>
      </header>

      <main className="pt-24 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side: Details */}
        <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 inline-block">
              {project.category}
            </span>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              {project.title}
            </h1>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-white/5 text-cyan-400">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/5 text-purple-400">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Category</h3>
                    <p className="font-bold text-white uppercase tracking-wider">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/5 text-emerald-400">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Date</h3>
                    <p className="font-bold text-white">{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            {project.videoLink && !project.videoLink.match(/\.(mp4|webm|ogg)$/i) && !project.videoLink.includes('youtube.com') && !project.videoLink.includes('youtu.be') && (
              <a 
                href={project.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 group"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Right Side: Media */}
        <div className="lg:w-1/2 bg-black/40 flex items-center justify-center p-4 lg:p-12 min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full max-h-[80vh] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 relative group"
          >
            {project.videoLink && (project.videoLink.includes('youtube.com/watch?v=') || project.videoLink.includes('youtu.be/')) ? (
              <iframe 
                src={`https://www.youtube.com/embed/${project.videoLink.includes('v=') ? project.videoLink.split('v=')[1].split('&')[0] : project.videoLink.split('/').pop()}`}
                className="w-full h-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : project.videoLink && project.videoLink.match(/\.(mp4|webm|ogg)$/i) ? (
              <video 
                src={project.videoLink} 
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            ) : (
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            
            {/* Decorative Glow */}
            <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[120px] pointer-events-none opacity-50 bg-cyan-500`}></div>
            <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[120px] pointer-events-none opacity-30 bg-purple-500`}></div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
