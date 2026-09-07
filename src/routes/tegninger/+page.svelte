<script lang="ts">
	import Sjomerke from '$lib/illustrasjoner/Sjomerke.svelte';
	import Lanterne from '$lib/illustrasjoner/Lanterne.svelte';
	import Vikeplikt from '$lib/illustrasjoner/Vikeplikt.svelte';
	import Kartsymbol from '$lib/illustrasjoner/Kartsymbol.svelte';
	import Lydsignal from '$lib/illustrasjoner/Lydsignal.svelte';

	import type { Merke } from '$lib/illustrasjoner/Sjomerke.svelte';
	import type { Fartoy, Sett } from '$lib/illustrasjoner/Lanterne.svelte';
	import type { Situasjon, Annen } from '$lib/illustrasjoner/Vikeplikt.svelte';
	import type { Kartsymboltype } from '$lib/illustrasjoner/Kartsymbol.svelte';
	import type { Signal } from '$lib/illustrasjoner/Lydsignal.svelte';

	const merker: [Merke, string][] = [
		['nord', 'Nordkardinal'],
		['sor', 'Sørkardinal'],
		['ost', 'Østkardinal'],
		['vest', 'Vestkardinal'],
		['babord', 'Babordmerke'],
		['styrbord', 'Styrbordmerke'],
		['spesial', 'Spesialmerke'],
		['frittliggende', 'Frittliggende fare'],
		['senterleie', 'Senterleiemerke']
	];

	const lanterner: [Fartoy, Sett, string][] = [
		['motorbat', 'forfra', 'Motorbåt forfra'],
		['stor-motorbat', 'forfra', 'Motorbåt over 50 m forfra'],
		['seilbat', 'forfra', 'Seilbåt for seil, forfra'],
		['motorbat', 'aktenfra', 'Motorbåt aktenfra'],
		['motorbat', 'babord', 'Motorbåt, babord side'],
		['motorbat', 'styrbord', 'Motorbåt, styrbord side'],
		['robat', 'forfra', 'Robåt']
	];

	const situasjoner: [Situasjon, Annen, string][] = [
		['kryssende-fra-styrbord', 'motor', 'Kryssende fra styrbord'],
		['kryssende-fra-babord', 'motor', 'Kryssende fra babord'],
		['motsatte-kurser', 'motor', 'Motsatte kurser'],
		['innhenting', 'seil', 'Innhenting av seilbåt'],
		['kryssende-fra-babord', 'nytte', 'Ferge i trangt farvann']
	];

	const kartsymboler: [Kartsymboltype, string][] = [
		['skvalpeskjaer', 'Skvalpeskjær'],
		['grunne', 'Grunne med dybdetall'],
		['dybdekurver', 'Dybdekurver'],
		['kabel', 'Sjøkabel'],
		['luftspenn', 'Luftspenn'],
		['fyrsektor', 'Fyr med sektorer']
	];

	const lydsignaler: [Signal, string][] = [
		['ett-kort', 'Ett kort – jeg dreier til styrbord'],
		['to-korte', 'To korte – jeg dreier til babord'],
		['tre-korte', 'Tre korte – maskinen går bakover'],
		['fem-korte', 'Fem korte – tvilsignal'],
		['ett-langt', 'Ett langt – tåkesignal, gjør fart'],
		['to-lange', 'To lange – tåkesignal, stoppet'],
		['langt-to-korte', 'Langt + to korte – seilfartøy i tåke']
	];
</script>

<svelte:head><title>Tegninger – Sjøveien</title></svelte:head>

<h1>Tegninger</h1>
<p class="hint">
	Alle illustrasjoner bygges av de samme byggeklossene i <code>src/lib/illustrasjoner</code>, med
	farger og strektykkelser fra <code>stil.js</code>. Denne siden finnes for å se dem samlet, slik at
	nye tegninger holder samme stil som de gamle.
</p>

<h2>Sjømerker</h2>
<div class="rutenett">
	{#each merker as [merke, tittel]}<Sjomerke {merke} {tittel} />{/each}
</div>

<h2>Lanterner</h2>
<div class="rutenett">
	{#each lanterner as [fartoy, sett, tittel]}<Lanterne {fartoy} {sett} {tittel} />{/each}
</div>

<h2>Vikeplikt</h2>
<div class="rutenett">
	{#each situasjoner as [situasjon, annen, tittel]}<Vikeplikt {situasjon} {annen} {tittel} />{/each}
</div>

<h2>Kartsymboler</h2>
<div class="rutenett">
	{#each kartsymboler as [symbol, tittel]}<Kartsymbol {symbol} {tittel} />{/each}
</div>

<h2>Lydsignaler</h2>
<div class="rutenett bred">
	{#each lydsignaler as [signal, tittel]}<Lydsignal {signal} {tittel} />{/each}
</div>

<style>
	.hint {
		font-size: var(--t-s);
		color: var(--blekk-dempet);
	}
	h2 {
		margin-top: var(--s6);
		margin-bottom: var(--s3);
	}
	.rutenett {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
		gap: var(--s4);
	}
	/* Tidslinjene trenger mer bredde for at teksten skal være lesbar. */
	.rutenett.bred {
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
	}
	code {
		font-size: 0.85em;
	}
</style>
