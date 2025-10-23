import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface HomeProps {
  onStart: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onLogin, onRegister }) => {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <nav className="absolute top-0 right-0 p-6 z-20">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onLogin} 
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Login
          </button>
          <button 
            onClick={onRegister} 
            className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
          >
            Registrar
          </button>
        </div>
      </nav>

      <main className="text-center z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <SparklesIcon className="w-12 h-12 text-indigo-400" />
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            RenderKeeper
          </h1>
        </div>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Transforme seus Renders em Obras de Arte Fotorrealistas com o poder da IA.
        </p>
        <p className="mt-2 text-sm max-w-2xl mx-auto text-gray-500">
          Faça o upload de um render básico ou de uma captura de tela de viewport 3D. Nossa IA aprimora a iluminação, os materiais e adiciona decorações, preservando a integridade do seu design.
        </p>
        <div className="mt-8">
          <button
            onClick={onStart}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
          >
            Começar Agora
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;