// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import adapterStatic from '@sveltejs/adapter-static';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true, // Enable custom element mode
      },
    }),
  ],
  build: {
    // Set up the adapter for deployment
    adapter: adapterStatic(),
    // Specify other build options as needed
  },
});
