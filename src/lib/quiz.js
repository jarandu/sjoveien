import { SPORSMAL } from './data/sporsmal.js';
import { PROVE } from './pensum.js';

/** Fisher–Yates. */
export function stokk(liste) {
	const a = [...liste];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function filtrer({
	kategori = null,
	emne = null,
	punkt = null,
	underpunkt = null,
	vanskelighet = null
} = {}) {
	return SPORSMAL.filter(
		(s) =>
			(kategori === null || s.kategori === kategori) &&
			(emne === null || s.emne === emne) &&
			(punkt === null || s.pensumpunkt === punkt) &&
			(underpunkt === null || s.underpunkt === underpunkt) &&
			(vanskelighet === null || s.vanskelighet === vanskelighet)
	);
}

/**
 * Hvor mange oppgaver finnes per pensumpunkt, eventuelt begrenset til ett
 * vanskelighetsnivå. Brukes av forsiden til å vise antall på hvert kort.
 * @returns {Map<string, number>}
 */
export function tellPerPunkt(vanskelighet = null) {
	const m = new Map();
	for (const s of SPORSMAL) {
		if (vanskelighet !== null && s.vanskelighet !== vanskelighet) continue;
		m.set(s.pensumpunkt, (m.get(s.pensumpunkt) ?? 0) + 1);
	}
	return m;
}

export function byggOkt(filter = {}, antall = 10) {
	return stokk(filtrer(filter)).slice(0, antall);
}

export function byggFeilliste(ider, antall = 10) {
	const sett = new Set(ider);
	return stokk(SPORSMAL.filter((s) => sett.has(s.id))).slice(0, antall);
}

/**
 * Eksamensimulering. Den ekte prøven har 50 oppgaver på 60 minutter, der
 * emne 4 utgjør omtrent 13 av dem og vurderes separat. Vi speiler den
 * fordelingen så langt spørsmålsbanken rekker.
 */
export function byggEksamen() {
	const emne4 = stokk(filtrer({ emne: 4 })).slice(0, PROVE.antallEmne4);
	const brukte = new Set(emne4.map((s) => s.id));
	const resten = stokk(SPORSMAL.filter((s) => !brukte.has(s.id))).slice(
		0,
		PROVE.antallOppgaver - emne4.length
	);
	return stokk([...emne4, ...resten]);
}

/** @param {{sporsmal: any, valgt: string|null}[]} besvarelser */
export function vurder(besvarelser) {
	const totalt = besvarelser.length;
	const riktige = besvarelser.filter((b) => b.valgt === b.sporsmal.riktig).length;

	const e4 = besvarelser.filter((b) => b.sporsmal.emne === 4);
	const e4Riktige = e4.filter((b) => b.valgt === b.sporsmal.riktig).length;

	const prosent = totalt ? Math.round((riktige / totalt) * 100) : 0;
	const prosentE4 = e4.length ? Math.round((e4Riktige / e4.length) * 100) : 100;

	return {
		totalt,
		riktige,
		prosent,
		emne4Totalt: e4.length,
		emne4Riktige: e4Riktige,
		prosentEmne4: prosentE4,
		bestatt: prosent >= PROVE.kravTotaltProsent && prosentE4 >= PROVE.kravEmne4Prosent
	};
}

export const antallISamlingen = SPORSMAL.length;
