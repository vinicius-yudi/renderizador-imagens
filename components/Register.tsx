import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import GoogleIcon from './icons/GoogleIcon';

interface RegisterProps {
  onGoToLogin: () => void;
  onGoHome: () => void;
}

const Register: React.FC<RegisterProps> = ({ onGoToLogin, onGoHome }) => {
    const handleAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert('Função de registro ainda não implementada.');
    };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <header className="absolute top-0 left-0 p-6 z-20">
        <div 
          className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80"
          onClick={onGoHome}
        >
          <SparklesIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            RenderKeeper
          </h1>
        </div>
      </header>

      <main className="w-full max-w-md mx-auto z-10">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-2">Crie sua conta</h2>
          <p className="text-center text-gray-400 mb-6">Comece a transformar seus renders.</p>
          
          <form className="space-y-4">
             <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-300">Nome Completo</label>
              <input type="text" id="fullname" name="fullname" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-300">Senha</label>
              <input type="password" id="password" name="password" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button
                onClick={handleAuthClick}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              Registrar
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">OU</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button
                onClick={handleAuthClick}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              Registre-se com Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Já tem uma conta?{' '}
            <button onClick={onGoToLogin} className="font-medium text-indigo-400 hover:text-indigo-300">
              Faça login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
