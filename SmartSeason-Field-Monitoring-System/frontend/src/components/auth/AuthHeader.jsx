import React from 'react';

const AuthHeader = ({ isLogin }) => {
  return (
    <div className="mb-10 text-left">
      <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
        {isLogin ? 'Welcome Back' : 'Join the Network'}
      </h2>
      <p className="text-gray-500 font-medium">
        {isLogin
          ? 'Authorize your terminal to continue monitoring.'
          : 'Create your credentials to manage field integrity.'}
      </p>
    </div>
  );
};

export default AuthHeader;
