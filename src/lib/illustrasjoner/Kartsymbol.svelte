<script>
	import Scene from './Scene.svelte';
	import { STIL, LERRET } from './stil.js';

	/**
	 * Utsnitt av et sjøkart, tegnet med Kartverkets symbolbruk og farger.
	 * Som de andre illustrasjonene henter denne alt fra stil.js – ingen egne
	 * farger eller strektykkelser.
	 *
	 * @type {{
	 *   symbol: 'skvalpeskjaer'|'grunne'|'kabel'|'luftspenn'|'fyrsektor'|'dybdekurver',
	 *   tittel?: string
	 * }}
	 */
	let { symbol, tittel = 'Utsnitt av sjøkart' } = $props();

	const M = LERRET.b / 2;
	const H = LERRET.h / 2;
</script>

<Scene {tittel}>
	<!-- Kartbakgrunnen: dypt vann er hvitt, grunt er lyseblått, land er sand. -->
	<rect width={LERRET.b} height={LERRET.h} fill={STIL.sjoDyp} />

	{#if symbol === 'skvalpeskjaer'}
		<!-- Grunt vann rundt skjæret -->
		<ellipse cx={M} cy={H} rx="74" ry="46" fill={STIL.grunne} />
		<ellipse
			cx={M}
			cy={H}
			rx="74"
			ry="46"
			fill="none"
			stroke={STIL.blekkSvak}
			stroke-width={STIL.strekTynn}
		/>
		<!-- Skvalpeskjær: kryss med prikker rundt -->
		<g stroke={STIL.blekk} stroke-width={STIL.strek} stroke-linecap="round">
			<line x1={M - 11} y1={H - 11} x2={M + 11} y2={H + 11} />
			<line x1={M + 11} y1={H - 11} x2={M - 11} y2={H + 11} />
		</g>
		{#each [0, 1, 2, 3] as i}
			{@const v = (i * Math.PI) / 2 + Math.PI / 4}
			<circle
				cx={M + Math.cos(v) * 22}
				cy={H + Math.sin(v) * 22}
				r="2.2"
				fill={STIL.blekk}
			/>
		{/each}
	{:else if symbol === 'grunne'}
		<!-- Grunne med dybdetall -->
		<ellipse cx={M} cy={H} rx="80" ry="50" fill={STIL.grunne} />
		<ellipse
			cx={M}
			cy={H}
			rx="80"
			ry="50"
			fill="none"
			stroke={STIL.blekkSvak}
			stroke-width={STIL.strekTynn}
		/>
		<ellipse cx={M} cy={H} rx="40" ry="24" fill={STIL.sjo} />
		<text
			x={M}
			y={H + 4}
			text-anchor="middle"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			font-weight="600"
			fill={STIL.blekk}>2,4</text
		>
		<text
			x={M + 96}
			y={H - 30}
			text-anchor="middle"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			fill={STIL.blekkSvak}>18</text
		>
	{:else if symbol === 'kabel'}
		<!-- Land på begge sider, kabelsymbol tvers over -->
		<rect x="0" y="0" width="52" height={LERRET.h} fill={STIL.land} />
		<rect x={LERRET.b - 52} y="0" width="52" height={LERRET.h} fill={STIL.land} />
		<path
			d="M52,{H} q 26,-16 52,0 q 26,16 52,0 q 26,-16 52,0 q 26,16 52,0"
			fill="none"
			stroke={STIL.magenta}
			stroke-width={STIL.strek}
		/>
		<text
			x={M}
			y={H + 30}
			text-anchor="middle"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			fill={STIL.magenta}>Kabel – ankring forbudt</text
		>
	{:else if symbol === 'luftspenn'}
		<rect x="0" y="0" width="46" height={LERRET.h} fill={STIL.land} />
		<rect x={LERRET.b - 46} y="0" width="46" height={LERRET.h} fill={STIL.land} />
		<!-- master -->
		<g stroke={STIL.blekk} stroke-width={STIL.strek}>
			<line x1="30" y1="56" x2="30" y2="150" />
			<line x1={LERRET.b - 30} y1="56" x2={LERRET.b - 30} y2="150" />
		</g>
		<!-- selve spennet -->
		<path
			d="M30,56 q {M - 30},46 {LERRET.b - 60},0"
			fill="none"
			stroke={STIL.magenta}
			stroke-width={STIL.strek}
		/>
		<!-- fri høyde -->
		<g stroke={STIL.blekkSvak} stroke-width={STIL.strekHjelp} stroke-dasharray={STIL.stiplet}>
			<line x1={M} y1="79" x2={M} y2="150" />
		</g>
		<text
			x={M + 8}
			y="120"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			font-weight="600"
			fill={STIL.blekk}>18 m</text
		>
		<line
			x1="0"
			y1="150"
			x2={LERRET.b}
			y2="150"
			stroke={STIL.blekkSvak}
			stroke-width={STIL.strekTynn}
		/>
	{:else if symbol === 'fyrsektor'}
		<!-- Fyrlykt med tre sektorer: rød, hvit, grønn -->
		{@const fx = M}
		{@const fy = 150}
		<path d="M{fx},{fy} L{fx - 105},{fy - 78} A131,131 0 0,1 {fx - 42},{fy - 124} Z" fill={STIL.babord} opacity="0.5" />
		<path d="M{fx},{fy} L{fx - 42},{fy - 124} A131,131 0 0,1 {fx + 42},{fy - 124} Z" fill={STIL.hvitLys} opacity="0.9" />
		<path d="M{fx},{fy} L{fx + 42},{fy - 124} A131,131 0 0,1 {fx + 105},{fy - 78} Z" fill={STIL.styrbord} opacity="0.5" />
		<g stroke={STIL.blekkSvak} stroke-width={STIL.strekTynn} fill="none">
			<path d="M{fx},{fy} L{fx - 105},{fy - 78}" />
			<path d="M{fx},{fy} L{fx - 42},{fy - 124}" />
			<path d="M{fx},{fy} L{fx + 42},{fy - 124}" />
			<path d="M{fx},{fy} L{fx + 105},{fy - 78}" />
		</g>
		<circle cx={fx} cy={fy} r="5" fill={STIL.magenta} />
		<line
			x1="0"
			y1={fy}
			x2={LERRET.b}
			y2={fy}
			stroke={STIL.blekkSvak}
			stroke-width={STIL.strekTynn}
		/>
	{:else if symbol === 'dybdekurver'}
		<!-- Land øverst, så grunne, så dypt vann -->
		<path d="M0,0 H{LERRET.b} V44 Q{M},80 0,54 Z" fill={STIL.land} />
		<path
			d="M0,54 Q{M},80 {LERRET.b},44 V96 Q{M},128 0,104 Z"
			fill={STIL.grunne}
		/>
		<g fill="none" stroke={STIL.blekkSvak} stroke-width={STIL.strekTynn}>
			<path d="M0,54 Q{M},80 {LERRET.b},44" />
			<path d="M0,104 Q{M},128 {LERRET.b},96" />
		</g>
		<text
			x="18"
			y="76"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			fill={STIL.blekkSvak}>5 m</text
		>
		<text
			x="18"
			y="126"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			fill={STIL.blekkSvak}>10 m</text
		>
		<text
			x={LERRET.b - 40}
			y="176"
			font-family={STIL.skriftFamilie}
			font-size={STIL.skrift}
			fill={STIL.blekkSvak}>24</text
		>
	{/if}
</Scene>
