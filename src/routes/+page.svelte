<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import type { Emne, Niva } from '$lib/typer.js';
	import { NIVAER } from '$lib/data/kategorier.js';
	import { EMNER, PROVE } from '$lib/pensum.js';
	import { tellPerPunkt, antallISamlingen } from '$lib/quiz.js';
	import { fremdrift } from '$lib/lagring.svelte.js';
	import Sjomerke from '$lib/illustrasjoner/Sjomerke.svelte';
	import Knapp from '$lib/ui/Knapp.svelte';
	import Merkelapp from '$lib/ui/Merkelapp.svelte';

	let niva: Niva | null = $state(null);

	/**
	 * Kortene følger pensumlisten: ett kort per emne, med emnets egne
	 * pensumpunkter som underkategorier. Punkter uten oppgaver vises ikke.
	 */
	const antallPerPunkt = $derived(tellPerPunkt(niva));

	const emnekort = $derived(
		EMNER.map((e) => {
			const punkter = Object.entries(e.punkter)
				.map(([kode, p]) => ({ kode, ...p, antall: antallPerPunkt.get(kode) ?? 0 }))
				.filter((p) => p.antall > 0);
			return { ...e, punkter, antall: punkter.reduce((n, p) => n + p.antall, 0) };
		})
			.filter((e) => e.antall > 0)
			// Emne 4 vektes tyngst på prøven og har egne beståttkrav, så det
			// skal ligge først – ikke sist, slik nummereringen ellers tilsier.
			.sort((a, b) => Number(b.nr === 4) - Number(a.nr === 4))
	);

	const feil = $derived(fremdrift.feilliste.length);

	/**
	 * Emnene har svært ulikt antall pensumpunkter – emne 1 har 17, emne 4 har 7.
	 * Vi viser de første og legger resten bak en knapp, så kortene blir omtrent
	 * like høye og hele rutenettet er lesbart uten å scrolle forbi et enkelt kort.
	 */
	const SYNLIGE = 6;
	let utvidet = $state(new SvelteSet<number>());

	function veksle(nr: Emne | number): void {
		if (utvidet.has(nr)) utvidet.delete(nr);
		else utvidet.add(nr);
	}

	function lenke(params: Record<string, string>): string {
		const p = new URLSearchParams(params);
		if (niva) p.set('niva', String(niva));
		return `/ov?${p}`;
	}
</script>

<svelte:head><title>Sjøveien – øv til båtførerprøven</title></svelte:head>

<section class="topp">
	<div>
		<h1>Terp til du kan det i mørket</h1>
		<p>
			Oppgaver til båtførerprøven, sortert etter Sjøfartsdirektoratets egen pensumliste. Hvert svar
			har en forklaring og en henvisning til lov eller forskrift, så du kan sjekke fasiten selv.
		</p>
		<div class="knapper">
			<Knapp href="/eksamen">Ta full prøve</Knapp>
			<Knapp href={lenke({ alle: '1' })} variant="sekundar">Bland alle emner</Knapp>
		</div>
	</div>
	<div class="figur">
		<Sjomerke merke="nord" tittel="Nordkardinal – passer nord for merket" />
	</div>
</section>

{#if feil > 0}
	<a class="feilbanner" href="/ov?feilliste=1">
		<strong>{feil}</strong> oppgaver du bommet på sist. Ta dem igjen →
	</a>
{/if}

<section>
	<div class="rad">
		<h2>Velg emne</h2>
		<div class="filter" role="group" aria-label="Vanskelighetsgrad">
			<button class:aktiv={niva === null} onclick={() => (niva = null)}>Alle</button>
			{#each NIVAER as n}
				<button class:aktiv={niva === n.nr} onclick={() => (niva = n.nr)}>{n.navn}</button>
			{/each}
		</div>
	</div>
	{#if niva}
		<p class="hint">{NIVAER.find((n) => n.nr === niva)?.beskrivelse}</p>
	{/if}

	<ul class="kort">
		{#each emnekort as e}
			{@const apen = utvidet.has(e.nr)}
			{@const synlige = apen ? e.punkter : e.punkter.slice(0, SYNLIGE)}
			{@const skjulte = e.punkter.length - synlige.length}
			<li class="kortet" class:viktig={e.nr === 4}>
				<div class="hode">
					<h3>
						<a href={lenke({ emne: String(e.nr) })}>
							<span class="nr tall">{e.nr}</span>
							{e.navn}
						</a>
					</h3>
					<span class="tall sum">{e.antall}</span>
				</div>
				<p class="kort-om">{e.kort}</p>

				<ul class="punkter">
					{#each synlige as p}
						<li>
							<a href={lenke({ punkt: p.kode })}>
								<span class="kode tall">{p.kode}</span>
								<span class="tittel">{p.tittel}</span>
								<span class="tall antall">{p.antall}</span>
							</a>
						</li>
					{/each}
				</ul>

				{#if skjulte > 0 || apen}
					<button class="mer" aria-expanded={apen} onclick={() => veksle(e.nr)}>
						{apen ? 'Vis færre' : `Vis ${skjulte} ${skjulte === 1 ? 'punkt' : 'punkter'} til`}
						<span class="pil" aria-hidden="true">{apen ? '↑' : '↓'}</span>
					</button>
				{/if}

				{#if e.nr === 4}
					<p class="notis">
						<Merkelapp tekst="Vektes tyngst" /> Egne beståttkrav på prøven.
					</p>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<section class="proven">
	<div>
		<h2>Slik er den ekte prøven</h2>
		<p class="hint">
			{PROVE.antallOppgaver} oppgaver på {PROVE.minutter} minutter. Du må ha minst
			{PROVE.kravTotaltProsent} % riktig totalt <em>og</em> minst {PROVE.kravEmne4Prosent} % på emne 4,
			«spesielt viktige emner». Begge kravene må oppfylles.
		</p>
		<p class="hint">Banken inneholder {antallISamlingen} oppgaver.</p>
	</div>
	<div class="lenkerad">
		<Knapp href="/eksamen">Simuler prøven</Knapp>
		<Knapp href="/tegninger" variant="sekundar">Se alle illustrasjoner</Knapp>
	</div>
</section>

<style>
	.topp {
		display: grid;
		gap: var(--s4);
		margin-bottom: var(--s6);
	}
	.figur {
		max-width: 15rem;
	}
	.knapper,
	.lenkerad {
		display: flex;
		gap: var(--s2);
		flex-wrap: wrap;
	}
	@media (min-width: 34rem) {
		.topp {
			grid-template-columns: 1fr 15rem;
			align-items: center;
		}
	}
	section + section {
		margin-top: var(--s6);
	}
	.rad {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--s3);
		flex-wrap: wrap;
		margin-bottom: var(--s3);
	}
	.filter {
		display: flex;
		gap: var(--s1);
	}
	.filter button {
		font: inherit;
		font-size: var(--t-xs);
		padding: var(--s1) var(--s2);
		border: var(--kant);
		border-radius: 999px;
		background: transparent;
		color: var(--blekk-dempet);
		cursor: pointer;
	}
	.filter .aktiv {
		background: var(--blekk);
		border-color: var(--blekk);
		color: var(--papir);
	}
	.hint {
		font-size: var(--t-s);
		color: var(--blekk-dempet);
	}

	/* Fire emner i 2x2. Fordi hvert kort viser like mange punkter før
	   «vis mer», blir de to radene omtrent like høye. */
	.kort {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--s4);
		grid-template-columns: 1fr;
		align-items: start;
	}
	@media (min-width: 40rem) {
		.kort {
			grid-template-columns: 1fr 1fr;
		}
	}
	.kortet {
		border: var(--kant);
		border-radius: var(--radius-stor);
		background: var(--sjo-dyp);
		padding: var(--s4);
		display: flex;
		flex-direction: column;
		gap: var(--s2);
	}
	.mer {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: var(--s1);
		margin-top: var(--s1);
		padding: var(--s1) 0;
		font: inherit;
		font-size: var(--t-xs);
		color: var(--blekk-dempet);
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.mer:hover {
		color: var(--blekk);
	}
	.pil {
		text-decoration: none;
	}
	.kortet.viktig {
		border-color: var(--blekk);
		border-width: 2px;
	}
	.hode {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--s2);
	}
	.hode h3 {
		font-size: var(--t-l);
		margin: 0;
	}
	.hode a {
		text-decoration: none;
		display: inline-flex;
		align-items: baseline;
		gap: var(--s2);
	}
	.hode a:hover {
		text-decoration: underline;
	}
	.nr {
		display: inline-grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		flex: none;
		border-radius: 50%;
		background: var(--gul);
		font-size: var(--t-xs);
		font-weight: 700;
		align-self: center;
	}
	.sum {
		font-size: var(--t-s);
		color: var(--blekk-dempet);
	}
	.kort-om {
		margin: 0;
		font-size: var(--t-s);
		color: var(--blekk-dempet);
	}
	.punkter {
		list-style: none;
		margin: var(--s2) 0 0;
		padding: 0;
		border-top: var(--kant);
	}
	.punkter a {
		display: grid;
		grid-template-columns: 2.6rem 1fr auto;
		gap: var(--s2);
		align-items: baseline;
		padding: var(--s2) 0;
		border-bottom: var(--kant);
		text-decoration: none;
		font-size: var(--t-s);
	}
	.punkter a:hover .tittel {
		text-decoration: underline;
	}
	.kode {
		color: var(--blekk-svak);
		font-size: var(--t-xs);
	}
	.antall {
		color: var(--blekk-dempet);
		font-size: var(--t-xs);
	}
	.notis {
		margin: var(--s2) 0 0;
		font-size: var(--t-xs);
		color: var(--blekk-dempet);
	}
	.proven {
		display: grid;
		gap: var(--s4);
		padding-top: var(--s5);
		border-top: var(--kant);
	}
	@media (min-width: 46rem) {
		.proven {
			grid-template-columns: 1fr auto;
			align-items: center;
		}
	}
</style>
