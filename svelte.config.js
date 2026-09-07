import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		// Runtime settes eksplisitt slik at bygget ikke avhenger av hvilken
		// Node-versjon utvikleren tilfeldigvis har lokalt. Alt prerendres
		// uansett, så runtime brukes i praksis ikke.
		adapter: adapter({ runtime: 'nodejs22.x' }),
		// Appen har ingen server-avhengigheter, så alt kan prerendres til statiske
		// filer på Vercels CDN. Fremdrift ligger i nettleseren.
		prerender: { entries: ['*'] }
	}
};
