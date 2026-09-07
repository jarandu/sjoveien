<script lang="ts">
	interface Props {
		verdi: number;
		av: number;
		/** Valgfri strek i sporet, f.eks. beståttgrensen. */
		merke?: number | null;
	}

	let { verdi, av, merke = null }: Props = $props();
	let andel = $derived(av ? Math.min(100, (verdi / av) * 100) : 0);
</script>

<div class="spor" role="progressbar" aria-valuenow={verdi} aria-valuemin="0" aria-valuemax={av}>
	<div class="fyll" style="width: {andel}%"></div>
	{#if merke !== null}
		<div class="grense" style="left: {(merke / av) * 100}%"></div>
	{/if}
</div>

<style>
	.spor {
		position: relative;
		height: 8px;
		background: var(--sjo);
		border-radius: 999px;
		overflow: hidden;
	}
	.fyll {
		height: 100%;
		background: var(--blekk);
	}
	.grense {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background: var(--magenta);
	}
</style>
