
import { GoogleGenAI, Modality } from "@google/genai";
import type { RenderOptions, ImageFile } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(options: RenderOptions): string {
  const { renderMode, lightingStyle, addDecorations, decorStyle, editPrompt } = options;

  let prompt = `Você é o RenderKeeper, uma IA especialista em visualização arquitetônica fotorrealista. Sua tarefa é aprimorar a imagem fornecida, seguindo estritamente os parâmetros do usuário e um conjunto de regras invioláveis.

REGRAS INVIOLÁVEIS (CRÍTICO):
1.  **NÃO MOVA, REDIMENSIONE OU SUBSTITUA** nenhum dos seguintes elementos FIXOS: armários, portas, gavetas, puxadores, eletrodomésticos, bancadas, ilhas, painéis, sancas, esquadrias, pisos fixos, paredes, nichos, detalhes de teto, rodapés ou instalações elétricas/hidráulicas visíveis.
2.  **NÃO ALTERE** acabamentos já estabelecidos: o tipo de madeira/cor, laminados, pedras, metais, cores de tinta ou revestimentos devem permanecer os mesmos em essência, apenas melhorando seu realismo.
3.  **SEM MUDANÇAS DE LAYOUT.** **NÃO INVENTE** novos armários ou elementos fixos que não existam na imagem original.

DIRETRIZES DE FOTORREALISMO (ESSENCIAL):
- **Materiais e Texturas:** Renderize materiais com realismo absoluto. Use texturas de alta resolução e shaders complexos. Simule reflexos precisos (incluindo Fresnel), rugosidade de superfície, e micro-imperfeições (leves arranhões, poeira, variações sutis de cor) que quebram a perfeição do "CG". A madeira deve ter veios visíveis, tecidos devem ter trama, e metais devem ter reflexos realistas.
- **Iluminação Avançada:** Vá além do básico. Implemente iluminação global (Global Illumination) para bounces de luz realistas. As sombras devem ser suaves e ter penumbras corretas. Onde a luz atravessa vidro ou líquidos, considere cáusticos sutis. A luz deve interagir com os materiais de forma crível.
- **Efeitos de Câmera:** Simule uma câmera fotográfica profissional. Aplique uma profundidade de campo (Depth of Field) sutil para dar foco e desfoque natural ao fundo. Evite efeitos exagerados.
- **Pós-produção e Cor:** A imagem final deve ter uma gradação de cor (color grading) cinematográfica e profissional. O contraste deve ser equilibrado, com pretos profundos e brancos brilhantes, mas sem estourar ou perder detalhes nas sombras.
- **Regra de Ouro:** O objetivo final é uma imagem que seja indistinguível de uma fotografia. EVITE A TODO CUSTO QUALQUER APARÊNCIA ESTILIZADA, "PLASTIFICADA", "LAVADA" OU DE DESENHO ANIMADO (CARTOONISH).

INSTRUÇÕES DO USUÁRIO:
- **Modo de Operação:** ${renderMode === 'enhance' ? 'Melhorar Render Existente' : 'Renderizar a partir de Viewport 3D'}.
- **Estilo de Iluminação:** Aplique uma iluminação fotorrealista que corresponda a esta descrição: "${lightingStyle}". Foque em iluminação global realista, sombras suaves e reflexos de luz precisos.
`;

  if (addDecorations) {
    prompt += `- **Decoração (Adicionar):** Adicione decorações de bom gosto e não permanentes que se encaixem no estilo "${decorStyle || 'moderno e minimalista'}". Decorações permitidas incluem: objetos soltos como vasos, livros, quadros apoiados, plantas, cadeiras/banquetas móveis, tapetes, louças, luminárias de mesa, velas e bandejas. NÃO adicione itens fixos.\n`;
  }

  if (editPrompt) {
    prompt += `- **Edição Específica do Usuário:** Aplique esta solicitação específica: "${editPrompt}".\n`;
  }

  prompt += `
INSTRUÇÃO FINAL:
Produza uma única imagem fotorrealista de altíssima fidelidade que siga rigorosamente todas as regras e diretrizes acima. A imagem final deve parecer uma fotografia de arquitetura profissional, mantendo 100% de fidelidade ao projeto original (layout, módulos, medidas aparentes, acabamentos definidos). O realismo é o critério mais importante.`;

  return prompt;
}

export const enhanceImageWithGemini = async (image: ImageFile, options: RenderOptions): Promise<string | null> => {
  const prompt = buildPrompt(options);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: image.base64,
            mimeType: image.file.type,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });
  
  const firstPart = response.candidates?.[0]?.content?.parts?.[0];

  if (firstPart && firstPart.inlineData) {
    return firstPart.inlineData.data;
  }

  return null;
};
