
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Users, 
  Eye, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Database,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'messages' | 'settings'>('dashboard');
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; error?: string }>({ connected: true });
  
  // Project Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    img: '',
    demoLink: '',
    color: 'cyan'
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      fetchMessages();
      fetchProjects();
      checkDbStatus();
    }
  }, [navigate]);

  const checkDbStatus = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (!result.success && result.error?.includes('MONGODB_URI')) {
        setDbStatus({ connected: false, error: 'MongoDB URI is missing. Please set it in .env.example' });
      } else if (!result.success) {
        setDbStatus({ connected: false, error: result.error });
      } else {
        setDbStatus({ connected: true });
      }
    } catch (error: any) {
      setDbStatus({ connected: false, error: error.message });
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleSeedData = async () => {
    if (!confirm('This will clear all existing projects and add sample data. Continue?')) return;
    
    setIsSeeding(true);
    setSeedStatus('loading');
    try {
      const response = await fetch('/api/projects/seed', { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        setSeedStatus('success');
        setTimeout(() => setSeedStatus('idle'), 3000);
        fetchProjects();
        alert('Sample projects seeded successfully!');
      } else {
        throw new Error(result.error || 'Failed to seed data');
      }
    } catch (error: any) {
      console.error('Seed Error:', error);
      setSeedStatus('error');
      alert(`Error: ${error.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const response = await fetch('/api/messages');
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (result.success) {
          setMessages(result.data);
        }
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        setMessages(messages.filter(m => m._id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        img: project.img,
        demoLink: project.demoLink || '',
        color: project.color || 'cyan'
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        img: '',
        demoLink: '',
        color: 'cyan'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProject ? 'PUT' : 'POST';
      const body = editingProject ? { ...formData, id: editingProject._id } : formData;
      
      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const result = await response.json();
      if (result.success) {
        fetchProjects();
        setIsModalOpen(false);
      } else {
        alert(result.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const stats = [
    { label: 'Total Views', value: '12,450', icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Project Clicks', value: '842', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Inquiries', value: messages.length.toString(), icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Active Projects', value: projects.length.toString(), icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col">
        <div className="p-8">
          <h2 className="text-xl font-black tracking-tighter">
            FAHAD<span className="text-cyan-400">ADMIN</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-400/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-400/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-400/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Messages</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-400/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-cyber">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm sticky top-0 z-20">
          <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            {activeTab === 'projects' && (
              <button 
                onClick={() => handleOpenModal()}
                className="p-2 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 transition-all border border-cyan-400/20"
              >
                <Plus className="w-5 h-5 text-cyan-400" />
              </button>
            )}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold">
              FM
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {activeTab === 'dashboard' && (
            <>
              {/* DB Status Warning */}
              {!dbStatus.connected && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center space-x-4 text-red-400"
                >
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Database Connection Error</p>
                    <p className="text-sm opacity-80">{dbStatus.error}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <button 
                  onClick={() => { fetchMessages(); fetchProjects(); checkDbStatus(); }}
                  className="text-cyan-400 text-sm font-bold hover:underline flex items-center space-x-1"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Refresh Stats</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full blur-3xl -mr-12 -mt-12 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black">{stat.value}</h3>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Messages Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel rounded-3xl border border-white/5 overflow-hidden"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recent Messages</h2>
                  <button 
                    onClick={() => setActiveTab('messages')}
                    className="text-cyan-400 text-sm font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Message</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loadingMessages ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-10 text-center text-gray-500 italic">Loading...</td>
                        </tr>
                      ) : messages.length > 0 ? (
                        messages.slice(0, 5).map((msg) => (
                          <tr key={msg._id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium">{msg.name}</td>
                            <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{msg.message}</td>
                            <td className="px-6 py-4 text-gray-500 text-xs">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-10 text-center text-gray-500 italic">No messages.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}

          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                <div className="flex space-x-4">
                  <button 
                    onClick={fetchProjects}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-sm"
                  >
                    Refresh
                  </button>
                  <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingProjects ? (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <div key={project._id} className="glass-panel rounded-2xl border border-white/5 overflow-hidden group">
                      <div className="h-40 relative">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <button 
                            onClick={() => handleOpenModal(project)}
                            className="p-2 rounded-lg bg-black/60 text-white hover:bg-cyan-500 hover:text-black transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteProject(project._id)}
                            className="p-2 rounded-lg bg-black/60 text-white hover:bg-red-500 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{project.category}</span>
                        <h3 className="text-lg font-bold mt-1">{project.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-2">{project.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-500 italic">
                    No projects found.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel rounded-3xl border border-white/5 overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold">All Messages</h2>
                <button 
                  onClick={fetchMessages}
                  className="text-cyan-400 text-sm font-bold hover:underline"
                >
                  Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loadingMessages ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">Loading...</td>
                      </tr>
                    ) : messages.length > 0 ? (
                      messages.map((msg) => (
                        <tr key={msg._id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 font-medium">{msg.name}</td>
                          <td className="px-6 py-4 text-gray-400">{msg.email}</td>
                          <td className="px-6 py-4 text-gray-400">{msg.message}</td>
                          <td className="px-6 py-4 text-gray-500 text-xs">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => deleteMessage(msg._id)}
                              className="p-2 rounded-lg hover:bg-red-400/10 text-red-400 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">No messages found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl space-y-8"
            >
              <div className="glass-panel p-8 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <span>Account Settings</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Username</label>
                    <input type="text" value="fahadmalik" disabled className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Password</label>
                    <input type="text" value="fahadmalik123" disabled className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 italic">Note: These credentials are currently hardcoded for security in this demo.</p>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span>Data Management</span>
                </h2>
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">Use these tools to reset or manage your portfolio data.</p>
                  <button 
                    onClick={handleSeedData}
                    disabled={isSeeding}
                    className="flex items-center space-x-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    <Database className="w-4 h-4" />
                    <span>{isSeeding ? 'Seeding...' : 'Seed Sample Projects'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel w-full max-w-2xl rounded-[32px] border border-white/10 overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSaveProject} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Project Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                  <input 
                    type="text" 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                  <input 
                    type="url" 
                    required
                    value={formData.img}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Demo Link (Optional)</label>
                  <input 
                    type="url" 
                    value={formData.demoLink}
                    onChange={(e) => setFormData({...formData, demoLink: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Dashboard;
