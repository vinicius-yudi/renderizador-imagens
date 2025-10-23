
import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageViewer from './components/ImageViewer';
import type { RenderOptions, ImageFile } from './types';
import { enhanceImageWithGemini } from './services/geminiService';

export default function App() {
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-gray-800/50 rounded-2xl shadow-lg p-6 h-fit sticky top-8">
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