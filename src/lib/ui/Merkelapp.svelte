<script lang="ts">
	import type { Niva } from '$lib/typer.js';

	interface Props {
		tekst: string;
		/** Farger lappen etter vanskelighetsgrad. */
		niva?: Niva | null;
	}

	let { tekst, niva = null }: Props = $props();
</script>

<span class="merkelapp" style={niva ? `--f: var(--niva-${niva})` : ''} class:niva>{tekst}</span>

<style>
	.merkelapp {
		display: inline-block;
		font-size: var(--t-xs);
		font-weight: 500;
		color: var(--blekk-dempet);
		border: var(--kant);
		border-radius: 999px;
		padding: 0.1rem var(--s2);
		white-space: nowrap;
	}
	.niva {
		color: var(--f);
		border-color: var(--f);
	}
</style>
