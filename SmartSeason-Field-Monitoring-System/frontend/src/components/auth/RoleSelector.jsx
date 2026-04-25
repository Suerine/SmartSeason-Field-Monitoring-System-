import React from 'react';

const RoleSelector = ({ isLogin, formData, onFormChange }) => {
  if (isLogin) return null;

  return (
    <div className="pt-4 flex flex-col gap-3 group animate-in fade-in transition-all duration-500">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        Critical: Assign Role
      </span>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onFormChange({ ...formData, role: 'agent' })}
          className={`py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
            formData.role === 'agent'
              ? 'bg-green-50 border-green-500 text-green-700 shadow-sm'
              : 'bg-transparent border-gray-100 text-gray-400 hover:border-green-200'
          }`}
        >
          Field Agent
        </button>
        <button
          type="button"
          onClick={() => onFormChange({ ...formData, role: 'admin' })}
          className={`py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
            formData.role === 'admin'
              ? 'bg-green-50 border-green-500 text-green-700 shadow-sm'
              : 'bg-transparent border-gray-100 text-gray-400 hover:border-green-200'
          }`}
        >
          Administrator
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
