import React from 'react';
import { ShieldCheck, Globe, LayoutDashboard } from 'lucide-react';
import logo from '../../assets/shambaRecords-logo.svg';

const BrandSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-green-950 items-center justify-center p-12 overflow-hidden shadow-2xl">
      {/* Futuristic Topological Map Visualization */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Soil Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="topo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
            </linearGradient>
          </defs>
          <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />

          <path
            d="M0,450 C300,200 600,600 1000,450 L1000,1000 L0,1000 Z"
            fill="url(#topo)"
          />
          <path
            d="M0,550 C350,350 650,750 1000,550 L1000,1000 L0,1000 Z"
            fill="rgba(22,163,74,0.03)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-lg text-center">
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 blur-[60px] opacity-20"></div>
            <div className="relative w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 backdrop-blur-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
              <img
                src={logo}
                alt="SmartSeason Logo"
                className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              />
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
              <LayoutDashboard className="w-7 h-7 text-green-500"/>
            </div>
            <span className="text-[10px] text-green-400/50 font-black uppercase tracking-[0.2em]">
              Clean Dashboard
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <Globe className="w-7 h-7 text-green-500"/>
            </div>
            <span className="text-[10px] text-green-400/50 font-black uppercase tracking-[0.2em]">
              Access Anywhere
            </span>
          </div>
        </div>
      </div>

      {/* Floating Forensic Elements */}
      <div className="absolute bottom-12 right-12 text-white/5 text-[100px] font-black pointer-events-none select-none leading-none">
        AGRI_TECH
      </div>
    </div>
  );
};

export default BrandSidebar;
