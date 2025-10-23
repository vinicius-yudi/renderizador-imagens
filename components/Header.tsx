
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
            <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                RenderKeeper
            </h1>
        </div>
      </div>
       <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
    </header>
  );
};

export default Header;
