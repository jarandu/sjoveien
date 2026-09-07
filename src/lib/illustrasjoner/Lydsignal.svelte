<script lang="ts">
	import Scene from './Scene.svelte';
	import { STIL, LERRET } from './stil.js';

	/**
	 * Lydsignaler tegnet som en tidslinje, slik at forskjellen på korte og
	 * lange støt blir synlig. Regel 32 definerer et kort støt som om lag ett
	 * sekund og et langt støt som fire til seks sekunder.
	 *
	 */
	export type Signal =
		| 'ett-kort'
		| 'to-korte'
		| 'tre-korte'
		| 'fem-korte'
		| 'ett-langt'
		| 'to-lange'
		| 'langt-to-korte';

	interface Props {
		signal: Signal;
		tittel?: string;
	}

	let { signal, tittel = 'Lydsignal' }: Props = $props();

	/** 1 = kort støt, 4 = langt støt. Tallene er sekunder. */
	const MONSTRE: Record<Signal, number[]> = {
		'ett-kort': [1],
		'to-korte': [1, 1],
		'tre-korte': [1, 1, 1],
		'fem-korte': [1, 1, 1, 1, 1],
		'ett-langt': [4],
		'to-lange': [4, 4],
		'langt-to-korte': [4, 1, 1]
	};

	const PAUSE = 1; // sekunders opphold mellom støtene
	const Y = 108; // grunnlinje for tidslinjen
	const HOYDE = 46;
	const MARG = 26;

	const monster = $derived(MONSTRE[signal] ?? []);
	const totalt = $derived(
		monster.reduce((n, s) => n + s, 0) + PAUSE * Math.max(0, monster.length - 1)
	);
	/** Piksler per sekund, slik at signalet alltid fyller bredden. */
	const skala = $derived(totalt ? (LERRET.b - MARG * 2) / totalt : 0);

	/** Regner ut hvert støt som en boks på tidslinjen. */
	const stot = $derived.by(() => {
		let t = 0;
		return monster.map((sek) => {
			const boks = { x: MARG + t * skala, bredde: sek * skala, lang: sek > 1 };
			t += sek + PAUSE;
			return boks;
		});
	});
</script>

<Scene {tittel}>
	<!-- tidslinje -->
	<line
		x1={MARG}
		y1={Y}
		x2={LERRET.b - MARG}
		y2={Y}
		stroke={STIL.blekkSvak}
		stroke-width={STIL.strekTynn}
	/>

	{#each stot as s}
		<rect
			x={s.x}
			y={Y - HOYDE}
			width={s.bredde}
			height={HOYDE}
			rx="2"
			fill={s.lang ? STIL.blekk : STIL.gul}
			stroke={STIL.blekk}
			stroke-width={STIL.strekTynn}
		/>
		<text
			x={s.x + s.bredde / 2}
			y={Y + 18}
			text-anchor="middle"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			fill={STIL.blekkSvak}>{s.lang ? 'langt' : 'kort'}</text
		>
	{/each}

	<text
		x={MARG}
		y={Y + 46}
		font-family={STIL.skriftFamilie}
		font-size={STIL.skrift}
		fill={STIL.blekkSvak}>Kort støt ≈ 1 sek · langt støt 4–6 sek</text
	>
</Scene>
