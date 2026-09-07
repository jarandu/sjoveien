<script lang="ts">
	import Scene from './Scene.svelte';
	import { STIL, LERRET } from './stil.js';

	/**
	 * Lanterneføring slik du ser den fra din egen båt om natten.
	 * Sjøveisreglene regel 21–25.
	 */
	export type Fartoy = 'motorbat' | 'stor-motorbat' | 'seilbat' | 'robat';
	export type Sett = 'forfra' | 'aktenfra' | 'babord' | 'styrbord';

	interface Lys {
		x: number;
		y: number;
		farge: string;
		r: number;
	}

	interface Props {
		fartoy: Fartoy;
		sett: Sett;
		tittel?: string;
	}

	let { fartoy, sett, tittel = 'Lanterneføring sett fra din båt' }: Props = $props();

	const M = LERRET.b / 2;
	const DEKK = 150;

	// Hvilke lanterner er synlige fra denne vinkelen?
	// Sidelanterner lyser 112,5° fra rett forut. Akterlanternen 135° akterut.
	// Rett fra siden ser du derfor sidelanterne, men ikke akterlanternen.
	const lys: Lys[] = $derived.by(() => {
		const topplanterne = { x: M, y: 92, farge: STIL.hvitLys, r: 6 };
		const topplanterneAkter = { x: M + 34, y: 74, farge: STIL.hvitLys, r: 6 };
		const akter = { x: M, y: DEKK - 6, farge: STIL.hvitLys, r: 6 };
		// Fartøyet peker mot deg: dets styrbord side havner til venstre i bildet.
		const styrbordLys = { x: M - 66, y: DEKK - 4, farge: STIL.styrbord, r: 6 };
		const babordLys = { x: M + 66, y: DEKK - 4, farge: STIL.babord, r: 6 };

		if (fartoy === 'robat') {
			return sett === 'aktenfra' ? [akter] : [{ ...akter, y: 120 }];
		}
		if (sett === 'forfra') {
			const base = [styrbordLys, babordLys];
			if (fartoy === 'seilbat') return base;
			if (fartoy === 'stor-motorbat') return [...base, topplanterne, topplanterneAkter];
			return [...base, topplanterne];
		}
		if (sett === 'aktenfra') return [akter];
		// fra siden
		const side = {
			x: sett === 'babord' ? M - 62 : M + 62,
			y: DEKK - 4,
			farge: sett === 'babord' ? STIL.babord : STIL.styrbord,
			r: 6
		};
		return fartoy === 'seilbat' ? [side] : [side, topplanterne];
	});

	// Silhuett: peker mot deg, eller i profil
	const profil = $derived(sett === 'babord' || sett === 'styrbord');
	const bogVenstre = $derived(sett === 'babord');
</script>

<Scene {tittel} natt>
	<!-- silhuett -->
	<g fill="#06161E" stroke="#06161E" stroke-width={STIL.strekTynn}>
		{#if profil}
			{#if bogVenstre}
				<path d="M{M - 84},{DEKK} L{M - 60},{DEKK + 22} L{M + 74},{DEKK + 22} L{M + 82},{DEKK} Z" />
			{:else}
				<path d="M{M + 84},{DEKK} L{M + 60},{DEKK + 22} L{M - 74},{DEKK + 22} L{M - 82},{DEKK} Z" />
			{/if}
		{:else}
			<path d="M{M - 74},{DEKK} L{M - 56},{DEKK + 24} L{M + 56},{DEKK + 24} L{M + 74},{DEKK} Z" />
			<rect x={M - 26} y={DEKK - 22} width="52" height="22" />
		{/if}
		{#if fartoy === 'seilbat'}
			<line x1={M} y1={DEKK - 4} x2={M} y2="46" stroke-width={STIL.strek} />
		{/if}
	</g>

	<!-- lanterner -->
	{#each lys as l}
		<g color={l.farge}>
			<circle cx={l.x} cy={l.y} r="20" fill="url(#glod)" />
			<circle cx={l.x} cy={l.y} r={l.r} fill={l.farge} />
		</g>
	{/each}
</Scene>
