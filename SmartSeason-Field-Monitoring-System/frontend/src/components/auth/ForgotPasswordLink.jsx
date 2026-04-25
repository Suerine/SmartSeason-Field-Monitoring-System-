import React from 'react';

const ForgotPasswordLink = ({ isLogin }) => {
  if (!isLogin) return null;

  return (
    <div className="flex justify-end">
      <button
        type="button"
        className="text-[10px] font-black text-green-600 hover:text-green-700 tracking-widest uppercase"
      >
        Forgot Access Key?
      </button>
    </div>
  );
};

export default ForgotPasswordLink;
