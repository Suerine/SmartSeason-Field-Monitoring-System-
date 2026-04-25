import React from 'react';
import { ArrowRight } from 'lucide-react';

const SubmitButton = ({ isLogin, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-green-600 text-white font-black py-5 rounded-2xl hover:bg-green-700 hover:shadow-2xl hover:shadow-green-200/50 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden mt-4"
    >
      <span className="relative z-10 text-xs tracking-widest uppercase">
        {loading ? 'Processing...' : isLogin ? 'Authorize Terminal' : 'Register Operator'}
      </span>
      {!loading && (
        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
      )}
    </button>
  );
};

export default SubmitButton;
