<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const lenker = [
		{ href: '/', tekst: 'Øv' },
		{ href: '/eksamen', tekst: 'Prøve' }
	];

	/**
	 * Sider som viser mange elementer ved siden av hverandre får full bredde.
	 * Oppgavesidene beholder den smale lesespalten – lange linjer er tunge å
	 * lese, og et spørsmål skal ligge rolig midt på skjermen.
	 */
	const VIDE: string[] = ['/', '/tegninger'];
	const vid = $derived(VIDE.includes(page.url.pathname));
</script>

<div class="ramme" class:vid>
	<header>
		<a class="merke" href="/">
			<svg viewBox="0 0 20 24" aria-hidden="true" width="16" height="19">
				<polygon points="10,1 4,10 16,10" fill="var(--gul)" />
				<polygon points="10,13 4,22 16,22" fill="var(--gul)" />
			</svg>
			Sjøveien
		</a>
		<nav>
			{#each lenker as l}
				<a href={l.href} aria-current={page.url.pathname === l.href ? 'page' : undefined}>
					{l.tekst}
				</a>
			{/each}
		</nav>
	</header>

	<main>{@render children()}</main>

	<footer>
		Øvingsoppgaver til båtførerprøven. Pensuminndelingen følger Sjøfartsdirektoratets pensumliste.
		Appen er ikke tilknyttet Sjøfartsdirektoratet eller Norsk Test.
	</footer>
</div>

<style>
	.ramme {
		max-width: var(--spalte);
		margin: 0 auto;
		padding: var(--s4) var(--s4) var(--s7);
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}
	.ramme.vid {
		max-width: var(--vid);
	}
	@media (min-width: 60rem) {
		.ramme.vid {
			padding-left: var(--s6);
			padding-right: var(--s6);
		}
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: var(--s4);
		border-bottom: var(--kant);
		margin-bottom: var(--s5);
	}
	.merke {
		display: inline-flex;
		align-items: center;
		gap: var(--s2);
		font-weight: 700;
		letter-spacing: -0.02em;
		text-decoration: none;
	}
	nav {
		display: flex;
		gap: var(--s4);
		font-size: var(--t-s);
	}
	nav a {
		text-decoration: none;
		color: var(--blekk-dempet);
		padding-bottom: 2px;
	}
	nav a[aria-current='page'] {
		color: var(--blekk);
		border-bottom: 2px solid var(--gul);
	}
	main {
		flex: 1;
	}
	footer {
		margin-top: var(--s7);
		padding-top: var(--s4);
		border-top: var(--kant);
		font-size: var(--t-xs);
		color: var(--blekk-svak);
	}
</style>
