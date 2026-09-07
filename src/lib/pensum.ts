/**
 * Emneinndelingen er hentet ordrett fra Sjøfartsdirektoratets pensumliste
 * «Pensum til båtførerprøven», revidert 2014, justert 18.05.2017.
 * https://www.sdir.no/contentassets/3c0847eee5934a4a8eedc1952c3f15d2/pensum-batforerproven-2014---justert-18.05.2017.pdf
 *
 * Strukturen speiler pensumlisten på tre nivåer:
 *   emne (1–4)  →  punkt (1.1.a, 1.4.3 …)  →  underpunkt (kulepunktene i lista)
 *
 * `tittel` er pensumlistens egen formulering, forkortet der den er lang.
 * `under` er kulepunktene under hvert punkt, ordrett der de finnes. Punkter
 * uten kulepunkter i pensumlisten har tom `under`.
 *
 * Alle spørsmål i banken merkes med `emne`, `pensumpunkt` og valgfritt
 * `underpunkt`, slik at det alltid er sporbart hvor i det offisielle
 * pensumet spørsmålet hører hjemme.
 */

import type { Emne, EmneDefinisjon, FlatPensumpunkt } from '$lib/typer.js';

export const EMNER: EmneDefinisjon[] = [
	{
		nr: 1,
		navn: 'Sjømannskap',
		kort: 'Sikkerhetsutstyr, brann, VHF, førstehjelp, vær, fart og holdninger.',
		krav: 'Kandidaten skal ha kunnskap om:',
		punkter: {
			'1.1.a': {
				tittel: 'Egnet sikkerhetsutrustning i fritidsbåter og riktig bruk av det',
				under: [
					'Flyteutstyr',
					'Dødmannsknapp',
					'Ombordstigningsanordning',
					'Drivanker',
					'Lydsignalapparat',
					'Bærbare brannslukkingsapparat (1–6 kg)',
					'Fastmonterte slukkeanlegg (motorrom)',
					'Nødraketter, bluss og annen nødsignalisering'
				]
			},
			'1.1.b': {
				tittel: 'Brannfare, brannårsaker, brannslukking og forholdsregler',
				under: ['Bensindamp', 'Propansystemer', 'Betydning av oksygen']
			},
			'1.1.c': {
				tittel: 'Bruk av SR-radio (VHF) og mobiltelefon på sjøen',
				under: [
					'VHF kanal 16 og DSC',
					'Kystradiostasjonenes telefonnummer: 120',
					'Rekkevidde, muligheter og begrensninger'
				]
			},
			'1.1.d': {
				tittel: 'Nødvendige forholdsregler ved nødsituasjoner, varsling og redningstjenesten',
				under: []
			},
			'1.1.e': { tittel: 'Assistanse og slep', under: [] },
			'1.1.f': {
				tittel: 'At forskjellige båttyper kan ha forskjellig bruksområde',
				under: ['Konstruksjonskategorier (CE) for fritidsfartøy A, B, C, D']
			},
			'1.1.g': {
				tittel: 'Betydningen av riktig trim, tilstrekkelig stabilitet og avpasset motorstyrke',
				under: []
			},
			'1.1.h': {
				tittel: 'Betydningen av ikke å overbelaste båten',
				under: ['Fribord, dypgående, stabilitet og lasteevne']
			},
			'1.1.i': {
				tittel: 'Betydningen av godt vedlikehold av båt, motor, rigg og utstyr',
				under: ['Drivstoffsystem, kjøleoljesystem']
			},
			'1.1.j': {
				tittel: 'Regler for sikker og forsvarlig fortøyning, samt arrangement av dregg/anker',
				under: []
			},
			'1.1.k': {
				tittel: 'Viktige miljøhensyn',
				under: ['Utslipp, reservater, nasjonalparker, forsøpling']
			},
			'1.1.l': { tittel: 'Ansvarsforhold og forsikringsmuligheter', under: [] },
			'1.1.m': {
				tittel: 'Førstehjelp',
				under: [
					'BLÅS (bevissthet, luftveier, åndedrett, sirkulasjon)',
					'HLR (hjerte-lungeredning)',
					'Behandling av indre og ytre blødninger',
					'Nedkjøling (hypotermi)',
					'Skader etter kollisjon eller fall i høy fart'
				]
			},
			'1.1.n': {
				tittel: 'Meteorologiske forhold',
				under: ['Vær og vind', 'Sjøforhold', 'Siktforhold']
			},
			'1.1.o': { tittel: 'Sikkerhet i forbindelse med vannsportsaktiviteter', under: [] },
			'1.1.p': {
				tittel: 'Farer forbundet med høy fart',
				under: [
					'Høyhastighetsnavigasjon',
					'Forsinkelse ved bruk av elektronisk utstyr',
					'Innsnevret syn, tunnelsyn',
					'Forsvarlig avstand til land',
					'Risiko og konsekvenser'
				]
			},
			'1.1.q': {
				tittel: 'Godt sjømannskap',
				under: [
					'Sjøvettreglene',
					'Holdninger til sjøs og respekt for andre brukere av farvannet',
					'Egen adferds betydning for andres sikkerhet og trivsel'
				]
			}
		}
	},
	{
		nr: 2,
		navn: 'Lover og regler',
		kort: 'Sjøveisreglene, lanterner, lydsignaler, nødsignaler og småbåtloven.',
		krav: 'Kandidaten skal ha god kunnskap om Sjøveisreglenes avsnitt om:',
		punkter: {
			'1.2.a': {
				tittel: 'Regler for styring og seilas',
				under: [
					'Vikeplikt mellom motorbåter',
					'Vikeplikt mellom motorbåt og seilbåt',
					'Vikeplikt for nyttetrafikk',
					'Vikeplikt mellom seilbåter',
					'Trafikkseparasjonssystem'
				]
			},
			'1.2.b': {
				tittel: 'Lanterner og signalfigurer',
				under: [
					'Lanterner på stor og liten motorbåt',
					'Lanterne på robåt',
					'Lanterner på seilfartøy',
					'Signalflagg A – jeg har dykker nede',
					'Lanterne og dagsignal for sleping'
				]
			},
			'1.2.c': { tittel: 'Utstyr for lydsignaler – regel 33', under: [] },
			'1.2.d': { tittel: 'Manøversignaler – regel 34 (a) og (b)', under: [] },
			'1.2.e': { tittel: 'Lydsignaler under nedsatt sikt – regel 35 (a) og (i)', under: [] },
			'1.2.f': { tittel: 'Nødsignaler – vedlegg IV', under: [] },
			'1.2.g': { tittel: 'Regler for norske farvann – regel 43, 44, 45 og 54', under: [] },
			'1.2.h': {
				tittel: 'De viktigste bestemmelsene i lover og forskrifter for fritidsbåter',
				under: [
					'Småbåtloven §§ 21, 22, 23, 27, 32, 33, 35 og kapittel 5',
					'Friluftsloven §§ 1–8',
					'Motorferdselloven',
					'Forskrift om minstealder og båtførerbevis',
					'Forskrift om begrenset fart ved passering av badende',
					'Forskrift om fartsbegrensninger i sjøen',
					'Forskrift om flyteutstyr om bord på fritidsfartøy',
					'CE-merking, produsentskilt, CIN-kode og brukerhåndbok'
				]
			}
		}
	},
	{
		nr: 3,
		navn: 'Navigasjon og kartlesing',
		kort: 'Sjømerker, kart, kompass, misvisning, GPS, fart og distanse.',
		krav: 'Kandidaten skal ha kunnskap om:',
		punkter: {
			'1.3.a': {
				tittel: 'Seilasregler ved bruk av fyr, lykter og sjømerker – IALA A',
				under: ['Kardinalmerker', 'Lateralmerker', 'Spesialmerker', 'Senterleiemerke', 'Frittliggende fare']
			},
			'1.3.b': { tittel: 'Kartets oppbygging, symbolbruk og kartdatum', under: [] },
			'1.3.c': { tittel: 'Kompassets funksjonsmåte', under: [] },
			'1.3.d': {
				tittel: 'Hva som forårsaker deviasjon og misvisning, og hvordan man tar hensyn til det',
				under: []
			},
			'1.3.e': {
				tittel: 'Muligheter og begrensninger med elektroniske navigasjonshjelpemidler',
				under: ['GPS', 'Elektroniske kart', 'Apper på mobil og nettbrett']
			},
			'1.3.f': { tittel: 'Generelt om strøm og tidevann', under: [] },
			'1.3.g': { tittel: 'Orientering i kartet ved bruk av kompass og GPS-koordinater', under: [] },
			'1.3.h': { tittel: 'Orientering i kartet ved bruk av fyr, lykter og landemerker', under: [] },
			'1.3.i': { tittel: 'Beregning av hastighet og seilt distanse', under: [] }
		}
	},
	{
		nr: 4,
		navn: 'Spesielt viktige emner',
		kort: 'Vektes tyngst på prøven. Sjømerker, kartsymboler, vikeplikt, lanterner, promille, nød.',
		krav: 'Kunnskap båtføreren må ha for å ferdes med et minimum av sikkerhet. Vektlegges mer enn andre emner.',
		punkter: {
			'1.4.1': {
				tittel: 'Sjømerker – i kartet og i virkeligheten',
				under: ['Stake eller båke med peker', 'Kardinal- og lateralsystemet', 'Spesialmerker']
			},
			'1.4.2': {
				tittel: 'Symboler i kartet',
				under: [
					'Skvalpeskjær, grunner, broer',
					'Kabel, rørledninger og luftspenn',
					'Sektor og karakterer på fyrlykter'
				]
			},
			'1.4.3': {
				tittel: 'Sjøveisregler: Hvem skal holde av veien?',
				under: [
					'To motorbåter har kryssende kurser',
					'Motorbåt og seilfartøy har kryssende kurser',
					'Seil- og motorfartøy krysser ferge eller frakteskip i trangt farvann',
					'Sjøveisregel 43 og 44'
				]
			},
			'1.4.4': {
				tittel: 'Lanterner og flagg',
				under: ['Lanterneføring på fritidsbåt', 'Signalflagg A – jeg har dykker nede']
			},
			'1.4.5': {
				tittel: 'Lover og regler',
				under: [
					'Promillegrense for fritidsbåt opp til 15 meter',
					'Regler for bruk av flyteutstyr'
				]
			},
			'1.4.6': {
				tittel: 'Nødsituasjoner',
				under: ['Kystradiostasjonens nummer 120', 'SR-radio (VHF) kanal 16']
			},
			'1.4.7': { tittel: 'Godt sjømannskap', under: ['Farer forbundet med høy fart'] }
		}
	}
];

/**
 * Slik er den faktiske prøven satt opp hos Norsk Test (båtførerregisteret.no):
 * 50 oppgaver, 60 minutter, minst 80 % totalt OG minst 80 % i emne 4.
 */
export const PROVE = {
	antallOppgaver: 50,
	minutter: 60,
	kravTotaltProsent: 80,
	kravEmne4Prosent: 80,
	antallEmne4: 13
};

export const emne = (nr: Emne | number | null): EmneDefinisjon | undefined =>
	EMNER.find((e) => e.nr === nr);

/** Flat oppslagstabell: pensumpunkt → { kode, tittel, under, emne } */
export const PUNKTER: FlatPensumpunkt[] = EMNER.flatMap((e) =>
	Object.entries(e.punkter).map(([kode, p]) => ({ kode, ...p, emne: e.nr }))
);

export const punkt = (kode: string | null): FlatPensumpunkt | undefined =>
	PUNKTER.find((p) => p.kode === kode);

/** Alle gyldige underpunkter, brukt av validatoren. */
export const UNDERPUNKTER: Set<string> = new Set(PUNKTER.flatMap((p) => p.under));
