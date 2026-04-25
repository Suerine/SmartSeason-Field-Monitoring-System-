import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormFields = ({
  isLogin,
  formData,
  onFormChange,
  showPassword,
  onShowPasswordToggle
}) => {
  return (
    <>
      {/* REGISTER ONLY: Name (Floating Label) */}
      {!isLogin && (
        <div
          className="relative pt-4 overflow-hidden transition-all duration-300 transform"
          style={{ maxHeight: isLogin ? '0' : '100px', opacity: isLogin ? 0 : 1 }}
        >
          <input
            id="name"
            type="text"
            required={!isLogin}
            value={formData.name}
            onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
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
          onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
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
          onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
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
          onClick={onShowPasswordToggle}
          className="absolute right-5 top-[2.1rem] text-gray-300 hover:text-green-500 transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </>
  );
};

export default FormFields;
