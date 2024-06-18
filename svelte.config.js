import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // adapter-vercel options
    }),
    // Svelte compiler options
    target: '#svelte', // This is required in kit configuration
    compilerOptions: {
      customElement: true,
      // other compiler options can be set here
    },
  },
};
