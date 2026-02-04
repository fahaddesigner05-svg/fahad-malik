
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto glass-panel rounded-[40px] overflow-hidden border border-white/10 flex flex-col md:flex-row">
        
        {/* Left: Info */}
        <div className="md:w-2/5 p-12 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border-r border-white/5">
          <h2 className="text-4xl font-black mb-8">Let's craft something <span className="text-cyan-400">Epic</span>.</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <i className="fas fa-envelope"></i>
               </div>
               <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Email Me</p>
                  <p className="font-semibold text-white">hello@fahadmalik.com</p>
               </div>
            </div>
            
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                  <i className="fas fa-phone"></i>
               </div>
               <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Call Me</p>
                  <p className="font-semibold text-white">+92 300 0000000</p>
               </div>
            </div>

            <div className="pt-10">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-4">Follow My Journey</p>
                <div className="flex space-x-4">
                   {['behance', 'dribbble', 'instagram', 'linkedin'].map(social => (
                       <a key={social} href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-600 transition-all">
                          <i className={`fab fa-${social}`}></i>
                       </a>
                   ))}
                </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:w-3/5 p-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Fahad Malik"
                      className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="fahad@design.com"
                      className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-colors" 
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Hey Fahad, I have a project..."
                  className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                ></textarea>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity transform active:scale-95 shadow-lg shadow-cyan-500/20">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
