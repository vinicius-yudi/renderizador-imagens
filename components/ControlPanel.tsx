
import React, { useState, useCallback, useRef } from 'react';
import type { RenderOptions, RenderMode, LightingStyle, ImageFile } from '../types';
import { LIGHTING_OPTIONS, RENDER_MODES } from '../constants';

interface ControlPanelProps {
  onGenerate: (options: RenderOptions) => void;
  onImageUpload: (image: ImageFile) => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerate, onImageUpload, isLoading }) => {
  const [renderMode, setRenderMode] = useState<RenderMode>(RENDER_MODES[0].id);
  const [lightingStyle, setLightingStyle] = useState<LightingStyle>(LIGHTING_OPTIONS[0]);
  const [addDecorations, setAddDecorations] = useState(false);
  const [decorStyle, setDecorStyle] = useState('');
  const [editPrompt, setEditPrompt] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        // The result includes the prefix `data:image/jpeg;base64,` which we need to remove for the API
        const base64 = url.split(',')[1];
        onImageUpload({ file, base64, url });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ renderMode, lightingStyle, addDecorations, decorStyle, editPrompt });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">Painel de Controle</h2>
        <p className="text-sm text-gray-400">Ajuste os parâmetros para seu render.</p>
      </div>
      
      <div>
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2">1. Imagem de Entrada</label>
        <div 
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-indigo-400 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-400">
              <p className="pl-1">{fileName ? `Arquivo: ${fileName}` : 'Clique para fazer o upload'}</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP até 10MB</p>
          </div>
        </div>
        <input ref={fileInputRef} id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
      </div>

      <div>
        <label htmlFor="render-mode" className="block text-sm font-medium text-gray-300">2. Modo de Operação</label>
        <select id="render-mode" value={renderMode} onChange={(e) => setRenderMode(e.target.value as RenderMode)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white">
          {RENDER_MODES.map(mode => (
            <option key={mode.id} value={mode.id}>{mode.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lighting-style" className="block text-sm font-medium text-gray-300">3. Estilo de Iluminação</label>
        <select id="lighting-style" value={lightingStyle} onChange={(e) => setLightingStyle(e.target.value as LightingStyle)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white">
          {LIGHTING_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input id="add-decorations" type="checkbox" checked={addDecorations} onChange={(e) => setAddDecorations(e.target.checked)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-500 rounded bg-gray-700" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="add-decorations" className="font-medium text-gray-300">4. Adicionar Decoração</label>
            <p className="text-gray-500">Adiciona objetos soltos para compor a cena.</p>
          </div>
        </div>
        {addDecorations && (
          <input type="text" value={decorStyle} onChange={(e) => setDecorStyle(e.target.value)} placeholder="Ex: moderno, minimalista, industrial" className="block w-full shadow-sm sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-500" />
        )}
      </div>
      
       <div>
        <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-300">5. Edição por Texto (Opcional)</label>
        <textarea id="edit-prompt" value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} rows={3} placeholder="Ex: Adicione um filtro retrô, mude a cor do vaso para azul" className="mt-1 shadow-sm block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>

      <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out">
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {isLoading ? 'Renderizando...' : 'Renderizar Imagem'}
      </button>
    </form>
  );
};

export default ControlPanel;
