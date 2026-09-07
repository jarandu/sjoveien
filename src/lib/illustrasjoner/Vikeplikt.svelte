<script lang="ts">
	import Scene from './Scene.svelte';
	import { STIL, LERRET } from './stil.js';

	/** Vikepliktssituasjon sett ovenfra. Din båt ligger nederst og går rett fram. */
	export type Situasjon =
		| 'kryssende-fra-styrbord'
		| 'kryssende-fra-babord'
		| 'motsatte-kurser'
		| 'innhenting';
	export type Annen = 'motor' | 'seil' | 'nytte';

	interface Props {
		situasjon: Situasjon;
		annen?: Annen;
		tittel?: string;
	}

	let {
		situasjon,
		annen = 'motor',
		tittel = 'Sett ovenfra – din båt er merket «du»'
	}: Props = $props();

	const M = LERRET.b / 2;
	const DIN = { x: M, y: 168, rot: 0 };

	const oppsett: Record<Situasjon, { x: number; y: number; rot: number }> = {
		'kryssende-fra-styrbord': { x: M + 88, y: 92, rot: -110 },
		'kryssende-fra-babord': { x: M - 88, y: 92, rot: 110 },
		'motsatte-kurser': { x: M + 22, y: 52, rot: 180 },
		innhenting: { x: M, y: 196, rot: 0 }
	};

	const dem = $derived(oppsett[situasjon]);
	const farge = $derived(
		annen === 'seil' ? STIL.styrbord : annen === 'nytte' ? STIL.magenta : STIL.blekk
	);
</script>

{#snippet bat(x: number, y: number, rot: number, fyll: string, merke: string)}
	<g transform="translate({x} {y}) rotate({rot})">
		<!-- kurslinje -->
		<line
			x1="0"
			y1="-16"
			x2="0"
			y2="-78"
			stroke={fyll}
			stroke-width={STIL.strekHjelp}
			stroke-dasharray={STIL.stiplet}
			opacity="0.7"
		/>
		<polygon
			points="0,-20 11,4 0,16 -11,4"
			fill={fyll}
			stroke={STIL.blekk}
			stroke-width={STIL.strekTynn}
			stroke-linejoin="round"
		/>
		<text
			x="0"
			y="34"
			text-anchor="middle"
			transform="rotate({-rot})"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			font-weight="600"
			fill={STIL.blekk}>{merke}</text
		>
	</g>
{/snippet}

<Scene {tittel}>

	{@render bat(dem.x, dem.y, dem.rot, farge, annen === 'nytte' ? 'ferge' : annen)}
	{@render bat(DIN.x, DIN.y, DIN.rot, STIL.sjoDyp, 'du')}
</Scene>
