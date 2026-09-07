#!/usr/bin/env node
/**
 * Kvalitetskontroll av spørsmålsbanken. Kjøres med `npm run valider`,
 * og bør kjøres i CI før deploy.
 *
 * FEIL stopper bygget. ADVARSEL er ting en fagperson bør se på.
 */
import { readFileSync } from 'node:fs';
import { SPORSMAL } from '../src/lib/data/sporsmal.ts';
import { KATEGORIER } from '../src/lib/data/kategorier.ts';
import { EMNER, PUNKTER, punkt } from '../src/lib/pensum.ts';

const feil = [];
const advarsler = [];

const kategoriIder = new Set(KATEGORIER.map((k) => k.id));
const pensumpunkter = new Set(PUNKTER.map((p) => p.kode));

// Leser ut hvilke illustrasjoner som faktisk er registrert, uten å importere Svelte.
const registryKilde = readFileSync(
	new URL('../src/lib/illustrasjoner/index.ts', import.meta.url),
	'utf8'
);
const registrerte = new Set(
	[...registryKilde.matchAll(/^\t(\w+):/gm)].map((m) => m[1])
);

const sett = new Set();
const MAKS_ALDER_DAGER = 365;

for (const s of SPORSMAL) {
	const her = (m) => feil.push(`${s.id}: ${m}`);
	const kanskje = (m) => advarsler.push(`${s.id}: ${m}`);

	if (sett.has(s.id)) her('id er brukt før');
	sett.add(s.id);

	if (![1, 2, 3, 4].includes(s.emne)) her('ugyldig emne');
	if (!pensumpunkter.has(s.pensumpunkt)) her(`ukjent pensumpunkt «${s.pensumpunkt}»`);
	if (!kategoriIder.has(s.kategori)) her(`ukjent kategori «${s.kategori}»`);

	// Pensumpunktet må høre hjemme i emnet spørsmålet er merket med.
	const p = punkt(s.pensumpunkt);
	if (p && p.emne !== s.emne)
		her(`pensumpunkt ${s.pensumpunkt} hører til emne ${p.emne}, ikke emne ${s.emne}`);

	// Underpunkt er valgfritt, men skal være et av pensumlistens egne kulepunkter.
	if (s.underpunkt != null) {
		if (!p) {
			// allerede rapportert som ukjent pensumpunkt
		} else if (!p.under.includes(s.underpunkt)) {
			her(`underpunkt «${s.underpunkt}» finnes ikke under ${s.pensumpunkt}`);
		}
	}
	if (![1, 2, 3].includes(s.vanskelighet)) her('vanskelighet må være 1, 2 eller 3');

	if (!s.sporsmal?.trim()) her('mangler spørsmålstekst');
	if (!s.forklaring?.trim()) her('mangler forklaring');

	const ider = s.alternativer.map((a) => a.id);
	if (s.alternativer.length < 3) her('trenger minst tre svaralternativer');
	if (new Set(ider).size !== ider.length) her('alternativene har like id-er');
	if (!ider.includes(s.riktig)) her(`riktig svar «${s.riktig}» finnes ikke blant alternativene`);
	if (s.alternativer.some((a) => !a.tekst?.trim())) her('tomt svaralternativ');

	if (s.illustrasjon && !registrerte.has(s.illustrasjon.navn))
		her(`illustrasjonen «${s.illustrasjon.navn}» er ikke registrert`);

	// Faktasjekk
	if (!s.kilde?.verk || !s.kilde?.hjemmel) her('mangler kilde (verk og hjemmel)');
	if (!s.kilde?.lenke) kanskje('kilden mangler lenke til primærkilden');

	if (!s.kontrollert) {
		her('mangler kontrollert-dato');
	} else {
		const dager = (Date.now() - Date.parse(s.kontrollert)) / 86400000;
		if (dager > MAKS_ALDER_DAGER)
			kanskje(`sist kontrollert for ${Math.round(dager)} dager siden – bør sjekkes mot kilden`);
	}
}

// Dekning: hvilke pensumpunkter mangler helt?
const dekket = new Set(SPORSMAL.map((s) => s.pensumpunkt));
const udekket = [...pensumpunkter].filter((p) => !dekket.has(p));

// Dekning på underpunktnivå – kulepunktene i pensumlisten.
const dekketUnder = new Set(
	SPORSMAL.filter((s) => s.underpunkt).map((s) => `${s.pensumpunkt} :: ${s.underpunkt}`)
);
const udekketUnder = PUNKTER.flatMap((p) =>
	p.under.filter((u) => !dekketUnder.has(`${p.kode} :: ${u}`)).map((u) => `${p.kode} ${u}`)
);
const antallUnder = PUNKTER.reduce((n, p) => n + p.under.length, 0);

console.log(`Spørsmål: ${SPORSMAL.length}`);
console.log(`Pensumpunkter dekket: ${dekket.size} av ${pensumpunkter.size}`);
console.log(`Underpunkter dekket: ${antallUnder - udekketUnder.length} av ${antallUnder}`);

for (const nivå of [1, 2, 3]) {
	console.log(`  Nivå ${nivå}: ${SPORSMAL.filter((s) => s.vanskelighet === nivå).length}`);
}
for (const e of EMNER) {
	console.log(`  Emne ${e.nr} (${e.navn}): ${SPORSMAL.filter((s) => s.emne === e.nr).length}`);
}

if (udekket.length) {
	console.log(`\nPensumpunkter uten oppgaver (${udekket.length}):`);
	console.log('  ' + udekket.join(', '));
}

if (udekketUnder.length) {
	console.log(`\nUnderpunkter uten oppgaver (${udekketUnder.length}):`);
	udekketUnder.forEach((u) => console.log('  - ' + u));
}

if (advarsler.length) {
	console.log(`\nAdvarsler (${advarsler.length}):`);
	advarsler.forEach((a) => console.log('  ! ' + a));
}

if (feil.length) {
	console.error(`\nFeil (${feil.length}):`);
	feil.forEach((f) => console.error('  x ' + f));
	process.exit(1);
}

console.log('\nIngen feil.');
