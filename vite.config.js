import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Custom Vite plugin to copy static assets (images, PDFs, robots.txt, sitemap.xml)
 * into the dist/ directory on build, ensuring zero asset loss.
 */
function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const rootFiles = ['robots.txt', 'sitemap.xml', 'favicon.ico'];
      for (const file of rootFiles) {
        if (fs.existsSync(file)) {
          fs.copyFileSync(file, path.resolve('dist', file));
        }
      }
      if (fs.existsSync('images')) {
        fs.cpSync('images', path.resolve('dist', 'images'), { recursive: true });
      }
      if (fs.existsSync('css')) {
        fs.cpSync('css', path.resolve('dist', 'css'), { recursive: true });
      }
      if (fs.existsSync('js')) {
        fs.cpSync('js', path.resolve('dist', 'js'), { recursive: true });
      }
    }
  };
}

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    host: true
  },
  plugins: [copyStaticAssets()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
