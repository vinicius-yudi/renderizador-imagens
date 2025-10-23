
import type { RENDER_MODES, LIGHTING_OPTIONS } from './constants';

export type RenderMode = typeof RENDER_MODES[number]['id'];
export type LightingStyle = typeof LIGHTING_OPTIONS[number];

export interface RenderOptions {
    renderMode: RenderMode;
    lightingStyle: LightingStyle;
    addDecorations: boolean;
    decorStyle: string;
    editPrompt: string;
}

export interface ImageFile {
    file: File;
    base64: string; // The base64 string without the data URL prefix
    url: string; // The data URL for display purposes
}
