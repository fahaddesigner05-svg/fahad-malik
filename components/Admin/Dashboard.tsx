
import React, { useEffect } from 'react';
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
  ExternalLink
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const stats = [
    { label: 'Total Views', value: '12,450', icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Project Clicks', value: '842', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Inquiries', value: '24', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Active Projects', value: '12', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  const recentProjects = [
    { id: 1, name: 'Cyberpunk E-commerce', category: 'UI/UX Design', status: 'Published' },
    { id: 2, name: 'Neon Brand Identity', category: 'Graphic Design', status: 'Draft' },
    { id: 3, name: 'Futuristic Mobile App', category: 'Mobile UI', status: 'Published' },
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
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-cyan-600/10 text-cyan-400 border border-cyan-400/20">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Projects</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Messages</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
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
          <h1 className="text-xl font-bold">Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <Plus className="w-5 h-5 text-cyan-400" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold">
              FM
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
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

          {/* Projects Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel rounded-3xl border border-white/5 overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Projects</h2>
              <button className="text-cyan-400 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-gray-400">{project.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          project.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-cyan-400/10 text-cyan-400 transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-400/10 text-red-400 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/5"
            >
              <h2 className="text-xl font-bold mb-6">Activity Overview</h2>
              <div className="h-64 flex items-end space-x-4">
                {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.6 + (i * 0.05), duration: 1 }}
                      className={`w-full rounded-t-lg bg-gradient-to-t ${i % 2 === 0 ? 'from-cyan-600 to-cyan-400' : 'from-purple-600 to-purple-400'}`}
                    ></motion.div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 rounded-3xl border border-white/5"
            >
              <h2 className="text-xl font-bold mb-6">Quick Links</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="font-medium">View Live Site</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-all" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-400/10 text-purple-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="font-medium">User Feedback</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-all" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Dashboard;
