<script>
	let {
		variant = 'primar',
		href = null,
		type = 'button',
		full = false,
		disabled = false,
		onclick = undefined,
		children,
		...rest
	} = $props();
</script>

{#if href}
	<a class="knapp {variant}" class:full {href} {...rest}>{@render children()}</a>
{:else}
	<button class="knapp {variant}" class:full {type} {disabled} {onclick} {...rest}>
		{@render children()}
	</button>
{/if}

<style>
	.knapp {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--s2);
		padding: var(--s3) var(--s4);
		min-height: 2.9rem;
		border-radius: var(--radius);
		border: var(--kant-tydelig);
		background: var(--blekk);
		color: var(--papir);
		font: inherit;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: background 120ms ease;
	}
	.knapp.full {
		width: 100%;
	}
	.knapp:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.sekundar {
		background: transparent;
		color: var(--blekk);
	}
	.stille {
		background: transparent;
		color: var(--blekk-dempet);
		border-color: transparent;
		padding-inline: var(--s2);
		min-height: 2.2rem;
	}
	.sekundar:hover:not(:disabled) {
		background: var(--sjo);
	}
	.stille:hover:not(:disabled) {
		color: var(--blekk);
	}
</style>
