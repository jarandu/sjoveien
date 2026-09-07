<script>
	let { href = null, tone = 'nokytral', children } = $props();
</script>

{#if href}
	<a class="kort {tone}" {href}>{@render children()}</a>
{:else}
	<div class="kort {tone}">{@render children()}</div>
{/if}

<style>
	.kort {
		display: block;
		background: var(--sjo-dyp);
		border: var(--kant);
		border-radius: var(--radius-stor);
		padding: var(--s4);
		color: inherit;
		text-decoration: none;
	}
	a.kort:hover {
		border-color: var(--blekk);
	}
	.riktig {
		background: var(--styrbord-flate);
		border-color: var(--styrbord);
	}
	.feil {
		background: var(--babord-flate);
		border-color: var(--babord);
	}
</style>
