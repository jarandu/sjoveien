import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	// Lar <script lang="ts"> i komponentene bli kompilert.
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// Appen har ingen server-avhengigheter, så alt kan prerendres til statiske
		// filer på Vercels CDN. Fremdrift ligger i nettleseren.
		prerender: { entries: ['*'] }
	}
};
