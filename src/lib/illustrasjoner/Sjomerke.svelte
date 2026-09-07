<script>
	import Scene from './Scene.svelte';
	import { STIL, LERRET } from './stil.js';

	/**
	 * IALA A – slik merkene ser ut i norsk farvann.
	 * @type {{ merke: 'nord'|'sor'|'ost'|'vest'|'babord'|'styrbord'|'spesial'|'frittliggende'|'senterleie', tittel?: string }}
	 */
	let { merke, tittel = 'Sjømerke' } = $props();

	const X = LERRET.b / 2;
	const TOPP = 96; // der selve merkelegemet starter
	const BUNN = 176;
	const BREDDE = 34;

	// Fargebånd ovenfra og ned
	const bandOppsett = {
		nord: [STIL.svart, STIL.gul],
		sor: [STIL.gul, STIL.svart],
		ost: [STIL.svart, STIL.gul, STIL.svart],
		vest: [STIL.gul, STIL.svart, STIL.gul],
		babord: [STIL.babord],
		styrbord: [STIL.styrbord],
		spesial: [STIL.gul],
		frittliggende: [STIL.svart, STIL.babord, STIL.svart],
		senterleie: []
	};

	const band = $derived(bandOppsett[merke] ?? []);
	const bandHoyde = $derived(band.length ? (BUNN - TOPP) / band.length : 0);

	/** Kjegle. `opp` = spissen peker opp. */
	function kjegle(yTopp, yBunn, opp) {
		const b = 15;
		return opp
			? `${X},${yTopp} ${X - b},${yBunn} ${X + b},${yBunn}`
			: `${X},${yBunn} ${X - b},${yTopp} ${X + b},${yTopp}`;
	}
</script>

<Scene {tittel}>
	<!-- vannlinje -->
	<line
		x1="0"
		y1={BUNN}
		x2={LERRET.b}
		y2={BUNN}
		stroke={STIL.blekkSvak}
		stroke-width={STIL.strekTynn}
	/>

	<!-- legeme -->
	{#if merke === 'senterleie'}
		{#each [0, 1, 2, 3] as i}
			<rect
				x={X - BREDDE / 2 + (i * BREDDE) / 4}
				y={TOPP}
				width={BREDDE / 4}
				height={BUNN - TOPP}
				fill={i % 2 === 0 ? STIL.babord : '#FFFFFF'}
			/>
		{/each}
	{:else}
		{#each band as farge, i}
			<rect
				x={X - BREDDE / 2}
				y={TOPP + i * bandHoyde}
				width={BREDDE}
				height={bandHoyde}
				fill={farge}
			/>
		{/each}
	{/if}
	<rect
		x={X - BREDDE / 2}
		y={TOPP}
		width={BREDDE}
		height={BUNN - TOPP}
		fill="none"
		stroke={STIL.blekk}
		stroke-width={STIL.strekTynn}
	/>

	<!-- stang opp til toppmerket -->
	<line x1={X} y1={TOPP} x2={X} y2="42" stroke={STIL.blekk} stroke-width={STIL.strek} />

	<!-- toppmerke -->
	<g stroke={STIL.blekk} stroke-width={STIL.strekTynn} stroke-linejoin="round">
		{#if merke === 'nord'}
			<polygon points={kjegle(24, 50, true)} fill={STIL.svart} />
			<polygon points={kjegle(52, 78, true)} fill={STIL.svart} />
		{:else if merke === 'sor'}
			<polygon points={kjegle(24, 50, false)} fill={STIL.svart} />
			<polygon points={kjegle(52, 78, false)} fill={STIL.svart} />
		{:else if merke === 'ost'}
			<!-- kjeglene står base mot base -->
			<polygon points={kjegle(24, 50, true)} fill={STIL.svart} />
			<polygon points={kjegle(52, 78, false)} fill={STIL.svart} />
		{:else if merke === 'vest'}
			<!-- kjeglene står spiss mot spiss -->
			<polygon points={kjegle(24, 50, false)} fill={STIL.svart} />
			<polygon points={kjegle(52, 78, true)} fill={STIL.svart} />
		{:else if merke === 'babord'}
			<rect x={X - 16} y="44" width="32" height="34" fill={STIL.babord} />
		{:else if merke === 'styrbord'}
			<polygon points={kjegle(44, 78, true)} fill={STIL.styrbord} />
		{:else if merke === 'spesial'}
			<g stroke={STIL.gul} stroke-width="7" stroke-linecap="round">
				<line x1={X - 14} y1="48" x2={X + 14} y2="76" />
				<line x1={X + 14} y1="48" x2={X - 14} y2="76" />
			</g>
		{:else if merke === 'frittliggende'}
			<circle cx={X} cy="38" r="13" fill={STIL.svart} />
			<circle cx={X} cy="68" r="13" fill={STIL.svart} />
		{:else if merke === 'senterleie'}
			<circle cx={X} cy="60" r="15" fill={STIL.babord} />
		{/if}
	</g>
</Scene>
