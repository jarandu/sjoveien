<script>
	import { page } from '$app/state';
	import { byggOkt, byggFeilliste, vurder } from '$lib/quiz.js';
	import { kategori, NIVAER } from '$lib/data/kategorier.js';
	import { emne as finnEmne, punkt as finnPunkt } from '$lib/pensum.js';
	import { fremdrift } from '$lib/lagring.svelte.js';
	import Sporsmalskort from '$lib/komponenter/Sporsmalskort.svelte';
	import Fremdriftslinje from '$lib/ui/Fremdriftslinje.svelte';
	import Knapp from '$lib/ui/Knapp.svelte';

	const sp = $derived(page.url.searchParams);
	const katId = $derived(sp.get('kategori'));
	const emneNr = $derived(Number(sp.get('emne')) || null);
	const punktKode = $derived(sp.get('punkt'));
	const niva = $derived(Number(sp.get('niva')) || null);
	const erFeilliste = $derived(sp.get('feilliste') === '1');

	let okt = $state([]);
	let indeks = $state(0);
	let besvarelser = $state([]);
	let valgt = $state(null);

	const filter = $derived({
		kategori: katId,
		emne: emneNr,
		punkt: punktKode,
		vanskelighet: niva
	});

	/** Overskriften speiler hvilket nivå i pensumlisten du terper på. */
	const tittel = $derived.by(() => {
		if (erFeilliste) return 'Oppgaver du bommet på';
		const p = punktKode ? finnPunkt(punktKode) : null;
		const grunn = p
			? p.tittel
			: emneNr
				? (finnEmne(emneNr)?.navn ?? 'Blandede oppgaver')
				: (kategori(katId)?.navn ?? 'Blandede oppgaver');
		return grunn + (niva ? ' · ' + NIVAER.find((n) => n.nr === niva).navn : '');
	});

	/** Pensumpunktet vises som undertittel, så du vet hvor i pensum du er. */
	const smuletekst = $derived.by(() => {
		if (erFeilliste) return null;
		const p = punktKode ? finnPunkt(punktKode) : null;
		if (p) return `Emne ${p.emne} · pensumpunkt ${p.kode}`;
		if (emneNr) return `Emne ${emneNr} · hele emnet`;
		return null;
	});

	// Bygg økten når filteret endrer seg
	$effect(() => {
		const ny = erFeilliste
			? byggFeilliste(fremdrift.feilliste, 10)
			: byggOkt(filter, 10);
		okt = ny;
		indeks = 0;
		besvarelser = [];
		valgt = null;
	});

	const ferdig = $derived(okt.length > 0 && indeks >= okt.length);
	const resultat = $derived(ferdig ? vurder(besvarelser) : null);

	function neste() {
		const sp = okt[indeks];
		besvarelser = [...besvarelser, { sporsmal: sp, valgt }];
		fremdrift.registrer(sp.id, valgt === sp.riktig);
		valgt = null;
		indeks += 1;
	}

	function pånytt() {
		okt = erFeilliste ? byggFeilliste(fremdrift.feilliste, 10) : byggOkt(filter, 10);
		indeks = 0;
		besvarelser = [];
		valgt = null;
	}
</script>

<svelte:head><title>{tittel} – Sjøveien</title></svelte:head>

<p class="smule">
	<a href="/">Tilbake</a> · {tittel}{#if smuletekst}<span class="pensum"> · {smuletekst}</span>{/if}
</p>

{#if okt.length === 0}
	<h1>Ingen oppgaver her ennå</h1>
	<p>Prøv et annet tema eller en annen vanskelighetsgrad.</p>
	<Knapp href="/" variant="sekundar">Velg tema</Knapp>
{:else if ferdig}
	<h1 class="tall">{resultat.riktige} av {resultat.totalt}</h1>
	<p>
		{#if resultat.prosent >= 80}
			Det holder til å bestå. Ta et vanskeligere nivå eller gå videre til full prøve.
		{:else}
			Under 80 %. Les forklaringene, og ta runden en gang til – oppgavene kommer i ny rekkefølge.
		{/if}
	</p>
	<ul class="oppsummering">
		{#each besvarelser as b}
			<li class:feil={b.valgt !== b.sporsmal.riktig}>
				{b.sporsmal.sporsmal}
			</li>
		{/each}
	</ul>
	<div class="knapper">
		<Knapp onclick={pånytt}>Ta runden igjen</Knapp>
		<Knapp href="/" variant="sekundar">Velg annet tema</Knapp>
	</div>
{:else}
	<Fremdriftslinje verdi={indeks} av={okt.length} />
	<div class="kort">
		<Sporsmalskort
			sporsmal={okt[indeks]}
			nummer={indeks + 1}
			antall={okt.length}
			bind:valgt
			onneste={neste}
		/>
	</div>
{/if}

<style>
	.smule {
		font-size: var(--t-xs);
		color: var(--blekk-dempet);
	}
	.pensum {
		color: var(--blekk-svak);
	}
	.kort {
		margin-top: var(--s4);
	}
	.oppsummering {
		list-style: none;
		padding: 0;
		margin: var(--s4) 0;
		font-size: var(--t-s);
	}
	.oppsummering li {
		padding: var(--s2) 0 var(--s2) var(--s3);
		border-left: 3px solid var(--styrbord);
		margin-bottom: var(--s1);
		color: var(--blekk-dempet);
	}
	.oppsummering li.feil {
		border-left-color: var(--babord);
		color: var(--blekk);
	}
	.knapper {
		display: flex;
		gap: var(--s2);
		flex-wrap: wrap;
	}
</style>
