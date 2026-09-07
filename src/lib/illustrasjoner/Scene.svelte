<script lang="ts">
	import type { Snippet } from 'svelte';
	import { STIL, LERRET } from './stil.js';

	interface Props {
		tittel: string;
		natt?: boolean;
		/** Hvor på lerretet horisonten ligger, som andel av høyden. */
		horisont?: number;
		children?: Snippet;
	}

	let { tittel, natt = false, horisont = 0.62, children }: Props = $props();
</script>

<figure class="scene" class:natt>
	<svg
		viewBox="0 0 {LERRET.b} {LERRET.h}"
		role="img"
		aria-label={tittel}
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<radialGradient id="glod">
				<stop offset="0%" stop-color="currentColor" stop-opacity="0.95" />
				<stop offset="45%" stop-color="currentColor" stop-opacity="0.35" />
				<stop offset="100%" stop-color="currentColor" stop-opacity="0" />
			</radialGradient>
		</defs>

		{#if natt}
			<rect width={LERRET.b} height={LERRET.h} fill={STIL.nattHimmel} />
			<rect
				y={LERRET.h * horisont}
				width={LERRET.b}
				height={LERRET.h * (1 - horisont)}
				fill={STIL.natt}
			/>
		{:else}
			<rect width={LERRET.b} height={LERRET.h} fill={STIL.sjo} />
		{/if}

		{@render children?.()}
	</svg>
	<figcaption>{tittel}</figcaption>
</figure>

<style>
	.scene {
		margin: 0;
	}
	svg {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 2px;
		border: 1px solid var(--blekk-svak);
	}
	figcaption {
		margin-top: 0.4rem;
		font-size: 0.8rem;
		color: var(--blekk-svak);
	}
</style>
