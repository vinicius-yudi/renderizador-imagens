import React, { useState } from 'react';
import type { RenderOptions, ImageFile } from './types';
import { enhanceImageWithGemini } from './services/geminiService';

// Import Components
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageViewer from './components/ImageViewer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  // App state to manage view
  const [view, setView] = useState<'home' | 'app' | 'login' | 'register'>('home');

  // Existing states for the main app
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (image: ImageFile) => {
    setOriginalImage(image);
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerate = async (options: RenderOptions) => {
    if (!originalImage) {
      setError("Por favor, faça o upload de uma imagem primeiro.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const resultBase64 = await enhanceImageWithGemini(originalImage, options);
      if (resultBase64) {
        setGeneratedImageUrl(`data:image/png;base64,${resultBase64}`);
      } else {
        setError("Não foi possível gerar a imagem. A resposta da API estava vazia.");
      }
    } catch (e) {
      console.error(e);
      setError(`Ocorreu um erro: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStart = () => setView('app');
  const handleGoToLogin = () => setView('login');
  const handleGoToRegister = () => setView('register');

  const handleGoHome = () => {
    setView('home');
    setOriginalImage(null);
    setGeneratedImageUrl(null);
    setIsLoading(false);
    setError(null);
  };

  if (view === 'home') {
    return <Home onStart={handleStart} onLogin={handleGoToLogin} onRegister={handleGoToRegister} />;
  }
  
  if (view === 'login') {
    return <Login onGoToRegister={handleGoToRegister} onGoHome={handleGoHome} />;
  }

  if (view === 'register') {
    return <Register onGoToLogin={handleGoToLogin} onGoHome={handleGoHome} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header onGoHome={handleGoHome} />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-gray-800/50 rounded-2xl shadow-lg p-6 h-fit lg:sticky top-8">
          <ControlPanel 
            onGenerate={handleGenerate} 
            onImageUpload={handleImageUpload}
            isLoading={isLoading} 
          />
        </div>
        <div className="lg:col-span-3">
          <ImageViewer 
            originalImageUrl={originalImage?.url || null}
            generatedImageUrl={generatedImageUrl}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}