// Acento tricolor (bandera de México): verde → gris → rojo, ciclado por índice.
// Da a cada recuadro una barra lateral de color + glow al hover en el mismo tono.
const ACCENTS = [
  'border-l-[3px] border-l-status-ok hover:shadow-[0_0_40px_-14px] hover:shadow-status-ok/50',
  'border-l-[3px] border-l-text-secondary hover:shadow-[0_0_40px_-14px] hover:shadow-text-secondary/40',
  'border-l-[3px] border-l-accent hover:shadow-[0_0_40px_-14px] hover:shadow-accent/50',
];

export const flagAccent = (i: number) => ACCENTS[i % ACCENTS.length];
