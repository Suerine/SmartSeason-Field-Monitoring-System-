import React from 'react';

const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <div className="mb-14 relative w-64 mx-auto p-1.5 bg-gray-100/80 rounded-2xl flex items-center border border-gray-200/50">
      <div
        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[0.8rem] shadow-sm transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isLogin ? 'left-1.5' : 'left-[50%]'
        }`}
      />
      <button
        onClick={() => onToggle(true)}
        className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl relative z-10 transition-colors duration-300 ${
          isLogin ? 'text-green-700' : 'text-gray-400'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onToggle(false)}
        className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl relative z-10 transition-colors duration-300 ${
          !isLogin ? 'text-green-700' : 'text-gray-400'
        }`}
      >
        Join
      </button>
    </div>
  );
};

export default AuthToggle;
