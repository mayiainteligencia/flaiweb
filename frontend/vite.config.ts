import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
// Importar un tipo activa el `declare module 'vite'` que añade `ssgOptions`.
import type { ViteReactSSGOptions } from 'vite-react-ssg';
import { PAGES, canonicalOf } from './src/seo/pages';

const OUT = resolve(fileURLToPath(new URL('./dist', import.meta.url)));

// Sitemap derivado de pages.ts (fuente única). Escala al agregar páginas.
// lastmod solo si la página lo define (no la fecha del build → evita señal falsa).
function generateSitemap() {
  const urls = PAGES.filter((p) => p.sitemap)
    .map((p) => {
      const loc = canonicalOf(p);
      const lastmod = p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : '';
      return `  <url><loc>${loc}</loc>${lastmod}<xhtml:link rel="alternate" hreflang="es-MX" href="${loc}"/></url>`;
    })
    .join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  writeFileSync(resolve(OUT, 'sitemap.xml'), xml);
}

const ssgOptions: ViteReactSSGOptions = {
  // Nested: /precios -> dist/precios/index.html
  dirStyle: 'nested',
  onFinished() {
    generateSitemap();
    // 404 real: copia el HTML prerenderizado de /404 a dist/404.html
    const src = resolve(OUT, '404/index.html');
    if (existsSync(src)) copyFileSync(src, resolve(OUT, '404.html'));
    console.log(`[ssg] sitemap.xml (${PAGES.filter((p) => p.sitemap).length} urls) + 404.html`);
  },
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.glb'],
  ssgOptions,
});
