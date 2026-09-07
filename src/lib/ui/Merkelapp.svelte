<script>
	let { tekst, niva = null } = $props();
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
