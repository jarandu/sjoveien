<script>
	import { ILLUSTRASJONER } from '$lib/illustrasjoner/index.js';
	import { kategori } from '$lib/data/kategorier.js';
	import Merkelapp from '$lib/ui/Merkelapp.svelte';
	import Knapp from '$lib/ui/Knapp.svelte';

	let {
		sporsmal,
		nummer,
		antall,
		visFasit = true,
		valgt = $bindable(null),
		onneste
	} = $props();

	let laast = $state(false);

	const Illustrasjon = $derived(
		sporsmal.illustrasjon ? ILLUSTRASJONER[sporsmal.illustrasjon.navn] : null
	);
	const katNavn = $derived(kategori(sporsmal.kategori)?.navn ?? sporsmal.kategori);

	// Ny oppgave: lås opp igjen
	$effect(() => {
		sporsmal.id;
		laast = false;
	});

	function velg(id) {
		if (laast) return;
		valgt = id;
		if (visFasit) laast = true;
	}
</script>

<article>
	<header>
		<span class="teller tall">{nummer} / {antall}</span>
		<span class="lapper">
			<Merkelapp tekst={katNavn} />
			<Merkelapp tekst={'Nivå ' + sporsmal.vanskelighet} niva={sporsmal.vanskelighet} />
			{#if sporsmal.emne === 4}<Merkelapp tekst="Emne 4" />{/if}
		</span>
	</header>

	<h2>{sporsmal.sporsmal}</h2>

	{#if Illustrasjon}
		<div class="bilde">
			<Illustrasjon {...sporsmal.illustrasjon.props} />
		</div>
	{/if}

	<ul>
		{#each sporsmal.alternativer as alt}
			{@const erRiktig = alt.id === sporsmal.riktig}
			{@const erValgt = valgt === alt.id}
			<li>
				<button
					class="alt"
					class:valgt={erValgt}
					class:fasit={laast && erRiktig}
					class:bom={laast && erValgt && !erRiktig}
					disabled={laast}
					onclick={() => velg(alt.id)}
				>
					<span class="bokstav">{alt.id.toUpperCase()}</span>
					<span>{alt.tekst}</span>
				</button>
			</li>
		{/each}
	</ul>

	{#if laast}
		<div class="fasitboks" class:riktig={valgt === sporsmal.riktig}>
			<strong>{valgt === sporsmal.riktig ? 'Riktig' : 'Feil'}</strong>
			<p>{sporsmal.forklaring}</p>
			<p class="kilde">
				Kilde: {sporsmal.kilde.verk}, {sporsmal.kilde.hjemmel}{#if sporsmal.kilde.lenke}
					— <a href={sporsmal.kilde.lenke} target="_blank" rel="noreferrer">les selv</a>{/if}
			</p>
		</div>
		<Knapp full onclick={onneste}>
			{nummer === antall ? 'Se resultat' : 'Neste oppgave'}
		</Knapp>
	{:else if !visFasit}
		<Knapp full disabled={!valgt} onclick={onneste}>
			{nummer === antall ? 'Lever prøven' : 'Neste oppgave'}
		</Knapp>
	{/if}
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--s4);
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--s2);
		flex-wrap: wrap;
	}
	.teller {
		font-size: var(--t-s);
		color: var(--blekk-dempet);
	}
	.lapper {
		display: flex;
		gap: var(--s1);
		flex-wrap: wrap;
	}
	h2 {
		font-size: var(--t-l);
	}
	.bilde {
		max-width: 22rem;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--s2);
	}
	.alt {
		display: flex;
		gap: var(--s3);
		align-items: flex-start;
		width: 100%;
		text-align: left;
		font: inherit;
		padding: var(--s3);
		background: var(--sjo-dyp);
		border: var(--kant);
		border-radius: var(--radius);
		cursor: pointer;
	}
	.alt:hover:not(:disabled) {
		border-color: var(--blekk);
	}
	.alt:disabled {
		cursor: default;
	}
	.bokstav {
		flex: none;
		width: 1.6rem;
		height: 1.6rem;
		display: grid;
		place-items: center;
		border: var(--kant);
		border-radius: 50%;
		font-size: var(--t-xs);
		font-weight: 600;
	}
	.valgt {
		border-color: var(--blekk);
		background: var(--sjo);
	}
	.fasit {
		border-color: var(--styrbord);
		background: var(--styrbord-flate);
	}
	.bom {
		border-color: var(--babord);
		background: var(--babord-flate);
	}
	.fasitboks {
		border-left: 3px solid var(--babord);
		padding-left: var(--s3);
	}
	.fasitboks.riktig {
		border-left-color: var(--styrbord);
	}
	.fasitboks p {
		margin: var(--s2) 0 0;
		font-size: var(--t-s);
	}
	.kilde {
		color: var(--blekk-dempet);
		font-size: var(--t-xs) !important;
	}
</style>
