import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, X, Globe, Code, Layers, Layout, User, Calendar } from 'lucide-react';
import { SiFigma, SiCanva, SiSketch, SiInvision, SiFramer, SiReact, SiWordpress, SiElementor, SiWebflow, SiWix, SiShopify } from 'react-icons/si';
import { DiPhotoshop, DiIllustrator } from 'react-icons/di';

interface ProjectData {
  _id: string;
  title: string;
  category: string;
  img: string;
  images?: string[];
  coverImg?: string;
  color: string;
  description: string;
  videoLink?: string;
  createdAt: string;
  role?: string;
  timeline?: string;
  goals?: string[];
  techStack?: { name: string; iconType: string }[];
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current || isHovering || loading || error || !project) return;

    let animationFrameId: number;
    const scrollContainer = scrollContainerRef.current;

    const scrollStep = () => {
      if (scrollContainer) {
        scrollContainer.scrollTop += 1;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering, loading, error, project]);

  const getIcon = (name: string, type: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('photoshop')) return <DiPhotoshop className="w-4 h-4" />;
    if (lowerName.includes('figma')) return <SiFigma className="w-4 h-4" />;
    if (lowerName.includes('illustrator') || lowerName.includes('illustrater')) return <DiIllustrator className="w-4 h-4" />;
    if (lowerName.includes('canva')) return <SiCanva className="w-4 h-4" />;
    if (lowerName.includes('sketch')) return <SiSketch className="w-4 h-4" />;
    if (lowerName.includes('invision')) return <SiInvision className="w-4 h-4" />;
    if (lowerName.includes('framer')) return <SiFramer className="w-4 h-4" />;
    if (lowerName.includes('react')) return <SiReact className="w-4 h-4" />;
    if (lowerName.includes('wordpress')) return <SiWordpress className="w-4 h-4" />;
    if (lowerName.includes('elementor')) return <SiElementor className="w-4 h-4" />;
    if (lowerName.includes('webflow')) return <SiWebflow className="w-4 h-4" />;
    if (lowerName.includes('wix')) return <SiWix className="w-4 h-4" />;
    if (lowerName.includes('shopify')) return <SiShopify className="w-4 h-4" />;

    switch (type) {
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const foundProject = result.data.find((p: ProjectData) => String(p._id) === String(id));
          if (foundProject) {
            setProject(foundProject);
          } else {
            throw new Error('Project not found in database');
          }
        } else {
          throw new Error(result.error || 'Failed to fetch projects');
        }
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0b0c10] flex items-center justify-center z-[200]">
        <div className="text-cyan-400 font-bold animate-pulse">Loading Project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="fixed inset-0 bg-[#0b0c10] flex flex-col items-center justify-center p-6 text-center z-[200]">
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
    <div className="fixed inset-0 bg-[#0b0c10] text-white selection:bg-cyan-500 selection:text-white z-[100] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden scrollbar-hide">
      {/* Global Background Mesh Gradient & Grain */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Mesh Glows */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-cyan-500/[0.08] rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-indigo-600/[0.12] rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-[20%] left-[10%] w-[80%] h-[50%] bg-cyan-600/[0.05] rounded-full blur-[130px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-indigo-500/[0.05] rounded-full blur-[100px]"></div>
        
        {/* Noise Overlay for Premium Texture */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        iframe, video {
          cursor: auto !important;
        }
      `}</style>
      
      {/* Close Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-4 right-4 lg:top-8 lg:right-8 z-[150] w-10 h-10 lg:w-12 lg:h-12 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-full flex items-center justify-center text-white hover:bg-red-500/20 hover:scale-110 transition-all duration-300 group"
      >
        <X className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Left Column: Project Info */}
      <div className="w-full lg:w-[45%] h-auto lg:h-full overflow-y-visible lg:overflow-y-auto p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5 scrollbar-hide relative bg-transparent z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto lg:mx-0 relative z-10 flex flex-col min-h-full"
        >
          {/* Category Tag */}
          <div 
            onClick={() => navigate('/projects', { state: { category: project.category } })}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-white/10 backdrop-blur-md shadow-lg w-fit relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px] relative z-10">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-black mb-12 leading-[0.9] tracking-tighter uppercase text-white">
            {project.title}
          </h1>

          {/* Role & Timeline Grid */}
          <div className="relative mb-16 p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-md shadow-2xl group overflow-hidden">
            {/* Animated Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700"></div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-xl transition-all duration-700 group-hover:w-full group-hover:h-full group-hover:border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/30 rounded-br-xl transition-all duration-700 group-hover:w-full group-hover:h-full group-hover:border-purple-400"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
              <div className="group/item cursor-default">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-3 h-3 text-gray-500 group-hover/item:text-cyan-400 transition-colors duration-300" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover/item:text-cyan-400 transition-colors duration-300">Role</h3>
                </div>
                <div className="relative inline-block">
                  <p className="text-white font-black text-2xl tracking-tighter uppercase group-hover/item:text-cyan-400 transition-colors duration-300">
                    {project.role || 'Lead Designer'}
                  </p>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="absolute -bottom-1 left-0 h-[2px] bg-cyan-400/30"
                  />
                </div>
              </div>
              <div className="group/item cursor-default">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-3 h-3 text-gray-500 group-hover/item:text-purple-400 transition-colors duration-300" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover/item:text-purple-400 transition-colors duration-300">Timeline</h3>
                </div>
                <div className="relative inline-block">
                  <p className="text-white font-black text-2xl tracking-tighter uppercase group-hover/item:text-purple-400 transition-colors duration-300">
                    {project.timeline || (project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'March 2026')}
                  </p>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="absolute -bottom-1 left-0 h-[2px] bg-purple-400/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mb-16">
            <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">Project Overview</h3>
            <p className="text-white leading-relaxed text-lg font-medium tracking-tight whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Project Goals */}
          {project.goals && project.goals.length > 0 && (
            <div className="mb-16">
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-purple-400 mb-6">Project Goals</h3>
              <div className="space-y-4">
                {project.goals.map((goal, i) => (
                  <div key={i} className="flex items-start gap-4 text-gray-300 text-sm font-bold group">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0 transition-transform duration-300"></div>
                    <p className="group-hover:text-white transition-colors duration-300">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Design Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-16">
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">Design Stack</h3>
              <div className="flex flex-wrap gap-4">
                {project.techStack.map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300"
                  >
                    {getIcon(tech.name, tech.iconType)}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8">
            <button 
              onClick={() => navigate('/projects')}
              className="flex items-center justify-center space-x-4 w-full py-6 bg-cyan-600/20 border-2 border-cyan-400 text-cyan-400 font-black rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <span className="uppercase tracking-widest text-sm">View All Work</span>
              <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Project Media */}
      <div 
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-full lg:w-[55%] h-auto lg:h-full overflow-y-visible lg:overflow-y-auto scrollbar-hide bg-transparent z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col min-h-full"
        >
          {/* Main Media */}
          <div className="w-full flex items-center justify-center overflow-hidden">
            {project.videoLink && (project.videoLink.includes('youtube.com/watch?v=') || project.videoLink.includes('youtu.be/')) ? (
              <div className="aspect-video w-full max-w-full">
                <iframe 
                  src={`https://www.youtube.com/embed/${project.videoLink.includes('v=') ? project.videoLink.split('v=')[1].split('&')[0] : project.videoLink.split('/').pop()}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : project.videoLink ? (
              <video 
                src={project.videoLink} 
                className="w-full h-auto"
                autoPlay
                muted
                loop
                playsInline
                controls
                onError={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.style.display = 'none';
                  const parent = video.parentElement;
                  if (parent) {
                    const img = document.createElement('img');
                    img.src = project.coverImg || project.img || 'https://picsum.photos/seed/error/800/600';
                    img.className = "w-full h-auto";
                    img.referrerPolicy = "no-referrer";
                    parent.appendChild(img);
                  }
                }}
              />
            ) : project.coverImg || project.img ? (
              <img 
                src={project.coverImg || project.img} 
                alt={project.title}
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            ) : null}
          </div>

          {/* Gallery Images */}
          {project.images && project.images
            .filter(img => img && img.trim() !== '' && img !== (project.coverImg || project.img))
            .map((img, idx) => (
            <div
              key={idx}
              className="w-full overflow-hidden group"
            >
              <img 
                src={img} 
                alt={`${project.title} - view ${idx + 1}`} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}

          {/* THANKS FOR WATCHING - Single Horizontal Line */}
          <div className="mt-auto py-20 flex items-center justify-center border-t border-white/5 px-4">
            <p className="text-cyan-400 hover:text-purple-400 font-black uppercase tracking-[0.4em] lg:tracking-[1.2em] text-[10px] lg:text-[11px] text-center transition-colors duration-700 cursor-default">
              THANKS FOR WATCHING
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
