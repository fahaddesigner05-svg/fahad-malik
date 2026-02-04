
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-xl font-black tracking-tighter mb-2">FAHAD<span className="text-cyan-400">.</span></div>
            <p className="text-sm text-gray-500">Crafting digital experiences that matter.</p>
          </div>
          
          <div className="text-sm text-gray-500 flex flex-col items-center md:items-end">
            <p className="mb-2">© {new Date().getFullYear()} Fahad Malik. All Rights Reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
