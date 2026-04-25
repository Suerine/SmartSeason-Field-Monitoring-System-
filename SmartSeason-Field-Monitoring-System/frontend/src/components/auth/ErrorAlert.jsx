import React from 'react';

const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl text-xs font-bold leading-relaxed transition-all">
      {error}
    </div>
  );
};

export default ErrorAlert;
