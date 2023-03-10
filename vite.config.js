import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [
    solidPlugin(),
    // monacoEditorPlugin()
  ],
  build: {
    target: 'esnext',
  },
});
