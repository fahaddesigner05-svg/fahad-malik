
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, ArrowRight, Mail, KeyRound } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Forgot Password State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  const handleSendResetCode = async () => {
    setIsLoading(true);
    setForgotError('');
    setForgotSuccess('');
    try {
      const response = await fetch('/api/admin/forgot-password', { method: 'POST' });
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (result.success) {
          setForgotSuccess('Verification code sent to your email (fahaddesigner05@gmail.com)');
          setForgotStep('verify');
        } else {
          setForgotError(result.error || 'Failed to send code');
        }
      } else {
        const text = await response.text();
        setForgotError(`Server Error: ${text.substring(0, 100)}`);
      }
    } catch (error: any) {
      setForgotError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setForgotError('');
    setForgotSuccess('');
    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: resetCode, newPassword })
      });
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (result.success) {
          setForgotSuccess('Password reset successfully! You can now login.');
          setTimeout(() => {
            setIsForgotModalOpen(false);
            setForgotStep('request');
            setResetCode('');
            setNewPassword('');
            setForgotSuccess('');
          }, 2000);
        } else {
          setForgotError(result.error || 'Invalid code or expired');
        }
      } else {
        const text = await response.text();
        setForgotError(`Server Error: ${text.substring(0, 100)}`);
      }
    } catch (error: any) {
      setForgotError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] bg-cyber flex items-center justify-center px-4 admin-area relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black tracking-tighter text-white mb-2">
                Admin <span className="text-cyan-400">Portal</span>
              </h2>
              <p className="text-gray-400 text-sm">Welcome back, Fahad. Please sign in.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <button 
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs font-bold text-center"
                >
                  {error}
                </motion.p>
              )}

              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 text-sm hover:text-cyan-400 transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111216] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
              
              <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
              
              {forgotStep === 'request' ? (
                <>
                  <p className="text-gray-400 text-sm mb-6">
                    A verification code will be sent to your registered email address (fahaddesigner05@gmail.com).
                  </p>
                  
                  {forgotError && <p className="text-red-400 text-xs mb-4">{forgotError}</p>}
                  
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setIsForgotModalOpen(false)}
                      className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSendResetCode}
                      disabled={isLoading}
                      className="px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-600/30 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{isLoading ? 'Sending...' : 'Send Code'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-sm mb-6">
                    Enter the 6-digit code sent to your email and your new password.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Verification Code</label>
                      <div className="relative mt-1">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input 
                          type="text" 
                          value={resetCode}
                          onChange={(e) => setResetCode(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400"
                          placeholder="123456"
                          maxLength={6}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-400"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                  </div>

                  {forgotError && <p className="text-red-400 text-xs mb-4">{forgotError}</p>}
                  {forgotSuccess && <p className="text-emerald-400 text-xs mb-4">{forgotSuccess}</p>}

                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => {
                        setIsForgotModalOpen(false);
                        setForgotStep('request');
                      }}
                      className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleResetPassword}
                      disabled={isLoading || !resetCode || !newPassword}
                      className="px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-600/30 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
