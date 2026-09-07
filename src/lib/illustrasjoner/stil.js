/**
 * Felles tegneregler for ALLE illustrasjoner.
 *
 * Grunnregelen for stilkonsistens: ingen illustrasjon definerer egne farger,
 * strektykkelser eller proporsjoner. Alt hentes herfra. Da blir en ny
 * illustrasjon automatisk i samme stil som resten, uansett hvem som tegner den.
 *
 * Paletten er hentet fra norske sjøkart (Kartverket): sandfarget land,
 * lys blå grunne, hvitt dypvann, magenta for lykter og faresymboler.
 */
export const STIL = {
	// Flater
	sjo: '#DCEEF4',
	sjoDyp: '#FFFFFF',
	grunne: '#B9E2F0',
	land: '#EDE0BE',
	natt: '#0B2430',
	nattHimmel: '#123647',

	// Strek
	blekk: '#10242E',
	blekkSvak: '#7E96A0',
	strek: 3,
	strekTynn: 1.6,
	strekHjelp: 2, // kurslinjer, hjelpelinjer (alltid stiplet)
	stiplet: '7 5',

	// Semantikk fra sjøen selv
	babord: '#D0021B',
	styrbord: '#0E8A4B',
	hvitLys: '#FFF4D2',
	gul: '#F5C518',
	svart: '#10242E',
	magenta: '#B5177A',

	// Typografi i tegninger
	skrift: 12,
	skriftFamilie: 'Archivo, system-ui, sans-serif'
};

/** Standard lerret. Alle scener bruker samme koordinatsystem. */
export const LERRET = { b: 320, h: 210 };
