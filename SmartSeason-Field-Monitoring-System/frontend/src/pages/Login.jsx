import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { API_PATHS } from '../utils/apiPaths';
import { 
  Eye, EyeOff, Mail, Lock, User, ShieldCheck, 
  Leaf, Globe, ArrowRight
} from 'lucide-react';

import logo from '../assets/shambaRecords-logo.svg';

const Auth = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agent'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const endpoint = isLogin ? API_PATHS.AUTH.LOGIN : API_PATHS.AUTH.REGISTER;
      const { data } = await api.post(endpoint, formData);
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden font-sans">
      
      {/* LEFT SIDE: Brand/Atmosphere (Digital Agriculture Graphic) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-green-950 items-center justify-center p-12 overflow-hidden shadow-2xl">
        
        {/* Futuristic Topological Map Visualization */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Soil Texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="topo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
              </linearGradient>
            </defs>
            <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
            
            <path d="M0,450 C300,200 600,600 1000,450 L1000,1000 L0,1000 Z" fill="url(#topo)" />
            <path d="M0,550 C350,350 650,750 1000,550 L1000,1000 L0,1000 Z" fill="rgba(22,163,74,0.03)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 blur-[60px] opacity-20"></div>
              <div className="relative w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 backdrop-blur-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
                <img src={logo} alt="SmartSeason Logo" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-white tracking-tight mb-4 uppercase">
            SmartSeason
          </h1>
          <p className="text-green-400 text-2xl font-light tracking-widest mb-10 opacity-90">
            CONNECTING DATA TO THE FIELD
          </p>
          
          <div className="flex justify-center gap-8 mt-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-7 h-7 text-green-500" />
              </div>
              <span className="text-[10px] text-green-400/50 font-black uppercase tracking-[0.2em]">Secure Access</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Globe className="w-7 h-7 text-green-500" />
              </div>
              <span className="text-[10px] text-green-400/50 font-black uppercase tracking-[0.2em]">Global Sync</span>
            </div>
          </div>
        </div>

        {/* Floating Forensic Elements */}
        <div className="absolute bottom-12 right-12 text-white/5 text-[150px] font-black pointer-events-none select-none leading-none">
          AGRI_OS
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white shrink-0 relative">
        <div className="w-full max-w-md">
          
          {/* Interaction: Clean Pill Toggle */}
          <div className="mb-14 relative w-64 mx-auto p-1.5 bg-gray-100/80 rounded-2xl flex items-center border border-gray-200/50">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[0.8rem] shadow-sm transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isLogin ? 'left-1.5' : 'left-[50%]'}`} 
            />
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl relative z-10 transition-colors duration-300 ${isLogin ? 'text-green-700' : 'text-gray-400'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl relative z-10 transition-colors duration-300 ${!isLogin ? 'text-green-700' : 'text-gray-400'}`}
            >
              Join
            </button>
          </div>

          <div className="mb-10 text-left">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Network'}
            </h2>
            <p className="text-gray-500 font-medium">
              {isLogin ? 'Authorize your terminal to continue monitoring.' : 'Create your credentials to manage field integrity.'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl text-xs font-bold leading-relaxed transition-all">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* REGISTER ONLY: Name (Floating Label) */}
            {!isLogin && (
              <div className="relative pt-4 overflow-hidden transition-all duration-300 transform" style={{ maxHeight: isLogin ? '0' : '100px', opacity: isLogin ? 0 : 1 }}>
                <input 
                  id="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="peer w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-0 focus:border-green-500 transition-all placeholder-transparent"
                  placeholder="Full Name"
                />
                <label 
                  htmlFor="name"
                  className="absolute left-5 top-8 text-gray-400 text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-green-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px]"
                >
                  Full Name
                </label>
              </div>
            )}

            {/* Email (Floating Label) */}
            <div className="relative pt-4">
              <input 
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="peer w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-0 focus:border-green-500 transition-all placeholder-transparent"
                placeholder="Email Address"
              />
              <label 
                htmlFor="email"
                className="absolute left-5 top-8 text-gray-400 text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-green-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px]"
              >
                System Email
              </label>
            </div>

            {/* Password (Floating Label) */}
            <div className="relative pt-4">
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="peer w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-0 focus:border-green-500 transition-all placeholder-transparent pr-12"
                placeholder="Password"
              />
              <label 
                htmlFor="password"
                className="absolute left-5 top-8 text-gray-400 text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-green-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px]"
              >
                Access Key
              </label>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-[2.1rem] text-gray-300 hover:text-green-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* REGISTER ONLY: Role Selector */}
            {!isLogin && (
              <div className="pt-4 flex flex-col gap-3 group animate-in fade-in transition-all duration-500">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Critical: Assign Role</span>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'agent'})}
                    className={`py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.role === 'agent' ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' : 'bg-transparent border-gray-100 text-gray-400 hover:border-green-200'}`}
                  >
                    Field Agent
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'admin'})}
                    className={`py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.role === 'admin' ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' : 'bg-transparent border-gray-100 text-gray-400 hover:border-green-200'}`}
                  >
                    Administrator
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-[10px] font-black text-green-600 hover:text-green-700 tracking-widest uppercase">
                  Forgot Access Key?
                </button>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-black py-5 rounded-2xl hover:bg-green-700 hover:shadow-2xl hover:shadow-green-200/50 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden mt-4"
            >
              <span className="relative z-10 text-xs tracking-widest uppercase">{loading ? 'Processing...' : (isLogin ? 'Authorize Terminal' : 'Register Operator')}</span>
              {!loading && <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          {/* Social Sign-In Options */}
          <div className="mt-12">
            <div className="relative mb-8 flex items-center">
              <div className="flex-1 border-t border-gray-100"></div>
              <span className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">SaaS Intelligence Connector</span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center w-full py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all group">
                <svg className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all group">
                <svg className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100" viewBox="0 0 24 24" fill="#0072C6">
                  <path d="M11.4 24l-3.5-3.5h-3.5l-3.5-3.5v-3.5l10.5-13.5h7l6.5 6.5v10.5l-6.5 6.5h-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Auth;