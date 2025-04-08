import React from 'react';

const AuthDecorativePanel = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-600 to-teal-500 text-white p-12 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/15 rounded-lg rotate-45 animate-float"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-4 max-w-lg">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg opacity-80">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthDecorativePanel;