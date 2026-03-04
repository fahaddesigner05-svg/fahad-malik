
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Calendar, Tag, Info } from 'lucide-react';
import CustomCursor from './CustomCursor';

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
    <div className="min-h-screen bg-[#0b0c10] text-white selection:bg-cyan-500 selection:text-white cursor-none relative overflow-hidden">
      <CustomCursor />
      
      {/* Creative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none"></div>

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

      <main className="pt-24 min-h-screen flex flex-col lg:flex-row relative z-10">
        {/* Left Side: Details */}
        <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 inline-block px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20"
            >
              {project.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter"
            >
              {project.title}
            </motion.h1>
            
            <div className="space-y-10 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-6 group"
              >
                <div className="p-4 rounded-2xl bg-white/5 text-cyan-400 border border-white/10 group-hover:border-cyan-400/30 transition-colors shadow-lg">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg lg:text-xl font-medium">
                    {project.description}
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-6 group"
                >
                  <div className="p-4 rounded-2xl bg-white/5 text-purple-400 border border-white/10 group-hover:border-purple-400/30 transition-colors shadow-lg">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Category</h3>
                    <p className="font-bold text-white text-lg uppercase tracking-wider">{project.category}</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start space-x-6 group"
                >
                  <div className="p-4 rounded-2xl bg-white/5 text-emerald-400 border border-white/10 group-hover:border-emerald-400/30 transition-colors shadow-lg">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Completion Date</h3>
                    <p className="font-bold text-white text-lg">{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              {project.videoLink && !project.videoLink.match(/\.(mp4|webm|ogg)$/i) && !project.videoLink.includes('youtube.com') && !project.videoLink.includes('youtu.be') && (
                <a 
                  href={project.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 px-10 py-5 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/30 group"
                >
                  <span>Launch Project</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              
              <button 
                onClick={() => navigate('/projects')}
                className="inline-flex items-center space-x-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all group"
              >
                <span>View More Projects</span>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Media */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-12 min-h-[500px] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full max-h-[85vh] rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 relative group z-10"
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
            
            {/* Media Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </motion.div>
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-1/4 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
