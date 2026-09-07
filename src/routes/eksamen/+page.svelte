<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Besvarelse, Sporsmal } from '$lib/typer.js';
	import { byggEksamen, vurder } from '$lib/quiz.js';
	import { PROVE } from '$lib/pensum.js';
	import { fremdrift } from '$lib/lagring.svelte.js';
	import Sporsmalskort from '$lib/komponenter/Sporsmalskort.svelte';
	import Fremdriftslinje from '$lib/ui/Fremdriftslinje.svelte';
	import Knapp from '$lib/ui/Knapp.svelte';

	type Status = 'klar' | 'pagar' | 'levert';

	let status = $state<Status>('klar');
	let okt: Sporsmal[] = $state([]);
	let indeks = $state(0);
	let besvarelser: Besvarelse[] = $state([]);
	let valgt: string | null = $state(null);
	let sekunderIgjen = $state(PROVE.minutter * 60);
	let klokke: ReturnType<typeof setInterval> | undefined;

	const resultat = $derived(status === 'levert' ? vurder(besvarelser) : null);

	const tid = $derived.by(() => {
		const m = Math.floor(sekunderIgjen / 60);
		const s = sekunderIgjen % 60;
		return `${m}:${String(s).padStart(2, '0')}`;
	});

	function start() {
		okt = byggEksamen();
		indeks = 0;
		besvarelser = [];
		valgt = null;
		// Tiden skaleres til antall oppgaver, så øvingen kjennes like presset ut
		sekunderIgjen = Math.round((PROVE.minutter * 60 * okt.length) / PROVE.antallOppgaver);
		status = 'pagar';
		klokke = setInterval(() => {
			sekunderIgjen -= 1;
			if (sekunderIgjen <= 0) lever();
		}, 1000);
	}

	function neste() {
		besvarelser = [...besvarelser, { sporsmal: okt[indeks], valgt }];
		fremdrift.registrer(okt[indeks].id, valgt === okt[indeks].riktig);
		valgt = null;
		if (indeks + 1 >= okt.length) lever();
		else indeks += 1;
	}

	function lever() {
		clearInterval(klokke);
		// Ubesvarte oppgaver teller som feil, slik som på den ekte prøven
		const resterende = okt.slice(besvarelser.length).map((s) => ({ sporsmal: s, valgt: null }));
		besvarelser = [...besvarelser, ...resterende];
		status = 'levert';
		fremdrift.registrerEksamen(vurder(besvarelser));
	}

	onDestroy(() => clearInterval(klokke));
</script>

<svelte:head><title>Full prøve – Sjøveien</title></svelte:head>

{#if status === 'klar'}
	<h1>Full prøve</h1>
	<p>
		Den ekte prøven har {PROVE.antallOppgaver} oppgaver på {PROVE.minutter} minutter. Du består med minst
		{PROVE.kravTotaltProsent} % riktig totalt og minst {PROVE.kravEmne4Prosent} % på emne 4.
	</p>
	<p class="hint">
		Her får du så mange oppgaver som banken rekker, med samme andel fra emne 4 og tiden skalert
		tilsvarende. Du får ingen fasit underveis.
	</p>
	<Knapp onclick={start}>Start prøven</Knapp>
{:else if status === 'pagar'}
	<div class="linje">
		<span class="tall klokke" class:knapt={sekunderIgjen < 60}>{tid}</span>
		<span class="tall">{indeks + 1} / {okt.length}</span>
	</div>
	<Fremdriftslinje verdi={indeks} av={okt.length} />
	<div class="kort">
		<Sporsmalskort
			sporsmal={okt[indeks]}
			nummer={indeks + 1}
			antall={okt.length}
			visFasit={false}
			bind:valgt
			onneste={neste}
		/>
	</div>
	<Knapp variant="stille" onclick={lever}>Lever nå</Knapp>
{:else if resultat}
	<h1>{resultat.bestatt ? 'Bestått' : 'Ikke bestått'}</h1>
	<dl>
		<div><dt>Totalt</dt><dd class="tall">{resultat.riktige} / {resultat.totalt} · {resultat.prosent} %</dd></div>
		<div>
			<dt>Emne 4</dt>
			<dd class="tall">{resultat.emne4Riktige} / {resultat.emne4Totalt} · {resultat.prosentEmne4} %</dd>
		</div>
	</dl>
	<p class="hint">
		Kravet er {PROVE.kravTotaltProsent} % totalt og {PROVE.kravEmne4Prosent} % på emne 4. Emne 4
		alene kan felle deg selv om totalen er god nok.
	</p>

	<h2>Oppgavene du bommet på</h2>
	<ol class="gjennomgang">
		{#each besvarelser.filter((b) => b.valgt !== b.sporsmal.riktig) as b}
			<li>
				<p class="sp">{b.sporsmal.sporsmal}</p>
				<p class="sv">
					Riktig svar: {b.sporsmal.alternativer.find((a) => a.id === b.sporsmal.riktig)?.tekst}
				</p>
				<p class="fo">{b.sporsmal.forklaring}</p>
			</li>
		{:else}
			<li class="sv">Ingen. Full pott.</li>
		{/each}
	</ol>

	<div class="knapper">
		<Knapp onclick={start}>Ny prøve</Knapp>
		<Knapp href="/" variant="sekundar">Øv på tema</Knapp>
	</div>
{/if}

<style>
	.linje {
		display: flex;
		justify-content: space-between;
		font-size: var(--t-s);
		color: var(--blekk-dempet);
		margin-bottom: var(--s2);
	}
	.klokke {
		font-weight: 600;
		color: var(--blekk);
	}
	.klokke.knapt {
		color: var(--babord);
	}
	.kort {
		margin: var(--s4) 0;
	}
	.hint {
		font-size: var(--t-s);
		color: var(--blekk-dempet);
	}
	dl {
		margin: var(--s4) 0;
		border-top: var(--kant);
	}
	dl div {
		display: flex;
		justify-content: space-between;
		padding: var(--s3) 0;
		border-bottom: var(--kant);
	}
	dt {
		font-weight: 500;
	}
	dd {
		margin: 0;
	}
	.gjennomgang {
		padding-left: 1.1rem;
		font-size: var(--t-s);
	}
	.gjennomgang li {
		margin-bottom: var(--s4);
	}
	.sp {
		font-weight: 500;
		margin-bottom: var(--s1);
	}
	.sv {
		color: var(--styrbord);
		margin-bottom: var(--s1);
	}
	.fo {
		color: var(--blekk-dempet);
	}
	.knapper {
		display: flex;
		gap: var(--s2);
		flex-wrap: wrap;
	}
</style>
