
import React from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageViewerProps {
  originalImageUrl: string | null;
  generatedImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageBox: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode; isLoading?: boolean }> = ({ title, imageUrl, children, isLoading }) => (
  <div className="w-full">
    <h3 className="text-lg font-semibold text-center mb-4 text-gray-400">{title}</h3>
    <div className="aspect-[4/3] bg-gray-800/50 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-700">
      {imageUrl && <img src={imageUrl} alt={title} className="object-contain w-full h-full" />}
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10">
          <svg className="animate-spin h-10 w-10 text-white mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Renderizando...</span>
          <span className="text-sm text-gray-400 mt-1">Isso pode levar um momento.</span>
        </div>
      )}
    </div>
  </div>
);

const ImageViewer: React.FC<ImageViewerProps> = ({ originalImageUrl, generatedImageUrl, isLoading, error }) => {
  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageBox title="Original" imageUrl={originalImageUrl}>
          {!originalImageUrl && (
            <div className="text-center text-gray-500">
              <UploadIcon className="mx-auto h-16 w-16" />
              <p className="mt-2">Faça o upload de uma imagem para começar</p>
            </div>
          )}
        </ImageBox>
        <ImageBox title="Resultado" imageUrl={generatedImageUrl} isLoading={isLoading}>
          {!generatedImageUrl && !isLoading && (
            <div className="text-center text-gray-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5L14.25 10m-8.25 4.5l7.5 7.5 7.5-7.5m-15 0l7.5 7.5 7.5-7.5" />
                </svg>
              <p className="mt-2">Sua imagem renderizada aparecerá aqui</p>
            </div>
          )}
        </ImageBox>
      </div>
    </div>
  );
};

export default ImageViewer;