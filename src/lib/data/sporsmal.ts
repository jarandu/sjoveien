/**
 * Spørsmålsbank.
 *
 * Regler for innhold:
 *  1. Hvert spørsmål er skrevet fra grunnen av. Ingenting er hentet fra den
 *     faktiske prøven eller fra opphavsrettsbeskyttet kursmateriell.
 *  2. Hvert spørsmål SKAL ha `kilde` som peker på primærkilden – lov,
 *     forskrift eller Sjøfartsdirektoratet. Er kilden en forskrift, oppgis
 *     paragraf eller regelnummer.
 *  3. `kontrollert` er datoen noen sist leste kilden og bekreftet svaret.
 *     `npm run valider` rapporterer spørsmål som mangler kilde, lenke,
 *     eller som ikke er kontrollert de siste 12 månedene.
 */

import type { Sporsmal } from '$lib/typer.js';

const SJOVEISREGLENE = 'https://lovdata.no/dokument/SF/forskrift/1975-12-01-5';
const SDIR_SJOVEIS = 'https://www.sdir.no/fritidsbat/regelverk-for-fritidsbat/sjoveisreglene/';
const SDIR_BEVIS = 'https://www.sdir.no/fritidsbat/sertifikater/batforerbevis/batforerbevis/';

/** Kapittel II – særskilte regler for norsk innenlands farvann (regel 41–54). */
const NORSKE_FARVANN = 'https://lovdata.no/dokument/SF/forskrift/1975-12-01-5/KAPITTEL_2-2';
/** Del D – lyd- og lyssignaler (regel 32–37). */
const LYDSIGNALER = 'https://lovdata.no/dokument/SF/forskrift/1975-12-01-5/KAPITTEL_1-4';
const SMABATLOVEN = 'https://lovdata.no/dokument/NL/lov/1998-06-26-47';
const FARTSGRENSER = 'https://lovdata.no/dokument/SF/forskrift/2021-04-19-1214';
const SDIR_BRANN = 'https://www.sdir.no/fritidsbat/vis-sjovett/forebygging-av-batbrann/';
/** Kystverket er myndighet for sjømerkingen langs norskekysten. */
const KYSTVERKET_MERKER = 'https://www.kystverket.no/sjovegen/fyr-lykter-og-sjomerker/';

export const SPORSMAL: Sporsmal[] = [
	// ─── Sjømerker ──────────────────────────────────────────────────────────
	{
		id: 'sm-001',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Kardinal- og lateralsystemet',
		kategori: 'sjomerker',
		vanskelighet: 1,
		sporsmal: 'Du ser dette sjømerket forut. På hvilken side av merket er det trygt å passere?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'nord', tittel: 'Kardinalmerke' } },
		alternativer: [
			{ id: 'a', tekst: 'Nord for merket' },
			{ id: 'b', tekst: 'Sør for merket' },
			{ id: 'c', tekst: 'Øst for merket' },
			{ id: 'd', tekst: 'Vest for merket' }
		],
		riktig: 'a',
		forklaring:
			'Begge kjeglene peker opp, og svart ligger øverst: dette er et nordkardinalmerke. Farene ligger sør for merket, så du skal passere nord for det. Huskeregel: kjeglene peker mot den svarte fargen, og den svarte fargen viser hvilken vei du skal passere.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Kardinalsystemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sm-002',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Kardinal- og lateralsystemet',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Hvilket kardinalmerke er dette, og hvor skal du passere?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'vest', tittel: 'Kardinalmerke' } },
		alternativer: [
			{ id: 'a', tekst: 'Østkardinal – passer øst for merket' },
			{ id: 'b', tekst: 'Vestkardinal – passer vest for merket' },
			{ id: 'c', tekst: 'Sørkardinal – passer sør for merket' },
			{ id: 'd', tekst: 'Spesialmerke – kan passeres på alle sider' }
		],
		riktig: 'b',
		forklaring:
			'Kjeglene står spiss mot spiss, og det svarte båndet ligger i midten. Da er det et vestkardinalmerke, og trygt farvann ligger vest for merket. Kjeglene peker alltid mot der det svarte er.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Kardinalsystemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sm-003',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Kardinal- og lateralsystemet',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal:
			'Du går innover leia i hovedretningen for merkingen og ser dette merket. Hvordan skal du passere det?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'babord', tittel: 'Lateralmerke' } },
		alternativer: [
			{ id: 'a', tekst: 'Hold merket på babord side' },
			{ id: 'b', tekst: 'Hold merket på styrbord side' },
			{ id: 'c', tekst: 'Passer nord for merket' },
			{ id: 'd', tekst: 'Merket kan passeres på alle sider' }
		],
		riktig: 'a',
		forklaring:
			'Rødt merke med sylinderformet toppmerke er et babordmerke i IALA A. Går du i merkingens hovedretning – som regel innover leia eller nordover langs kysten – skal merket ligge på din babord side.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Lateralsystemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sm-004',
		emne: 4,
		pensumpunkt: '1.4.1',
		kategori: 'sjomerker',
		vanskelighet: 3,
		sporsmal: 'Hva betyr dette merket?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'frittliggende', tittel: 'Sjømerke' } },
		alternativer: [
			{ id: 'a', tekst: 'Frittliggende fare – hold god avstand, men merket kan rundes på alle sider' },
			{ id: 'b', tekst: 'Senterleiemerke – trygt farvann rundt merket' },
			{ id: 'c', tekst: 'Sørkardinal – passer sør for merket' },
			{ id: 'd', tekst: 'Spesialmerke – markerer et kabelfelt' }
		],
		riktig: 'a',
		forklaring:
			'To svarte kuler over hverandre, og et svart legeme med rødt bånd, markerer en frittliggende fare. Faren har trygt farvann rundt seg, men den er liten – hold god klaring.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Frittliggende fare', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sm-005',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Spesialmerker',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Hva forteller dette merket deg?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'spesial', tittel: 'Sjømerke' } },
		alternativer: [
			{ id: 'a', tekst: 'At det er grunt vann rett øst for merket' },
			{ id: 'b', tekst: 'At det er et spesielt område her, for eksempel kabel, oppdrett eller badeområde' },
			{ id: 'c', tekst: 'At du skal holde merket på styrbord side' },
			{ id: 'd', tekst: 'At det er trygt farvann hele veien rundt' }
		],
		riktig: 'b',
		forklaring:
			'Gult merke med gult kryss som toppmerke er et spesialmerke. Det markerer et område med en særskilt betydning – kabel, rørledning, oppdrettsanlegg, badeområde eller lignende – og er ikke primært et navigasjonsmerke.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Spesialmerke', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},

	// ─── Lanterner ──────────────────────────────────────────────────────────
	{
		id: 'la-001',
		emne: 4,
		pensumpunkt: '1.4.4',
		underpunkt: 'Lanterneføring på fritidsbåt',
		kategori: 'lanterner',
		vanskelighet: 2,
		sporsmal: 'Det er mørkt, og du ser dette lanternebildet. Hva ser du?',
		illustrasjon: {
			navn: 'lanterne',
			props: { fartoy: 'motorbat', sett: 'forfra', tittel: 'Hva ser du?' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Et maskindrevet fartøy som kommer rett mot deg' },
			{ id: 'b', tekst: 'Et seilfartøy som kommer rett mot deg' },
			{ id: 'c', tekst: 'Et fartøy du ser aktenfra' },
			{ id: 'd', tekst: 'Et fartøy til ankers' }
		],
		riktig: 'a',
		forklaring:
			'Du ser begge sidelanternene samtidig – grønt til venstre og rødt til høyre i bildet – pluss en hvit topplanterne over. Da ser du fartøyet forfra, og topplanternen viser at det er maskindrevet.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 23', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-002',
		emne: 4,
		pensumpunkt: '1.4.4',
		underpunkt: 'Lanterneføring på fritidsbåt',
		kategori: 'lanterner',
		vanskelighet: 2,
		sporsmal: 'Du ser rødt og grønt sidelys, men ingen hvit topplanterne. Hva er dette?',
		illustrasjon: {
			navn: 'lanterne',
			props: { fartoy: 'seilbat', sett: 'forfra', tittel: 'Hva ser du?' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Et seilfartøy for seil, sett forfra' },
			{ id: 'b', tekst: 'En motorbåt under 7 meter' },
			{ id: 'c', tekst: 'Et fartøy som sleper' },
			{ id: 'd', tekst: 'En robåt' }
		],
		riktig: 'a',
		forklaring:
			'Et seilfartøy som går for seil fører sidelanterner og akterlanterne, men ingen topplanterne. Ser du sidelys uten hvitt lys over, er det derfor et seilfartøy. Starter det motoren, regnes det som maskindrevet og skal tenne topplanternen.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 25', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-003',
		emne: 4,
		pensumpunkt: '1.4.4',
		underpunkt: 'Lanterneføring på fritidsbåt',
		kategori: 'lanterner',
		vanskelighet: 2,
		sporsmal: 'Du nærmer deg et fartøy og ser bare ett hvitt lys, uten rødt eller grønt. Hva betyr det mest sannsynlig?',
		illustrasjon: {
			navn: 'lanterne',
			props: { fartoy: 'motorbat', sett: 'aktenfra', tittel: 'Hva ser du?' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Du ser fartøyet aktenfra og er i ferd med å innhente det' },
			{ id: 'b', tekst: 'Fartøyet kommer rett mot deg' },
			{ id: 'c', tekst: 'Fartøyet krysser kursen din fra styrbord' },
			{ id: 'd', tekst: 'Fartøyet er manøvreringsudyktig' }
		],
		riktig: 'a',
		forklaring:
			'Akterlanternen er hvit og lyser bakover. Ser du bare den, ligger du bak fartøyet. Da er du innhentende, og innhentende fartøy skal alltid holde av veien.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 13 og regel 21', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-004',
		emne: 2,
		pensumpunkt: '1.2.b',
		underpunkt: 'Signalflagg A – jeg har dykker nede',
		kategori: 'lanterner',
		vanskelighet: 1,
		sporsmal: 'Du ser signalflagget A (blått og hvitt, med kløftet ytterkant) på et fartøy. Hva betyr det?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Jeg har dykker nede – hold godt klar og gå med liten fart' },
			{ id: 'b', tekst: 'Jeg trenger los' },
			{ id: 'c', tekst: 'Jeg har farlig last om bord' },
			{ id: 'd', tekst: 'Jeg er manøvreringsudyktig' }
		],
		riktig: 'a',
		forklaring:
			'Flagg A betyr at fartøyet har dykker i vannet. Du skal passere med god klaring og lav fart, siden dykkeren kan befinne seg et stykke fra båten.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 42 og signalflagg A', lenke: SDIR_SJOVEIS },
		kontrollert: '2026-09-07'
	},

	// ─── Vikeplikt ──────────────────────────────────────────────────────────
	{
		id: 'vi-001',
		emne: 4,
		pensumpunkt: '1.4.3',
		underpunkt: 'To motorbåter har kryssende kurser',
		kategori: 'vikeplikt',
		vanskelighet: 1,
		sporsmal: 'To motorbåter har kryssende kurser. Den andre båten kommer inn fra din styrbord side. Hva gjør du?',
		illustrasjon: {
			navn: 'vikeplikt',
			props: { situasjon: 'kryssende-fra-styrbord', annen: 'motor' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Du har vikeplikt og skal holde av veien' },
			{ id: 'b', tekst: 'Du holder kurs og fart' },
			{ id: 'c', tekst: 'Den som har størst fart har vikeplikt' },
			{ id: 'd', tekst: 'Dere dreier begge til styrbord' }
		],
		riktig: 'a',
		forklaring:
			'Når to maskindrevne fartøy har kryssende kurser, skal det fartøyet som har det andre på sin styrbord side holde av veien. Unnamanøveren skal være stor nok til at den er tydelig for den andre, og du skal helst passere akter for ham.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 15 og regel 16', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-002',
		emne: 4,
		pensumpunkt: '1.4.3',
		underpunkt: 'To motorbåter har kryssende kurser',
		kategori: 'vikeplikt',
		vanskelighet: 2,
		sporsmal: 'En motorbåt krysser kursen din fra babord side. Hva er riktig?',
		illustrasjon: {
			navn: 'vikeplikt',
			props: { situasjon: 'kryssende-fra-babord', annen: 'motor' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Du holder kurs og fart, men følger med og manøvrerer hvis han ikke viker' },
			{ id: 'b', tekst: 'Du har vikeplikt og dreier til styrbord' },
			{ id: 'c', tekst: 'Du øker farten for å komme foran' },
			{ id: 'd', tekst: 'Du har vikeplikt og dreier til babord' }
		],
		riktig: 'a',
		forklaring:
			'Han har deg på sin styrbord side, så han skal vike. Du skal holde kurs og fart. Men plikten til å holde kurs opphører når det er åpenbart at han ikke gjør det han skal – da må du selv manøvrere for å unngå sammenstøt.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 15 og regel 17', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-003',
		emne: 4,
		pensumpunkt: '1.4.3',
		underpunkt: 'To motorbåter har kryssende kurser',
		kategori: 'vikeplikt',
		vanskelighet: 1,
		sporsmal: 'Du møter en motorbåt tilnærmet rett forut, på motsatt kurs. Hva gjør dere?',
		illustrasjon: {
			navn: 'vikeplikt',
			props: { situasjon: 'motsatte-kurser', annen: 'motor' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Begge dreier til styrbord og passerer hverandre babord mot babord' },
			{ id: 'b', tekst: 'Begge dreier til babord' },
			{ id: 'c', tekst: 'Den minste båten viker' },
			{ id: 'd', tekst: 'Den som først ser den andre viker' }
		],
		riktig: 'a',
		forklaring:
			'Ved motsatte kurser skal begge maskindrevne fartøy dreie til styrbord, slik at de passerer hverandre med babord side mot babord side – rødt lys mot rødt lys.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 14', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-004',
		emne: 4,
		pensumpunkt: '1.4.3',
		kategori: 'vikeplikt',
		vanskelighet: 1,
		sporsmal: 'Du tar igjen en seilbåt og skal passere den. Hvem har vikeplikt?',
		illustrasjon: { navn: 'vikeplikt', props: { situasjon: 'innhenting', annen: 'seil' } },
		alternativer: [
			{ id: 'a', tekst: 'Du, fordi innhentende fartøy alltid skal holde av veien' },
			{ id: 'b', tekst: 'Seilbåten, fordi du er maskindrevet' },
			{ id: 'c', tekst: 'Ingen – dere passerer bare med god avstand' },
			{ id: 'd', tekst: 'Det avhenger av hvilken side du passerer på' }
		],
		riktig: 'a',
		forklaring:
			'Innhentingsregelen går foran alle andre vikepliktsregler. Et fartøy som innhenter et annet skal holde av veien, uansett om det er seil eller motor.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 13', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-005',
		emne: 4,
		pensumpunkt: '1.4.3',
		underpunkt: 'Seil- og motorfartøy krysser ferge eller frakteskip i trangt farvann',
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal:
			'Du kommer i fritidsbåt gjennom et trangt sund samtidig som en rutegående ferge skal ut fra fergeleiet. Hva gjelder?',
		illustrasjon: { navn: 'vikeplikt', props: { situasjon: 'kryssende-fra-babord', annen: 'nytte' } },
		alternativer: [
			{ id: 'a', tekst: 'Du skal så langt som mulig holde av veien for fergen' },
			{ id: 'b', tekst: 'Fergen har vikeplikt fordi den forlater kai' },
			{ id: 'c', tekst: 'Vanlig kryssregel gjelder – den som har den andre på styrbord viker' },
			{ id: 'd', tekst: 'Fergen har vikeplikt fordi den er større' }
		],
		riktig: 'a',
		forklaring:
			'I norske farvann gjelder en egen regel: lystfartøy og åpne båter skal mest mulig holde av veien for større fartøy, rutegående ferger og annen nyttetrafikk i trangt farvann, sterkt beferdet lei eller havneområde. Fergen er lite manøvrerbar og akselererer ofte raskt ut fra kai.',
		kilde: {
			verk: 'Sjøveisreglene',
			hjemmel: 'Regel 44 (ansvar mellom fartøy)',
			lenke: 'https://lovdata.no/dokument/SF/forskrift/1975-12-01-5/KAPITTEL_2-2'
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-006',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: 'Vikeplikt for nyttetrafikk',
		kategori: 'vikeplikt',
		vanskelighet: 2,
		sporsmal: 'Du går i en trang led. Hvor i leden skal du holde deg?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Så nær ledens yttergrense på styrbord side som det er trygt' },
			{ id: 'b', tekst: 'Midt i leden' },
			{ id: 'c', tekst: 'Så nær babord yttergrense som mulig' },
			{ id: 'd', tekst: 'Der det er dypest' }
		],
		riktig: 'a',
		forklaring:
			'I trang led eller trangt løp skal du holde til styrbord, så nær ytterkanten som det lar seg gjøre uten fare. Da får møtende trafikk plass, og større fartøy som er avhengige av dybden i leden slipper fram.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 9 og regel 41', lenke: SDIR_SJOVEIS },
		kontrollert: '2026-09-07'
	},

	// ─── Lover og regler ────────────────────────────────────────────────────
	{
		id: 'lo-001',
		emne: 4,
		pensumpunkt: '1.4.5',
		underpunkt: 'Promillegrense for fritidsbåt opp til 15 meter',
		kategori: 'lover',
		vanskelighet: 1,
		sporsmal: 'Hva er promillegrensen for den som fører en fritidsbåt under 15 meter?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '0,2' },
			{ id: 'b', tekst: '0,5' },
			{ id: 'c', tekst: '0,8' },
			{ id: 'd', tekst: '1,0' }
		],
		riktig: 'c',
		forklaring:
			'Grensen er 0,8 promille for fritidsbåt under 15 meter. Er fartøyet 15 meter eller lengre, gjelder 0,2 promille etter sjøloven. Det er lengden på fartøyet som avgjør – ikke farten eller hvor du er.',
		kilde: {
			verk: 'Småbåtloven',
			hjemmel: '§ 33',
			lenke: 'https://lovdata.no/dokument/NL/lov/1998-06-26-47'
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-002',
		emne: 4,
		pensumpunkt: '1.4.5',
		underpunkt: 'Regler for bruk av flyteutstyr',
		kategori: 'lover',
		vanskelighet: 2,
		sporsmal: 'Når er det påbudt å bruke flyteutstyr i en fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Alltid, i alle fritidsbåter' },
			{ id: 'b', tekst: 'For alle som oppholder seg utendørs i båt under 8 meter når båten er i fart' },
			{ id: 'c', tekst: 'Bare for barn under 16 år' },
			{ id: 'd', tekst: 'Bare når det er dårlig vær' }
		],
		riktig: 'b',
		forklaring:
			'Påbudet gjelder alle som oppholder seg utendørs i fritidsbåt under 8 meter mens båten er i fart. Er du under dekk, gjelder ikke bærepåbudet. Uavhengig av dette skal det alltid finnes egnet flyteutstyr til alle om bord. For barn under 15 år er det føreren som har ansvaret.',
		kilde: {
			verk: 'Småbåtloven',
			hjemmel: '§ 23 a',
			lenke: 'https://lovdata.no/dokument/NL/lov/1998-06-26-47'
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-003',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Forskrift om minstealder og båtførerbevis',
		kategori: 'lover',
		vanskelighet: 1,
		sporsmal: 'Hvem må ha båtførerbevis?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Alle som fører fritidsbåt' },
			{ id: 'b', tekst: 'Alle født 1. januar 1980 eller senere som fører båt over 8 meter eller med motor over 25 hk' },
			{ id: 'c', tekst: 'Bare de som fører båt raskere enn 25 knop' },
			{ id: 'd', tekst: 'Alle over 16 år' }
		],
		riktig: 'b',
		forklaring:
			'Kravet gjelder deg som er født 1. januar 1980 eller senere, og som fører fritidsbåt med lengde over 8 meter eller motor med større effekt enn 25 hk.',
		kilde: {
			verk: 'Forskrift om krav til minstealder og båtførerbevis mv. for fører av fritidsbåt',
			hjemmel: 'Sjøfartsdirektoratet',
			lenke: SDIR_BEVIS
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-004',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Forskrift om minstealder og båtførerbevis',
		kategori: 'lover',
		vanskelighet: 2,
		sporsmal: 'Du er 15 år. Hvilken båt har du lov til å føre?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Båt inntil 8 meter med motor på inntil 10 hk' },
			{ id: 'b', tekst: 'Båt inntil 8 meter med motor på inntil 25 hk' },
			{ id: 'c', tekst: 'Ingen båt med motor' },
			{ id: 'd', tekst: 'Alle båter, så lenge du har bestått båtførerprøven' }
		],
		riktig: 'a',
		forklaring:
			'Er du under 16 år, kan du bare føre båt med lengde inntil 8 meter og motor på maks 10 hk – uavhengig av om du har bestått båtførerprøven. Prøven kan tas fra du er 14, men beviset utstedes først ved fylte 16.',
		kilde: {
			verk: 'Forskrift om krav til minstealder og båtførerbevis mv. for fører av fritidsbåt',
			hjemmel: 'Sjøfartsdirektoratet',
			lenke: SDIR_BEVIS
		},
		kontrollert: '2026-09-07'
	},

	// ─── Nødsituasjoner ─────────────────────────────────────────────────────
	{
		id: 'no-001',
		emne: 4,
		pensumpunkt: '1.4.6',
		underpunkt: 'SR-radio (VHF) kanal 16',
		kategori: 'nodsituasjoner',
		vanskelighet: 1,
		sporsmal: 'Hvilken VHF-kanal er nød- og anropskanal?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Kanal 6' },
			{ id: 'b', tekst: 'Kanal 12' },
			{ id: 'c', tekst: 'Kanal 16' },
			{ id: 'd', tekst: 'Kanal 70' }
		],
		riktig: 'c',
		forklaring:
			'Kanal 16 er den internasjonale nød-, il- og anropskanalen, og skal holdes fri for vanlig prat. Kanal 70 brukes til DSC-nødalarm, som er den digitale varslingen.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.4.6', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'no-002',
		emne: 4,
		pensumpunkt: '1.4.6',
		underpunkt: 'Kystradiostasjonens nummer 120',
		kategori: 'nodsituasjoner',
		vanskelighet: 1,
		sporsmal: 'Hvilket telefonnummer ringer du for å nå kystradioen i en nødsituasjon?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '110' },
			{ id: 'b', tekst: '113' },
			{ id: 'c', tekst: '120' },
			{ id: 'd', tekst: '112' }
		],
		riktig: 'c',
		forklaring:
			'Kystradiostasjonene nås på 120. De koordinerer sjøredning og har direkte kontakt med hovedredningssentralene.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.4.6', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'no-003',
		emne: 2,
		pensumpunkt: '1.2.f',
		kategori: 'lydsignaler',
		vanskelighet: 2,
		sporsmal: 'Du har akutt fare for liv om bord og trenger øyeblikkelig hjelp. Hvilket anrop bruker du på VHF?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Mayday' },
			{ id: 'b', tekst: 'Pan-Pan' },
			{ id: 'c', tekst: 'Sécurité' },
			{ id: 'd', tekst: 'Roger' }
		],
		riktig: 'a',
		forklaring:
			'Mayday brukes når fartøy eller person er i alvorlig og overhengende fare og trenger øyeblikkelig hjelp. Pan-Pan er hastemelding uten overhengende livsfare, for eksempel motorstopp på et trygt sted. Sécurité er sikkerhetsmelding, typisk om navigasjonsfare eller vær.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Vedlegg IV', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'no-004',
		emne: 2,
		pensumpunkt: '1.2.f',
		kategori: 'lydsignaler',
		vanskelighet: 2,
		sporsmal: 'Hvilket av disse er et godkjent nødsignal?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Å blinke med lanternene tre ganger' },
			{ id: 'b', tekst: 'Langsomt og gjentatt heving og senking av utstrakte armer ut til siden' },
			{ id: 'c', tekst: 'Å vinke med begge armer over hodet én gang' },
			{ id: 'd', tekst: 'Å tenne et grønt lys' }
		],
		riktig: 'b',
		forklaring:
			'Langsom, gjentatt heving og senking av utstrakte armer er et av nødsignalene i vedlegg IV. Andre eksempler er rødt fallskjermlys, rødt håndbluss, oransje røyksignal og gjentatte korte støt i tåkelur.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Vedlegg IV', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'no-005',
		emne: 2,
		pensumpunkt: '1.2.d',
		kategori: 'lydsignaler',
		vanskelighet: 3,
		sporsmal: 'Du gir to korte støt i signalhornet. Hva betyr det?',
		illustrasjon: {
			navn: 'lydsignal',
			props: { signal: 'to-korte', tittel: 'To korte støt' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Jeg endrer kurs til styrbord' },
			{ id: 'b', tekst: 'Jeg endrer kurs til babord' },
			{ id: 'c', tekst: 'Jeg går med maskinen bakover' },
			{ id: 'd', tekst: 'Jeg forstår ikke dine hensikter' }
		],
		riktig: 'b',
		forklaring:
			'Manøversignalene: ett kort støt betyr at jeg endrer kurs til styrbord, to korte at jeg endrer kurs til babord, og tre korte at jeg går med maskinen bakover. Fem eller flere korte støt er varselsignalet for at du er i tvil om den andres hensikter.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 34', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Navigasjon ─────────────────────────────────────────────────────────
	{
		id: 'na-001',
		emne: 3,
		pensumpunkt: '1.3.d',
		kategori: 'navigasjon',
		vanskelighet: 2,
		sporsmal: 'Hva er forskjellen på misvisning og deviasjon?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Misvisning er forskjellen mellom rettvisende og magnetisk nord. Deviasjon er kompassfeil som skyldes magnetisme i båten' },
			{ id: 'b', tekst: 'Misvisning skyldes magnetisme i båten. Deviasjon er forskjellen mellom rettvisende og magnetisk nord' },
			{ id: 'c', tekst: 'Begge deler betyr det samme' },
			{ id: 'd', tekst: 'Misvisning gjelder GPS, deviasjon gjelder kompass' }
		],
		riktig: 'a',
		forklaring:
			'Misvisning er vinkelen mellom geografisk (rettvisende) nord og magnetisk nord, og varierer med sted og tid. Deviasjon er feilen kompasset får av jern, elektronikk og strøm i din egen båt, og varierer med hvilken kurs du styrer.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.d', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-002',
		emne: 3,
		pensumpunkt: '1.3.b',
		kategori: 'kartsymboler',
		vanskelighet: 2,
		sporsmal: 'Hvor på sjøkartet måler du avstand?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'På breddeskalaen langs sidene av kartet' },
			{ id: 'b', tekst: 'På lengdeskalaen langs topp og bunn av kartet' },
			{ id: 'c', tekst: 'Hvor som helst, skalaen er lik overalt' },
			{ id: 'd', tekst: 'Med linjalen som følger med kartsamlingen' }
		],
		riktig: 'a',
		forklaring:
			'Ett breddeminutt tilsvarer én nautisk mil (1852 meter), og breddeskalaen ligger langs sidene av kartet. Lengdeskalaen på topp og bunn kan ikke brukes til avstand, fordi lengdegradene nærmer seg hverandre mot polene. Mål alltid på samme breddegrad som strekningen din.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.b', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-003',
		emne: 3,
		pensumpunkt: '1.3.i',
		kategori: 'beregning',
		vanskelighet: 2,
		sporsmal: 'Du holder 12 knop i 45 minutter. Hvor langt har du seilt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '6 nautiske mil' },
			{ id: 'b', tekst: '9 nautiske mil' },
			{ id: 'c', tekst: '12 nautiske mil' },
			{ id: 'd', tekst: '16 nautiske mil' }
		],
		riktig: 'b',
		forklaring:
			'Distanse = fart × tid. 45 minutter er 0,75 time, og 12 × 0,75 = 9 nautiske mil. Knop betyr nautiske mil per time, så du trenger aldri å regne om enheten.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.i', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-004',
		emne: 3,
		pensumpunkt: '1.3.i',
		kategori: 'beregning',
		vanskelighet: 3,
		sporsmal: 'Du skal gå 21 nautiske mil og holder 14 knop. Hvor lang tid tar turen?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '1 time og 15 minutter' },
			{ id: 'b', tekst: '1 time og 30 minutter' },
			{ id: 'c', tekst: '1 time og 45 minutter' },
			{ id: 'd', tekst: '2 timer' }
		],
		riktig: 'b',
		forklaring:
			'Tid = distanse delt på fart. 21 / 14 = 1,5 timer, altså 1 time og 30 minutter. Husk at desimaltimer må gjøres om: 0,5 time er 30 minutter, ikke 50.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.i', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-005',
		emne: 3,
		pensumpunkt: '1.3.e',
		underpunkt: 'Apper på mobil og nettbrett',
		kategori: 'navigasjon',
		vanskelighet: 3,
		sporsmal: 'Hva er den viktigste begrensningen ved å navigere med kartapp på mobilen?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'At den er avhengig av batteri, dekning og oppdaterte kartdata, og kan slutte å virke uten forvarsel' },
			{ id: 'b', tekst: 'At GPS-posisjonen er unøyaktig med flere hundre meter' },
			{ id: 'c', tekst: 'At apper ikke viser dybder' },
			{ id: 'd', tekst: 'At det er forbudt å bruke mobil som eneste navigasjonshjelpemiddel' }
		],
		riktig: 'a',
		forklaring:
			'Elektroniske hjelpemidler er nyttige, men sårbare: tomt batteri, vann, manglende dekning eller utdaterte kartdata gjør dem ubrukelige. Ha alltid papirkart og kompass som reserve, og hold utkikk med egne øyne.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.e', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},

	// ─── Sjømannskap og sikkerhet ───────────────────────────────────────────
	{
		id: 'sj-001',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Dødmannsknapp',
		kategori: 'sikkerhetsutstyr',
		vanskelighet: 1,
		sporsmal: 'Hva er hensikten med dødmannsknappen?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Å stoppe motoren umiddelbart hvis føreren faller over bord eller mister kontrollen' },
			{ id: 'b', tekst: 'Å starte motoren raskere' },
			{ id: 'c', tekst: 'Å utløse nødsignal' },
			{ id: 'd', tekst: 'Å begrense toppfarten' }
		],
		riktig: 'a',
		forklaring:
			'Snoren festes til føreren. Faller han over bord, rykkes knappen ut og motoren stopper. Uten den fortsetter båten i sirkel i full fart og kan treffe den som ligger i vannet.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.a', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-002',
		emne: 1,
		pensumpunkt: '1.1.b',
		underpunkt: 'Bensindamp',
		kategori: 'brann',
		vanskelighet: 2,
		sporsmal: 'Hvorfor skal motorrommet luftes ut før du starter en bensinmotor?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Bensindamp er tyngre enn luft og samler seg nederst i båten, der en gnist kan antenne den' },
			{ id: 'b', tekst: 'Bensindamp stiger opp og forsvinner av seg selv' },
			{ id: 'c', tekst: 'For å få bedre kjøling på motoren' },
			{ id: 'd', tekst: 'For å unngå kondens i drivstofftanken' }
		],
		riktig: 'a',
		forklaring:
			'Bensindamp er tyngre enn luft og legger seg i kjølsvinet og motorrommet. Blandingen er svært eksplosjonsfarlig, og en gnist fra starteren er nok. Vifte eller åpne luker i noen minutter før start.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.b', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-003',
		emne: 1,
		pensumpunkt: '1.1.m',
		underpunkt: 'Nedkjøling (hypotermi)',
		kategori: 'forstehjelp',
		vanskelighet: 3,
		sporsmal: 'Du har fått en sterkt nedkjølt person opp av sjøen. Hva er riktig?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Håndter personen varsomt og mest mulig vannrett, fjern våte klær, isoler mot kulde og varsle hjelp' },
			{ id: 'b', tekst: 'Sett personen rett i en varm dusj for å få opp temperaturen fort' },
			{ id: 'c', tekst: 'Gni kraftig på armer og bein for å få i gang sirkulasjonen' },
			{ id: 'd', tekst: 'Gi alkohol for å varme innenfra' }
		],
		riktig: 'a',
		forklaring:
			'Ved alvorlig nedkjøling er hjertet svært ustabilt. Rask oppvarming utenfra, hardhendt håndtering eller å reise personen opp kan utløse hjertestans. Håndter varsomt, hold personen vannrett, isoler mot videre varmetap og få profesjonell hjelp.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.m', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-004',
		emne: 1,
		pensumpunkt: '1.1.f',
		underpunkt: 'Konstruksjonskategorier (CE) for fritidsfartøy A, B, C, D',
		kategori: 'sjomannskap',
		vanskelighet: 3,
		sporsmal: 'Hva forteller CE-konstruksjonskategori C deg om båten?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'At den er bygget for kystnært farvann, med vind opp til styrke 6 og bølger opp til 2 meter' },
			{ id: 'b', tekst: 'At den kan brukes på åpent hav uten begrensninger' },
			{ id: 'c', tekst: 'At den bare kan brukes på beskyttet vann som innsjøer' },
			{ id: 'd', tekst: 'At den er godkjent for inntil tolv passasjerer' }
		],
		riktig: 'a',
		forklaring:
			'Kategoriene beskriver hvilke forhold båten er konstruert for: A er havgående, B er utenskjærs, C er kystnært farvann (vind opp til 6 og bølger opp til 2 meter) og D er beskyttet farvann. Kategorien sier noe om båtens tåleevne, ikke om førerens.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.f', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-005',
		emne: 4,
		pensumpunkt: '1.4.7',
		underpunkt: 'Farer forbundet med høy fart',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hva er den største faren ved å kjøre fort i fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'At synsfeltet snevres inn og du får mye kortere tid til å oppdage og reagere på hindringer' },
			{ id: 'b', tekst: 'At motoren blir overopphetet' },
			{ id: 'c', tekst: 'At kompasset blir unøyaktig' },
			{ id: 'd', tekst: 'At drivstofforbruket øker' }
		],
		riktig: 'a',
		forklaring:
			'I høy fart får du tunnelsyn, og både skjær, staker og andre båter dukker opp langt senere enn du rekker å håndtere. I tillegg henger elektroniske kart etter virkeligheten. Farten må alltid tilpasses sikt, farvann og trafikk.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.4.7', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-006',
		emne: 1,
		pensumpunkt: '1.1.n',
		underpunkt: 'Sjøforhold',
		kategori: 'vaer',
		vanskelighet: 2,
		sporsmal: 'Vindvarselet sier «liten kuling, 12 m/s». Hva bør du gjøre med en åpen 17-fots båt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Utsette turen eller holde deg i skjermet farvann' },
			{ id: 'b', tekst: 'Dra ut, men holde høy fart for å komme fort fram' },
			{ id: 'c', tekst: 'Laste båten tyngre for å ligge stødigere' },
			{ id: 'd', tekst: 'Ta av flyteutstyret for å bevege deg lettere' }
		],
		riktig: 'a',
		forklaring:
			'Liten kuling gir raskt bratt sjø, særlig der vinden står mot strøm eller ut fra åpne fjordmunninger. En liten åpen båt har lite fribord og tar inn vann. Vurder å utsette turen, eller legg ruten i le av land.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.n', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-007',
		emne: 1,
		pensumpunkt: '1.1.h',
		underpunkt: 'Fribord, dypgående, stabilitet og lasteevne',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hva skjer med båten hvis du laster den for tungt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Fribordet minker, stabiliteten blir dårligere og båten tar lettere inn vann' },
			{ id: 'b', tekst: 'Båten blir stødigere fordi den ligger dypere' },
			{ id: 'c', tekst: 'Det påvirker bare farten' },
			{ id: 'd', tekst: 'Ingenting, så lenge lasten er godt surret' }
		],
		riktig: 'a',
		forklaring:
			'Overlast senker fribordet, altså høyden fra vannlinjen opp til der vann kan komme inn. Samtidig blir stabiliteten dårligere, særlig hvis lasten er høyt plassert. Følg produsentens oppgitte maksimallast, og plasser tungt lavt og midt i båten.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.h', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-008',
		emne: 1,
		pensumpunkt: '1.1.q',
		underpunkt: 'Sjøvettreglene',
		kategori: 'sjomannskap',
		vanskelighet: 1,
		sporsmal: 'Hva sier sjøveisreglene om utkikk?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Ethvert fartøy skal alltid holde ordentlig utkikk med syn og hørsel, og med alle tilgjengelige midler' },
			{ id: 'b', tekst: 'Utkikk kreves bare om natten' },
			{ id: 'c', tekst: 'Utkikk kreves bare for fartøy over 15 meter' },
			{ id: 'd', tekst: 'Radar eller kartplotter erstatter kravet til utkikk' }
		],
		riktig: 'a',
		forklaring:
			'Kravet om utkikk gjelder til enhver tid og for alle fartøy, slik at du kan bedømme situasjonen og faren for sammenstøt. Elektronikk kommer i tillegg til øyne og ører, aldri i stedet for.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 5', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Lydsignaler under nedsatt sikt – regel 35 ───────────────────────────
	{
		id: 'ly-001',
		emne: 2,
		pensumpunkt: '1.2.e',
		underpunkt: null,
		kategori: 'lydsignaler',
		vanskelighet: 2,
		sporsmal:
			'Det er tett tåke, og du går for maskin med fart gjennom vannet. Hvilket lydsignal skal du gi?',
		illustrasjon: {
			navn: 'lydsignal',
			props: { signal: 'ett-langt', tittel: 'Ett langt støt' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Ett langt støt minst hvert annet minutt' },
			{ id: 'b', tekst: 'To lange støt minst hvert annet minutt' },
			{ id: 'c', tekst: 'Tre korte støt hvert minutt' },
			{ id: 'd', tekst: 'Ett langt og to korte støt hvert minutt' }
		],
		riktig: 'a',
		forklaring:
			'Et maskindrevet fartøy som gjør fart gjennom vannet skal gi ett langt støt minst hvert annet minutt. Ligger du med stoppet maskin og ikke gjør fart, blir det to lange støt med om lag to sekunders mellomrom. Et langt støt varer fire til seks sekunder.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 35 (a) og (b)', lenke: LYDSIGNALER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'ly-002',
		emne: 2,
		pensumpunkt: '1.2.c',
		underpunkt: null,
		kategori: 'lydsignaler',
		vanskelighet: 3,
		sporsmal: 'Hvor lenge varer et langt støt, og hvor lenge varer et kort støt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Langt støt fire til seks sekunder, kort støt om lag ett sekund' },
			{ id: 'b', tekst: 'Langt støt to sekunder, kort støt et halvt sekund' },
			{ id: 'c', tekst: 'Langt støt ti sekunder, kort støt to sekunder' },
			{ id: 'd', tekst: 'Det er ikke fastsatt noen varighet' }
		],
		riktig: 'a',
		forklaring:
			'Sjøveisreglene definerer et langt støt som fire til seks sekunder, og et kort støt som om lag ett sekund. Definisjonene gjør at manøversignaler og tåkesignaler kan skilles fra hverandre uansett hvem som gir dem.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 32', lenke: LYDSIGNALER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'ly-003',
		emne: 2,
		pensumpunkt: '1.2.d',
		underpunkt: null,
		kategori: 'lydsignaler',
		vanskelighet: 2,
		sporsmal:
			'En båt nærmer seg, og du er usikker på hva han har tenkt å gjøre. Hvilket signal gir du?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Minst fem korte og raske støt' },
			{ id: 'b', tekst: 'Ett langt støt' },
			{ id: 'c', tekst: 'To lange støt' },
			{ id: 'd', tekst: 'Tre korte støt' }
		],
		riktig: 'a',
		forklaring:
			'Minst fem korte og raske støt er tvilsignalet. Det betyr at du ikke forstår den andres hensikter, eller tviler på at han gjør nok for å unngå sammenstøt. Signalet kan suppleres med minst fem korte blink med lys.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 34 (d)', lenke: LYDSIGNALER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'ly-004',
		emne: 2,
		pensumpunkt: '1.2.d',
		underpunkt: null,
		kategori: 'lydsignaler',
		vanskelighet: 2,
		sporsmal: 'Hva betyr tre korte støt i signalhornet?',
		illustrasjon: {
			navn: 'lydsignal',
			props: { signal: 'tre-korte', tittel: 'Tre korte støt' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Jeg går med maskinen bakover' },
			{ id: 'b', tekst: 'Jeg endrer kurs til styrbord' },
			{ id: 'c', tekst: 'Jeg endrer kurs til babord' },
			{ id: 'd', tekst: 'Jeg er manøvreringsudyktig' }
		],
		riktig: 'a',
		forklaring:
			'Manøversignalene henger sammen: ett kort støt er kursendring til styrbord, to korte til babord, og tre korte betyr at maskinen går bakover. Signalene sier hva du gjør akkurat nå – ikke hva du har tenkt å gjøre senere.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 34 (a)', lenke: LYDSIGNALER },
		kontrollert: '2026-09-07'
	},

	// ─── Fart, farvann og norske særregler ──────────────────────────────────
	{
		id: 'fa-001',
		emne: 4,
		pensumpunkt: '1.4.7',
		underpunkt: 'Farer forbundet med høy fart',
		kategori: 'sjomannskap',
		vanskelighet: 1,
		sporsmal: 'Du passerer et sted der folk bader. Hva er høyeste tillatte fart?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '5 knop når du er nærmere enn 50 meter fra badende' },
			{ id: 'b', tekst: '5 knop når du er nærmere enn 200 meter fra badende' },
			{ id: 'c', tekst: '10 knop når du er nærmere enn 50 meter' },
			{ id: 'd', tekst: 'Ingen egen grense – bare alminnelig aktsomhet' }
		],
		riktig: 'a',
		forklaring:
			'Fartøy skal ikke gå fortere enn 5 knop nærmere enn 50 meter fra steder der bading pågår. Dette er en statlig regel som gjelder i hele landet. Kommunene kan i tillegg ha egne, strengere fartsgrenser i sine sjøområder.',
		kilde: { verk: 'Forskrift om fartsgrenser på sjøen', hjemmel: '§ 3', lenke: FARTSGRENSER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'fa-002',
		emne: 2,
		pensumpunkt: '1.2.g',
		underpunkt: null,
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal:
			'Du ser et fartøy som fører signalflagget A. Hva plikter du å gjøre etter reglene for norske farvann?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Passere med god avstand og liten fart, og om mulig stoppe maskinen'
			},
			{ id: 'b', tekst: 'Holde vanlig fart, men gi lydsignal' },
			{ id: 'c', tekst: 'Snu og gå tilbake samme vei' },
			{ id: 'd', tekst: 'Anrope fartøyet på VHF kanal 16 før du passerer' }
		],
		riktig: 'a',
		forklaring:
			'Flagg A betyr «jeg har dykker nede, hold godt klar og gå med liten fart». Andre fartøy skal passere forsiktig, og maskindrevne fartøy bør om mulig stoppe maskinen. Propellen er den store faren for en dykker som er på vei opp.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 42', lenke: NORSKE_FARVANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'fa-003',
		emne: 2,
		pensumpunkt: '1.2.g',
		underpunkt: null,
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal: 'Hva sier reglene for norske farvann om ankring?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Du skal ikke ankre eller fortøye slik at du hindrer passasjen for andre fartøy'
			},
			{ id: 'b', tekst: 'Ankring er bare tillatt i merkede ankringsområder' },
			{ id: 'c', tekst: 'Du kan ankre hvor du vil, så lenge du fører ankerlanterne' },
			{ id: 'd', tekst: 'Ankring i led er tillatt inntil tolv timer' }
		],
		riktig: 'a',
		forklaring:
			'Fartøy skal ikke uten tvingende nødvendighet ankres eller fortøyes slik at det hindrer passasjen for andre eller kan skade dem. I praksis betyr det: hold deg unna leia, snuplasser og innseilinger når du legger deg for anker.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 45', lenke: NORSKE_FARVANN },
		kontrollert: '2026-09-07'
	},

	// ─── Lanterner, forts. ──────────────────────────────────────────────────
	{
		id: 'la-005',
		emne: 4,
		pensumpunkt: '1.4.4',
		underpunkt: 'Lanterneføring på fritidsbåt',
		kategori: 'lanterner',
		vanskelighet: 2,
		sporsmal: 'Hvilken farge har lanternene på babord og styrbord side?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Babord er rød, styrbord er grønn' },
			{ id: 'b', tekst: 'Babord er grønn, styrbord er rød' },
			{ id: 'c', tekst: 'Begge er hvite' },
			{ id: 'd', tekst: 'Babord er rød, styrbord er hvit' }
		],
		riktig: 'a',
		forklaring:
			'Babord er rød, styrbord er grønn. Sidelanternene lyser 112,5 grader fra rett forut og bakover til tvers. Ser du grønt lys, ser du fartøyets styrbord side, og da er du selv på hans styrbord side.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 21 (b)', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-006',
		emne: 2,
		pensumpunkt: '1.2.b',
		underpunkt: 'Lanterne på robåt',
		kategori: 'lanterner',
		vanskelighet: 2,
		sporsmal: 'Hva skal en robåt ha av lys om natten?',
		illustrasjon: {
			navn: 'lanterne',
			props: { fartoy: 'robat', sett: 'forfra', tittel: 'Robåt om natten' }
		},
		alternativer: [
			{
				id: 'a',
				tekst: 'Minst en lommelykt eller et hvitt lys som vises i tide til å unngå sammenstøt'
			},
			{ id: 'b', tekst: 'Røde og grønne sidelanterner' },
			{ id: 'c', tekst: 'En hvit topplanterne' },
			{ id: 'd', tekst: 'Ingenting – robåter er unntatt' }
		],
		riktig: 'a',
		forklaring:
			'Fartøy som ros kan føre samme lanterner som seilfartøy, men skal minst ha en elektrisk lommelykt eller en tent lanterne med hvitt lys klar til å vises i god nok tid til å hindre sammenstøt. Vis lyset mot den som nærmer seg.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 25 (d) (ii)', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-007',
		emne: 2,
		pensumpunkt: '1.2.b',
		underpunkt: 'Lanterner på seilfartøy',
		kategori: 'lanterner',
		vanskelighet: 3,
		sporsmal:
			'En seilbåt går for seil og starter i tillegg motoren. Hva må skje med lanterneføringen?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Den må tenne hvit topplanterne, fordi den nå regnes som maskindrevet' },
			{ id: 'b', tekst: 'Ingenting – den fører seilbåtlanterner så lenge seilene er oppe' },
			{ id: 'c', tekst: 'Den må slukke sidelanternene' },
			{ id: 'd', tekst: 'Den må vise et rødt rundtlysende lys' }
		],
		riktig: 'a',
		forklaring:
			'Et seilfartøy som bruker motor regnes som maskindrevet fartøy, uansett om seilene står oppe. Da skal topplanternen tennes, og fartøyet får de vikepliktene et maskindrevet fartøy har. Om dagen skal det i tillegg vise en svart kjegle med spissen ned.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 25 (e)', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-008',
		emne: 2,
		pensumpunkt: '1.2.b',
		underpunkt: null,
		kategori: 'lanterner',
		vanskelighet: 3,
		sporsmal: 'Hvilket lys skal en fritidsbåt under 50 meter vise når den ligger til ankers?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'En rundtlysende hvit lanterne der den best kan sees' },
			{ id: 'b', tekst: 'Rødt og grønt sidelys' },
			{ id: 'c', tekst: 'To røde rundtlysende lanterner' },
			{ id: 'd', tekst: 'Ingen lys – ankerlys gjelder bare for skip' }
		],
		riktig: 'a',
		forklaring:
			'Fartøy under 50 meter til ankers viser én rundtlysende hvit lanterne der den best kan sees, og om dagen en svart kule forut. Båter under 7 meter slipper dette hvis de ikke ligger i eller nær trang lei, renne, ankerplass eller der andre normalt navigerer.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 30', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Sjømerker, forts. ──────────────────────────────────────────────────
	{
		id: 'sm-006',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Kardinal- og lateralsystemet',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Hvilket merke er dette, og hvor er det trygt å passere?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'ost', tittel: 'Kardinalmerke' } },
		alternativer: [
			{ id: 'a', tekst: 'Østkardinal – passer øst for merket' },
			{ id: 'b', tekst: 'Vestkardinal – passer vest for merket' },
			{ id: 'c', tekst: 'Nordkardinal – passer nord for merket' },
			{ id: 'd', tekst: 'Sørkardinal – passer sør for merket' }
		],
		riktig: 'a',
		forklaring:
			'Kjeglene står base mot base, som et egg eller en tønne. Da er det østkardinal, og du skal passere øst for merket. Huskeregelen for alle kardinalmerker er den samme: kjeglene peker mot det svarte båndet, og den svarte fargen viser hvilken side du skal gå på.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Kardinalsystemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sm-007',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Kardinal- og lateralsystemet',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal:
			'Du går innover leia i merkingens hovedretning og ser et grønt merke med kjegleformet toppmerke. Hvordan passerer du?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'styrbord', tittel: 'Lateralmerke' } },
		alternativer: [
			{ id: 'a', tekst: 'Hold merket på styrbord side' },
			{ id: 'b', tekst: 'Hold merket på babord side' },
			{ id: 'c', tekst: 'Passer øst for merket' },
			{ id: 'd', tekst: 'Merket kan passeres på alle sider' }
		],
		riktig: 'a',
		forklaring:
			'Grønt merke med kjegleformet toppmerke er et styrbordmerke i IALA A. Går du i merkingens hovedretning, skal merket ligge på din styrbord side. Går du motsatt vei ut leia, blir det omvendt – derfor må du alltid vite hvilken vei hovedretningen går.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Lateralsystemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sm-008',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Kardinal- og lateralsystemet',
		kategori: 'sjomerker',
		vanskelighet: 3,
		sporsmal: 'Hva betyr et merke med røde og hvite loddrette striper og rød kule som toppmerke?',
		illustrasjon: { navn: 'sjomerke', props: { merke: 'senterleie', tittel: 'Sjømerke' } },
		alternativer: [
			{
				id: 'a',
				tekst: 'Senterleiemerke – trygt farvann rundt merket, ofte midt i innseilingen'
			},
			{ id: 'b', tekst: 'Frittliggende fare – hold god avstand' },
			{ id: 'c', tekst: 'Babordmerke – hold det på babord side' },
			{ id: 'd', tekst: 'Spesialmerke – markerer et kabelfelt' }
		],
		riktig: 'a',
		forklaring:
			'Røde og hvite loddrette striper med rød kule er et senterleiemerke, også kalt midtfarvannsmerke. Det står der det er trygt farvann rundt, typisk midt i en innseiling eller ved starten av en led, og kan passeres på begge sider.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Senterleiemerke', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},

	// ─── Kart og symboler ───────────────────────────────────────────────────
	{
		id: 'ka-001',
		emne: 4,
		pensumpunkt: '1.4.2',
		underpunkt: 'Skvalpeskjær, grunner, broer',
		kategori: 'kartsymboler',
		vanskelighet: 2,
		sporsmal: 'Hva er et skvalpeskjær?',
		illustrasjon: {
			navn: 'kartsymbol',
			props: { symbol: 'skvalpeskjaer', tittel: 'Symbol i sjøkartet' }
		},
		alternativer: [
			{
				id: 'a',
				tekst: 'Et skjær som ligger så vidt over eller under vannflaten, og som sjøen skvulper over'
			},
			{ id: 'b', tekst: 'Et skjær som alltid er tørt' },
			{ id: 'c', tekst: 'En grunne dypere enn 20 meter' },
			{ id: 'd', tekst: 'Et kunstig skjær laget for å bryte bølger' }
		],
		riktig: 'a',
		forklaring:
			'Et skvalpeskjær ligger i vannflaten, og bølgene skyller over det. Det er blant de farligste hindringene, fordi det er nesten umulig å se i sjø og motlys. I kartet er det merket med eget symbol – lær deg det, og hold god avstand.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.4.2', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'ka-002',
		emne: 4,
		pensumpunkt: '1.4.2',
		underpunkt: 'Kabel, rørledninger og luftspenn',
		kategori: 'kartsymboler',
		vanskelighet: 2,
		sporsmal: 'Kartet viser et luftspenn over sundet med en høyde oppgitt i meter. Hva betyr tallet?',
		illustrasjon: {
			navn: 'kartsymbol',
			props: { symbol: 'luftspenn', tittel: 'Luftspenn med seilingshøyde' }
		},
		alternativer: [
			{
				id: 'a',
				tekst: 'Seilingshøyden – den frie høyden under spennet, som masta di må være lavere enn'
			},
			{ id: 'b', tekst: 'Høyden på masten som bærer kabelen' },
			{ id: 'c', tekst: 'Dybden under spennet' },
			{ id: 'd', tekst: 'Avstanden mellom de to mastene' }
		],
		riktig: 'a',
		forklaring:
			'Tallet er seilingshøyden, altså fri høyde under spennet. Har du seilbåt, må masten med antenner være godt lavere. Husk at høyden er oppgitt fra et fast referansenivå, og at høy vannstand reduserer den frie høyden. Elektriske luftspenn krever ekstra klaring – strøm kan slå over.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.4.2', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'ka-003',
		emne: 4,
		pensumpunkt: '1.4.2',
		underpunkt: 'Kabel, rørledninger og luftspenn',
		kategori: 'kartsymboler',
		vanskelighet: 2,
		sporsmal: 'Kartet viser at det går en sjøkabel i området. Hva er viktigst å huske?',
		illustrasjon: {
			navn: 'kartsymbol',
			props: { symbol: 'kabel', tittel: 'Kabelsymbol i sjøkartet' }
		},
		alternativer: [
			{ id: 'a', tekst: 'Du skal ikke ankre eller fiske med bunnredskap der' },
			{ id: 'b', tekst: 'Du kan ikke passere over kabelen' },
			{ id: 'c', tekst: 'Kabelen påvirker kompasset' },
			{ id: 'd', tekst: 'Det er alltid grunt der kabelen går' }
		],
		riktig: 'a',
		forklaring:
			'Ankring er forbudt i kabel- og rørledningsområder. Et anker kan rive løs kabelen, og å få en strømførende kabel opp med ankeret er livsfarlig. Å passere over er uproblematisk. Områdene er ofte også merket med gule spesialmerker.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.4.2', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},

	// ─── Vikeplikt, forts. ──────────────────────────────────────────────────
	{
		id: 'vi-007',
		emne: 4,
		pensumpunkt: '1.4.3',
		underpunkt: 'Motorbåt og seilfartøy har kryssende kurser',
		kategori: 'vikeplikt',
		vanskelighet: 1,
		sporsmal:
			'Du går med motorbåt og krysser kurs med en seilbåt som seiler for seil alene. Hvem viker?',
		illustrasjon: { navn: 'vikeplikt', props: { situasjon: 'kryssende-fra-babord', annen: 'seil' } },
		alternativer: [
			{ id: 'a', tekst: 'Du, fordi maskindrevet fartøy skal holde av veien for seilfartøy' },
			{ id: 'b', tekst: 'Seilbåten, fordi den er mest manøvrerbar' },
			{ id: 'c', tekst: 'Den som har den andre på styrbord side' },
			{ id: 'd', tekst: 'Den minste båten' }
		],
		riktig: 'a',
		forklaring:
			'Et maskindrevet fartøy skal holde av veien for seilfartøy. Men merk unntakene: hvis seilbåten innhenter deg, er det den som viker, og i trangt farvann skal både seil- og motorfritidsbåter holde av veien for større nyttetrafikk.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 18', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-008',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: 'Vikeplikt mellom seilbåter',
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal: 'To seilbåter nærmer seg hverandre med vinden inn fra hver sin side. Hvem viker?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Den som har vinden inn fra babord side' },
			{ id: 'b', tekst: 'Den som har vinden inn fra styrbord side' },
			{ id: 'c', tekst: 'Den som ligger nærmest land' },
			{ id: 'd', tekst: 'Den som har mest seil oppe' }
		],
		riktig: 'a',
		forklaring:
			'Når to seilfartøy har vinden inn fra hver sin side, skal det som har vinden inn fra babord holde av veien. Har begge vinden inn fra samme side, viker den som ligger til lovart – altså nærmest vinden.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 12', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-009',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: 'Vikeplikt for nyttetrafikk',
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal:
			'Du skal krysse en trang led der et stort lasteskip kommer. Hva sier sjøveisreglene om dette?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Du skal ikke hindre et fartøy som bare kan navigere trygt innenfor leden'
			},
			{ id: 'b', tekst: 'Du har alltid forkjørsrett fordi du er minst' },
			{ id: 'c', tekst: 'Vanlig kryssregel gjelder uten unntak' },
			{ id: 'd', tekst: 'Du skal gi ett langt støt og fortsette' }
		],
		riktig: 'a',
		forklaring:
			'Et fartøy under 20 meter, og seilfartøy, skal ikke hindre framkomsten for et fartøy som bare kan navigere trygt innenfor en trang lei eller renne. Store skip er bundet av dybden og kan ikke bare vike unna. Kryss tydelig akter for skipet, eller vent.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 9 (b)', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-010',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: null,
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal:
			'Hvordan avgjør du om det er fare for sammenstøt med en båt du ser på skrå framfor deg?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Ta peiling flere ganger. Endrer ikke kompasspeilingen seg merkbart, er det fare for sammenstøt'
			},
			{ id: 'b', tekst: 'Hvis den ser ut til å bli større, er det fare' },
			{ id: 'c', tekst: 'Hvis avstanden er under 100 meter' },
			{ id: 'd', tekst: 'Hvis dere har samme fart' }
		],
		riktig: 'a',
		forklaring:
			'Er kompasspeilingen til et fartøy som nærmer seg tilnærmet konstant, foreligger det fare for sammenstøt. Da er dere på kollisjonskurs selv om avstanden fortsatt er stor. Sikt over en fast del av båten og se om den andre flytter seg i forhold til den.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 7', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Sikkerhetsutstyr og brann ──────────────────────────────────────────
	{
		id: 'si-001',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Bærbare brannslukkingsapparat (1–6 kg)',
		kategori: 'brann',
		vanskelighet: 2,
		sporsmal: 'Hvilket håndslukkingsapparat anbefaler Sjøfartsdirektoratet som et minimum i fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Minst ett 2 kg ABC-pulverapparat, lett tilgjengelig' },
			{ id: 'b', tekst: 'Et 1 kg CO2-apparat' },
			{ id: 'c', tekst: 'En bøtte med vann' },
			{ id: 'd', tekst: 'Et 6 kg skumapparat, uansett båtstørrelse' }
		],
		riktig: 'a',
		forklaring:
			'Sjøfartsdirektoratet anbefaler minst ett 2 kg ABC-pulverapparat, plassert lett tilgjengelig – ikke innerst i en bod. ABC dekker faste stoffer, væsker og gass. Større båter bør ha flere, og et brannteppe i tillegg er billig og effektivt på kokebranner.',
		kilde: { verk: 'Sjøfartsdirektoratet', hjemmel: 'Forebygging av båtbrann', lenke: SDIR_BRANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-002',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Drivanker',
		kategori: 'sikkerhetsutstyr',
		vanskelighet: 3,
		sporsmal: 'Hva brukes et drivanker til?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Å bremse avdriften og holde baugen mot sjøen når du ligger uten framdrift'
			},
			{ id: 'b', tekst: 'Å ankre på dypt vann der vanlig anker ikke når bunnen' },
			{ id: 'c', tekst: 'Å øke farten i medvind' },
			{ id: 'd', tekst: 'Å markere posisjonen din for redningstjenesten' }
		],
		riktig: 'a',
		forklaring:
			'Et drivanker er en duk eller pose som slepes i vannet. Den bremser avdriften og holder båten med baugen opp mot sjøen, slik at du ikke legger deg på tvers og tar bølgene inn på siden. Nyttig ved motorstopp i åpent farvann.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.a', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-003',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Ombordstigningsanordning',
		kategori: 'sikkerhetsutstyr',
		vanskelighet: 2,
		sporsmal: 'Hvorfor er en badestige eller annen ombordstigningsanordning viktig sikkerhetsutstyr?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi en person i vannet raskt mister kreftene og sjelden klarer å komme opp i båten selv'
			},
			{ id: 'b', tekst: 'Fordi det er påbudt i alle fritidsbåter over 5 meter' },
			{ id: 'c', tekst: 'Fordi den hindrer at båten driver' },
			{ id: 'd', tekst: 'Fordi den brukes til å fortøye i svaberg' }
		],
		riktig: 'a',
		forklaring:
			'Selv en sprek person i kaldt vann mister raskt kraft i armer og hender, og fribordet er høyere enn det ser ut fra vannflaten. Uten en stige som kan felles ned fra vannet, blir en enkel utforbordhendelse fort livstruende – særlig hvis du er alene om bord.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.a', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-004',
		emne: 1,
		pensumpunkt: '1.1.b',
		underpunkt: 'Propansystemer',
		kategori: 'brann',
		vanskelighet: 2,
		sporsmal: 'Hva er den største faren ved propananlegg i båt?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Propan er tyngre enn luft og samler seg i kjølsvinet, der det kan antennes'
			},
			{ id: 'b', tekst: 'Propan stiger og forsvinner ut gjennom luker' },
			{ id: 'c', tekst: 'Propan tærer på aluminiumsskrog' },
			{ id: 'd', tekst: 'Propan gjør kompasset unøyaktig' }
		],
		riktig: 'a',
		forklaring:
			'Både propan og butan er tyngre enn luft og synker ned i båtens laveste punkt. Der blir det liggende til en gnist antenner det. Steng flaskeventilen etter bruk, få anlegget montert av fagfolk, og vurder gassalarm lavt i båten.',
		kilde: { verk: 'Sjøfartsdirektoratet', hjemmel: 'Forebygging av båtbrann', lenke: SDIR_BRANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-005',
		emne: 1,
		pensumpunkt: '1.1.c',
		underpunkt: 'Rekkevidde, muligheter og begrensninger',
		kategori: 'nodsituasjoner',
		vanskelighet: 2,
		sporsmal: 'Hvorfor er VHF som regel bedre enn mobiltelefon i en nødsituasjon på sjøen?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi nødanropet høres av alle båter i nærheten samtidig, ikke bare av én mottaker'
			},
			{ id: 'b', tekst: 'Fordi VHF alltid har lengre rekkevidde enn mobil' },
			{ id: 'c', tekst: 'Fordi VHF virker under vann' },
			{ id: 'd', tekst: 'Fordi mobiltelefon er forbudt å bruke om bord' }
		],
		riktig: 'a',
		forklaring:
			'Et Mayday på kanal 16 høres av kystradioen og av alle fartøy innenfor rekkevidde. De nærmeste båtene er ofte framme lenge før redningsskøyta. En mobilsamtale når bare den ene du ringer. VHF med DSC sender i tillegg posisjonen din automatisk.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.c', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-006',
		emne: 1,
		pensumpunkt: '1.1.d',
		underpunkt: null,
		kategori: 'nodsituasjoner',
		vanskelighet: 2,
		sporsmal: 'Hva bør et Mayday-anrop inneholde?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Båtens navn, posisjon, hva som har skjedd, hvilken hjelp du trenger og hvor mange som er om bord'
			},
			{ id: 'b', tekst: 'Bare båtens navn og «Mayday»' },
			{ id: 'c', tekst: 'Bare posisjonen' },
			{ id: 'd', tekst: 'Navnet på nærmeste havn' }
		],
		riktig: 'a',
		forklaring:
			'Redningstjenesten trenger å vite hvem du er, hvor du er, hva som har skjedd, hva du trenger og hvor mange personer det gjelder. Antall personer om bord avgjør hvor mange de leter etter. Snakk rolig, og gjenta posisjonen.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.d', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},

	// ─── Førstehjelp ────────────────────────────────────────────────────────
	{
		id: 'fo-001',
		emne: 1,
		pensumpunkt: '1.1.m',
		underpunkt: 'HLR (hjerte-lungeredning)',
		kategori: 'forstehjelp',
		vanskelighet: 2,
		sporsmal:
			'En voksen person er livløs og puster ikke normalt. Hva er riktig forhold mellom brystkompresjoner og innblåsinger?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '30 kompresjoner og 2 innblåsinger' },
			{ id: 'b', tekst: '15 kompresjoner og 2 innblåsinger' },
			{ id: 'c', tekst: '5 kompresjoner og 1 innblåsing' },
			{ id: 'd', tekst: '10 kompresjoner og 5 innblåsinger' }
		],
		riktig: 'a',
		forklaring:
			'Standard hjerte-lungeredning på voksne er 30 brystkompresjoner etterfulgt av 2 innblåsinger, i takt på omtrent 100–120 kompresjoner i minuttet. Ring 113 eller kystradioen på 120 først, eller få noen andre til å gjøre det mens du starter.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.m', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'fo-002',
		emne: 1,
		pensumpunkt: '1.1.m',
		underpunkt: 'BLÅS (bevissthet, luftveier, åndedrett, sirkulasjon)',
		kategori: 'forstehjelp',
		vanskelighet: 2,
		sporsmal: 'Hva står BLÅS for i førstehjelp?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Bevissthet, luftveier, åndedrett, sirkulasjon' },
			{ id: 'b', tekst: 'Blødning, luftveier, årvåkenhet, smerte' },
			{ id: 'c', tekst: 'Bevissthet, livredning, årsak, sikkerhet' },
			{ id: 'd', tekst: 'Blødning, lungeredning, åndedrett, stabilt sideleie' }
		],
		riktig: 'a',
		forklaring:
			'BLÅS er rekkefølgen du undersøker en skadd person i: Bevissthet – reagerer han? Luftveier – er de frie? Åndedrett – puster han normalt? Sirkulasjon – er det store blødninger? Rekkefølgen sikrer at du tar det livstruende først.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.m', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},

	// ─── Vær, navigasjon og beregning ───────────────────────────────────────
	{
		id: 'na-006',
		emne: 3,
		pensumpunkt: '1.3.i',
		underpunkt: null,
		kategori: 'beregning',
		vanskelighet: 2,
		sporsmal: 'Du har gått 8 nautiske mil på 40 minutter. Hvilken fart har du holdt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '12 knop' },
			{ id: 'b', tekst: '8 knop' },
			{ id: 'c', tekst: '16 knop' },
			{ id: 'd', tekst: '20 knop' }
		],
		riktig: 'a',
		forklaring:
			'Fart = distanse delt på tid. 40 minutter er 40/60 = 0,667 time, og 8 / 0,667 = 12 knop. En rask kontroll: på en hel time ville du gått halvannen gang så langt som på 40 minutter, altså 12 nautiske mil.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.i', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-007',
		emne: 3,
		pensumpunkt: '1.3.b',
		underpunkt: null,
		kategori: 'kartsymboler',
		vanskelighet: 3,
		sporsmal: 'Hva er en nautisk mil?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: '1852 meter, som tilsvarer ett breddeminutt' },
			{ id: 'b', tekst: '1000 meter' },
			{ id: 'c', tekst: '1609 meter' },
			{ id: 'd', tekst: '2000 meter, som tilsvarer ett lengdeminutt' }
		],
		riktig: 'a',
		forklaring:
			'En nautisk mil er 1852 meter og tilsvarer ett breddeminutt, altså 1/60 breddegrad. Det er derfor du måler avstand på breddeskalaen langs sidene av sjøkartet. Én knop er én nautisk mil per time.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.b', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-008',
		emne: 3,
		pensumpunkt: '1.3.f',
		underpunkt: null,
		kategori: 'navigasjon',
		vanskelighet: 3,
		sporsmal: 'Hva er springflo?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Den største forskjellen mellom flo og fjære, ved ny- og fullmåne'
			},
			{ id: 'b', tekst: 'Den minste forskjellen mellom flo og fjære' },
			{ id: 'c', tekst: 'En plutselig bølge forårsaket av undersjøisk ras' },
			{ id: 'd', tekst: 'Strøm som går motsatt vei av vinden' }
		],
		riktig: 'a',
		forklaring:
			'Ved ny- og fullmåne står sol og måne på linje, og tiltrekningskreftene virker sammen. Da blir forskjellen mellom flo og fjære størst – springflo. Ved halvmåne motvirker de hverandre, og forskjellen blir minst – nippflo. Stor tidevannsforskjell gir sterkere strøm i sund.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.f', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-009',
		emne: 3,
		pensumpunkt: '1.3.c',
		underpunkt: null,
		kategori: 'navigasjon',
		vanskelighet: 2,
		sporsmal: 'Hvorfor bør du ikke plassere mobiltelefon eller høyttalere rett ved magnetkompasset?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Fordi magneter og elektronikk gir deviasjon, altså feilvisning på kompasset' },
			{ id: 'b', tekst: 'Fordi kompasset forstyrrer mobildekningen' },
			{ id: 'c', tekst: 'Fordi kompasset blir varmt' },
			{ id: 'd', tekst: 'Fordi det endrer misvisningen i området' }
		],
		riktig: 'a',
		forklaring:
			'Magnetkompasset retter seg etter magnetfelt. Høyttalermagneter, mobiler, verktøy og strømførende ledninger i nærheten trekker nåla ut av stilling – det er deviasjon. Misvisning, derimot, er en egenskap ved jordkloden og kan ikke påvirkes av det du har om bord.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.c', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'va-001',
		emne: 1,
		pensumpunkt: '1.1.n',
		underpunkt: 'Vær og vind',
		kategori: 'vaer',
		vanskelighet: 2,
		sporsmal: 'Hvorfor blir sjøen ofte spesielt bratt og ubehagelig når vind står mot strøm?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Strømmen bremser bølgene, så de blir kortere og brattere og bryter lettere'
			},
			{ id: 'b', tekst: 'Fordi vinden blir sterkere over strømmen' },
			{ id: 'c', tekst: 'Fordi vannet blir kaldere' },
			{ id: 'd', tekst: 'Fordi bølgene blir lengre og slakere' }
		],
		riktig: 'a',
		forklaring:
			'Når strømmen går mot vinden, presses bølgene sammen. Bølgelengden minker mens høyden øker, og resultatet er korte, bratte bølger som bryter. Dette skjer typisk i sund og fjordmunninger ved tidevannsstrøm, og kan gjøre et ellers rolig farvann farlig for små båter.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.n', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'va-002',
		emne: 1,
		pensumpunkt: '1.1.n',
		underpunkt: 'Siktforhold',
		kategori: 'vaer',
		vanskelighet: 2,
		sporsmal: 'Tåka kommer inn og sikten blir dårlig. Hva er riktig å gjøre?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Sette ned farten til sikker fart, gi tåkesignal, holde skjerpet utkikk og lytte'
			},
			{ id: 'b', tekst: 'Øke farten for å komme fortest mulig ut av tåka' },
			{ id: 'c', tekst: 'Slå av motoren og drive til tåka letter' },
			{ id: 'd', tekst: 'Stole på kartplotteren og holde vanlig fart' }
		],
		riktig: 'a',
		forklaring:
			'Under nedsatt sikt skal du gå med sikker fart, tilpasset forholdene, og være klar til å stoppe. Gi tåkesignal, slå på lanterner, sett noen på utkikk framme og lytt etter andre. Sikker fart betyr ofte langt saktere enn du tror er nødvendig.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 6 og regel 19', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Godt sjømannskap, miljø og ansvar ──────────────────────────────────
	{
		id: 'sj-009',
		emne: 1,
		pensumpunkt: '1.1.k',
		underpunkt: 'Utslipp, reservater, nasjonalparker, forsøpling',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hva gjelder for utslipp og søppel fra fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Forurensning ved utslipp eller dumping fra fritidsbåt er forbudt – alt avfall tas med i land'
			},
			{ id: 'b', tekst: 'Matavfall kan kastes på sjøen overalt' },
			{ id: 'c', tekst: 'Utslipp er tillatt lenger enn 300 meter fra land' },
			{ id: 'd', tekst: 'Det er bare olje som er forbudt å slippe ut' }
		],
		riktig: 'a',
		forklaring:
			'Småbåtloven forbyr forurensning av det ytre miljø ved utslipp eller dumping fra fritidsbåt. Ta med alt avfall i land, tøm septik i mottaksanlegg, og vær ekstra varsom i naturreservater og nasjonalparker der det ofte gjelder egne ferdselsregler.',
		kilde: { verk: 'Småbåtloven', hjemmel: '§ 38', lenke: SMABATLOVEN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-010',
		emne: 1,
		pensumpunkt: '1.1.e',
		underpunkt: null,
		kategori: 'sjomannskap',
		vanskelighet: 3,
		sporsmal: 'Du skal ta en havarist på slep. Hva er viktigst?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Bruke et langt, elastisk tau, øke farten forsiktig og holde alle klar av slepet'
			},
			{ id: 'b', tekst: 'Bruke kortest mulig tau så båten følger tett etter' },
			{ id: 'c', tekst: 'Feste slepet i rekka og kjøre normal marsjfart' },
			{ id: 'd', tekst: 'Feste i motorens løftebøyle for best styring' }
		],
		riktig: 'a',
		forklaring:
			'Et langt tau med noe strekk demper rykkene, og slakk i tauet gjør at det ikke blir stående under konstant last. Fest i noe som tåler belastningen, øk farten gradvis, og hold folk unna – ryker et stramt tau, slår det tilbake med stor kraft.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.e', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-011',
		emne: 1,
		pensumpunkt: '1.1.g',
		underpunkt: null,
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hvorfor skal tung last plasseres lavt og midt i båten?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi lavt tyngdepunkt gir bedre stabilitet og mindre risiko for kantring'
			},
			{ id: 'b', tekst: 'Fordi det gir bedre fart' },
			{ id: 'c', tekst: 'Fordi det sparer drivstoff' },
			{ id: 'd', tekst: 'Fordi det beskytter lasten mot sjøsprøyt' }
		],
		riktig: 'a',
		forklaring:
			'Jo lavere tyngdepunktet ligger, desto mer motstår båten krengning og desto lettere retter den seg opp igjen. Tung last høyt oppe – eller personer som alle står på samme side – hever tyngdepunktet og kan i verste fall velte en liten båt.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.g', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-012',
		emne: 1,
		pensumpunkt: '1.1.o',
		underpunkt: null,
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Du skal dra vannski eller ringer etter båten. Hva er viktigst for sikkerheten?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Ha en egen observatør om bord som følger med på den som blir slept'
			},
			{ id: 'b', tekst: 'Holde høyest mulig fart så tauet holder seg stramt' },
			{ id: 'c', tekst: 'Kjøre nær land så det er kort vei inn' },
			{ id: 'd', tekst: 'La den som blir slept droppe flyteutstyr for bevegelsesfrihet' }
		],
		riktig: 'a',
		forklaring:
			'Føreren må se framover, og kan ikke samtidig følge med på den som slepes. En observatør holder øye med personen bak og varsler føreren straks noen faller. Den som slepes skal ha flyteutstyr, og motoren settes i fri før du nærmer deg noen i vannet.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.o', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-013',
		emne: 1,
		pensumpunkt: '1.1.l',
		underpunkt: null,
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal: 'Hvem har ansvaret for at det er nok flyteutstyr om bord og at båten er sjødyktig?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Føreren av båten, sammen med eieren' },
			{ id: 'b', tekst: 'Bare eieren, uansett hvem som kjører' },
			{ id: 'c', tekst: 'Hver enkelt passasjer for sin egen del' },
			{ id: 'd', tekst: 'Forsikringsselskapet' }
		],
		riktig: 'a',
		forklaring:
			'Eier og fører er ansvarlige for at påbudt utstyr finnes om bord, er i orden og er lett tilgjengelig. Låner du bort båten, blir du ikke fri for ansvar – og låner du en båt, må du selv sjekke at utstyret er på plass før du drar.',
		kilde: { verk: 'Småbåtloven', hjemmel: '§ 23 og § 24', lenke: SMABATLOVEN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-014',
		emne: 1,
		pensumpunkt: '1.1.p',
		underpunkt: 'Forsinkelse ved bruk av elektronisk utstyr',
		kategori: 'sjomannskap',
		vanskelighet: 3,
		sporsmal: 'Hvorfor er kartplotteren spesielt upålitelig når du kjører fort?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi posisjonen vises med en liten forsinkelse, og i høy fart har du allerede flyttet deg langt'
			},
			{ id: 'b', tekst: 'Fordi GPS-signalet forsvinner over 20 knop' },
			{ id: 'c', tekst: 'Fordi skjermen slår seg av ved vibrasjon' },
			{ id: 'd', tekst: 'Fordi kartdatumet endrer seg med farten' }
		],
		riktig: 'a',
		forklaring:
			'Plotteren viser hvor du var for et lite øyeblikk siden. I 30 knop gjør du omtrent 15 meter i sekundet, så selv et halvt sekunds forsinkelse er meter du ikke har. Kombinert med tunnelsyn er dette en hovedårsak til grunnstøtinger i høy fart. Se ut, ikke ned.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.p', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-015',
		emne: 1,
		pensumpunkt: '1.1.j',
		underpunkt: null,
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hvor lang ankerline bør du som tommelfingerregel legge ut?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Minst tre til fem ganger dybden, mer i dårlig vær'
			},
			{ id: 'b', tekst: 'Nøyaktig like mye som dybden' },
			{ id: 'c', tekst: 'Halvparten av dybden' },
			{ id: 'd', tekst: 'Det spiller ingen rolle så lenge ankeret er tungt' }
		],
		riktig: 'a',
		forklaring:
			'Ankeret holder ved at linen drar mest mulig vannrett langs bunnen, slik at fliken graver seg ned. Med for kort line drar du ankeret oppover og det slipper taket. Tre til fem ganger dybden er et vanlig utgangspunkt, og husk å regne med flo sjø.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.j', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-005',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'CE-merking, produsentskilt, CIN-kode og brukerhåndbok',
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal: 'Hva er CIN-koden på en fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Skrognummeret – båtens unike identifikasjonsnummer' },
			{ id: 'b', tekst: 'Koden for båtens CE-kategori' },
			{ id: 'c', tekst: 'Motorens serienummer' },
			{ id: 'd', tekst: 'Forsikringsnummeret' }
		],
		riktig: 'a',
		forklaring:
			'CIN (Craft Identification Number) er båtens skrognummer, preget inn i skroget. Det identifiserer produsent, modell og byggeår, og brukes blant annet ved omsetning, forsikring og etterlysning av stjålne båter.',
		kilde: {
			verk: 'Forskrift om produksjon og omsetning av fritidsfartøy',
			hjemmel: 'CIN-kode',
			lenke: SDIR_BEVIS
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-006',
		emne: 4,
		pensumpunkt: '1.4.5',
		underpunkt: 'Promillegrense for fritidsbåt opp til 15 meter',
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal:
			'Hvorfor er alkohol spesielt farlig i båt, sammenlignet med samme mengde på land?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Sol, vind, sjøgang og dehydrering forsterker virkningen, og kaldt vann gjør en fylla-ulykke fort livstruende'
			},
			{ id: 'b', tekst: 'Alkohol tas raskere opp i blodet på sjøen' },
			{ id: 'c', tekst: 'Promillen måles strengere på sjøen' },
			{ id: 'd', tekst: 'Alkohol påvirker kompasset' }
		],
		riktig: 'a',
		forklaring:
			'Sol, vind, bevegelse og dehydrering gir det som ofte kalles sjøfyll – du blir mer påvirket enn du tror. Samtidig er marginene mindre: faller du i kaldt vann, svekker alkohol både svømmeevnen og kroppens evne til å holde på varmen.',
		kilde: { verk: 'Småbåtloven', hjemmel: '§ 33', lenke: SMABATLOVEN },
		kontrollert: '2026-09-07'
	},
	// ─── Sjømerker: faste merker og fyrsektorer ─────────────────────────────
	{
		id: 'sm-009',
		emne: 4,
		pensumpunkt: '1.4.1',
		underpunkt: 'Stake eller båke med peker',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Du ser en stake med en peker (viser) på toppen. Hva forteller pekeren deg?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Pekeren peker mot trygt farvann – gå på den siden pekeren viser' },
			{ id: 'b', tekst: 'Pekeren peker mot grunnen, så du skal gå motsatt vei' },
			{ id: 'c', tekst: 'Pekeren viser retningen til nærmeste havn' },
			{ id: 'd', tekst: 'Pekeren viser hvilken vei strømmen går' }
		],
		riktig: 'a',
		forklaring:
			'Faste merker som staker og båker markerer småskjær og grunner, og viseren peker mot sikkert farvann. Husk at merket står på eller ved selve faren, så hold god klaring selv om du går på riktig side.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Faste merker med peker', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'ka-004',
		emne: 4,
		pensumpunkt: '1.4.2',
		underpunkt: 'Sektor og karakterer på fyrlykter',
		kategori: 'kartsymboler',
		vanskelighet: 2,
		sporsmal: 'Du ser den hvite sektoren fra en fyrlykt. Hva betyr det?',
		illustrasjon: {
			navn: 'kartsymbol',
			props: { symbol: 'fyrsektor', tittel: 'Fyrlykt med sektorer' }
		},
		alternativer: [
			{
				id: 'a',
				tekst: 'At du er i farbart farvann – men hvit sektor er ingen garanti hele veien, så følg med i kartet'
			},
			{ id: 'b', tekst: 'At du er i urent farvann og må snu' },
			{ id: 'c', tekst: 'At du nærmer deg havn' },
			{ id: 'd', tekst: 'At lykten er ute av drift' }
		],
		riktig: 'a',
		forklaring:
			'Hvit sektor viser farbart farvann for de fartøyene som er forventet å trafikkere leia. Røde og grønne sektorer markerer urent farvann. Men Kystverket presiserer at det kan forekomme grunner i hvit sektor, og at sektoren ikke nødvendigvis er farbar i hele sin lengde – lykten erstatter ikke kartet.',
		kilde: {
			verk: 'Kystverket',
			hjemmel: 'Fyrlykter og sektorer',
			lenke: 'https://www.kystverket.no/sjovegen/fyr-lykter-og-sjomerker/fyrlykter/'
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'ka-005',
		emne: 4,
		pensumpunkt: '1.4.2',
		underpunkt: 'Sektor og karakterer på fyrlykter',
		kategori: 'kartsymboler',
		vanskelighet: 3,
		sporsmal: 'I kartet står det «Fl(3) 10s» ved en lykt. Hva betyr det?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Tre blink i gruppe, og hele mønsteret gjentar seg hvert tiende sekund' },
			{ id: 'b', tekst: 'Tre blink i sekundet, i ti sekunder' },
			{ id: 'c', tekst: 'Lykten lyser fast i ti sekunder mellom hvert blink' },
			{ id: 'd', tekst: 'Lykten står ti meter over havet og har tre sektorer' }
		],
		riktig: 'a',
		forklaring:
			'Fyrkarakteren beskriver blinkmønsteret. Fl er blink (flash), tallet i parentes er antall blink i gruppen, og sekundtallet er perioden – tiden før mønsteret gjentar seg. Ta tiden med klokke når du skal identifisere en lykt; det er mønsteret, ikke lysstyrken, som skiller lyktene fra hverandre.',
		kilde: { verk: 'Kystverket', hjemmel: 'Norsk fyrliste – fyrkarakterer', lenke: 'https://www.kystverket.no/sjovegen/fyr-lykter-og-sjomerker/fyrlykter/' },
		kontrollert: '2026-09-07'
	},

	// ─── Lanterner og flagg, forts. ─────────────────────────────────────────
	{
		id: 'la-009',
		emne: 4,
		pensumpunkt: '1.4.4',
		underpunkt: 'Signalflagg A – jeg har dykker nede',
		kategori: 'lanterner',
		vanskelighet: 1,
		sporsmal: 'Hvilken farge har signalflagget A?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Hvitt nærmest stangen og blått ytterst, med kløftet ytterkant' },
			{ id: 'b', tekst: 'Helt rødt' },
			{ id: 'c', tekst: 'Gult med svart kryss' },
			{ id: 'd', tekst: 'Blått med hvit firkant i midten' }
		],
		riktig: 'a',
		forklaring:
			'Flagg A er delt loddrett: hvitt mot stangen, blått ytterst, og ytterkanten er kløftet som en svalehale. Det betyr «jeg har dykker nede – hold godt klar og gå med liten fart». Lær deg formen, for den er lett å kjenne igjen på avstand.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 42', lenke: NORSKE_FARVANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-010',
		emne: 2,
		pensumpunkt: '1.2.b',
		underpunkt: 'Lanterner på stor og liten motorbåt',
		kategori: 'lanterner',
		vanskelighet: 2,
		sporsmal: 'Hvilke lanterner skal en motorbåt under 12 meter føre om natten?',
		illustrasjon: {
			navn: 'lanterne',
			props: { fartoy: 'motorbat', sett: 'forfra', tittel: 'Motorbåt sett forfra' }
		},
		alternativer: [
			{
				id: 'a',
				tekst: 'Sidelanterner, akterlanterne og topplanterne – eventuelt en rundtlysende hvit lanterne i stedet for topp- og akterlanterne'
			},
			{ id: 'b', tekst: 'Bare en rundtlysende hvit lanterne' },
			{ id: 'c', tekst: 'Bare sidelanterner' },
			{ id: 'd', tekst: 'To hvite topplanterner over hverandre' }
		],
		riktig: 'a',
		forklaring:
			'Et maskindrevet fartøy under 12 meter kan føre en rundtlysende hvit lanterne i stedet for topplanterne og akterlanterne, men sidelanternene må uansett være på plass. Uten sidelys kan andre ikke se hvilken vei du går.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 23', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'la-011',
		emne: 2,
		pensumpunkt: '1.2.b',
		underpunkt: 'Lanterne og dagsignal for sleping',
		kategori: 'lanterner',
		vanskelighet: 3,
		sporsmal: 'Du ser et fartøy med to hvite topplanterner over hverandre og en gul lanterne over akterlanternen. Hva driver det med?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Det sleper – den gule slepelanternen lyser akterover over akterlanternen' },
			{ id: 'b', tekst: 'Det ligger til ankers' },
			{ id: 'c', tekst: 'Det er manøvreringsudyktig' },
			{ id: 'd', tekst: 'Det driver med fiske' }
		],
		riktig: 'a',
		forklaring:
			'Et fartøy som sleper fører to topplanterner i loddrett rekke, og en gul slepelanterne over akterlanternen. Er slepet over 200 meter, blir det tre topplanterner. Hold godt unna – slepewiren ligger ofte like under overflaten mellom fartøyene.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 24', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Sikkerhetsutstyr, forts. ───────────────────────────────────────────
	{
		id: 'si-007',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Flyteutstyr',
		kategori: 'sikkerhetsutstyr',
		vanskelighet: 2,
		sporsmal: 'Hva er forskjellen på en redningsvest og en flytevest?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'En redningsvest snur en bevisstløs person med ansiktet opp; en flytevest holder deg flytende, men krever at du er ved bevissthet'
			},
			{ id: 'b', tekst: 'Ingen forskjell – det er to ord for det samme' },
			{ id: 'c', tekst: 'Flytevesten har høyere oppdrift enn redningsvesten' },
			{ id: 'd', tekst: 'Redningsvesten er bare for barn' }
		],
		riktig: 'a',
		forklaring:
			'Redningsvest har krage og nok oppdrift til å vende en bevisstløs person på rygg med ansiktet over vann. Flytevest gir oppdrift, men snur deg ikke. På åpent farvann og i dårlig vær er redningsvest det trygge valget.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.a', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-008',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Nødraketter, bluss og annen nødsignalisering',
		kategori: 'nodsituasjoner',
		vanskelighet: 2,
		sporsmal: 'Når bør du avfyre et rødt fallskjermlys?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Når du vet eller har grunn til å tro at noen kan se det – ikke fyr av alle med en gang'
			},
			{ id: 'b', tekst: 'Med en gang du får problemer, uansett om noen er i nærheten' },
			{ id: 'c', tekst: 'Bare på dagtid' },
			{ id: 'd', tekst: 'Alle samtidig, for å bli lettere å se' }
		],
		riktig: 'a',
		forklaring:
			'Pyroteknikk er en begrenset ressurs. Spar signalene til du ser eller hører et fartøy eller fly, eller vet at det leter etter deg. Rødt fallskjermlys sees lengst, håndbluss brukes når redningsenheten er nær og skal finne deg nøyaktig. Sjekk utløpsdatoen før sesongen.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.a', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-009',
		emne: 1,
		pensumpunkt: '1.1.c',
		underpunkt: 'VHF kanal 16 og DSC',
		kategori: 'nodsituasjoner',
		vanskelighet: 2,
		sporsmal: 'Hva gjør DSC-knappen på en VHF?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Sender en digital nødalarm med båtens identitet, og posisjon hvis GPS er koblet til'
			},
			{ id: 'b', tekst: 'Skrur opp volumet på kanal 16' },
			{ id: 'c', tekst: 'Ringer 113 over mobilnettet' },
			{ id: 'd', tekst: 'Slår av alle andre kanaler' }
		],
		riktig: 'a',
		forklaring:
			'DSC (Digital Selective Calling) sender et digitalt nødanrop på kanal 70 med MMSI-nummeret ditt, og posisjon dersom radioen har GPS. Kystradioen og andre fartøy varsles automatisk. Følg alltid opp med et vanlig taleanrop på kanal 16.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.c', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},

	// ─── Fart, holdninger og førstehjelp ────────────────────────────────────
	{
		id: 'sj-016',
		emne: 1,
		pensumpunkt: '1.1.p',
		underpunkt: 'Forsvarlig avstand til land',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hvorfor bør du holde god avstand til land når du kjører fort?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi marginene blir minimale: skjær, badende og småbåter dukker opp uten forvarsel, og bølgene dine treffer land og fortøyde båter'
			},
			{ id: 'b', tekst: 'Fordi kompasset påvirkes nær land' },
			{ id: 'c', tekst: 'Fordi det er forbudt å kjøre nærmere enn 500 meter fra land' },
			{ id: 'd', tekst: 'Fordi motoren går varmere nær land' }
		],
		riktig: 'a',
		forklaring:
			'Nær land er det grunt, trangt og full av folk. I høy fart rekker du verken å se eller reagere, og hekkbølgen din kan velte småbåter og skade fortøyde båter. Du er ansvarlig for skade bølgene dine forårsaker.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.p', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-017',
		emne: 1,
		pensumpunkt: '1.1.q',
		underpunkt: 'Egen adferds betydning for andres sikkerhet og trivsel',
		kategori: 'sjomannskap',
		vanskelighet: 1,
		sporsmal: 'Du passerer en robåt og en kajakk i en trang vik. Hva er godt sjømannskap?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Sette ned farten i god tid, slik at hekkbølgen blir minst mulig, og gi god klaring'
			},
			{ id: 'b', tekst: 'Holde farten, men styre rett forbi' },
			{ id: 'c', tekst: 'Øke farten for å komme raskt forbi' },
			{ id: 'd', tekst: 'Gi lydsignal og holde kursen' }
		],
		riktig: 'a',
		forklaring:
			'Små, lave fartøyer kantrer lett i bølger og har ingen motor å komme seg unna med. Å senke farten i god tid – ikke først når du er på siden av dem – gjør at bølgen legger seg før du passerer. Din egen oppførsel avgjør andres sikkerhet og trivsel på sjøen.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.q', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'fo-003',
		emne: 1,
		pensumpunkt: '1.1.m',
		underpunkt: 'Behandling av indre og ytre blødninger',
		kategori: 'forstehjelp',
		vanskelighet: 2,
		sporsmal: 'Noen om bord har fått et dypt kutt som blør kraftig. Hva gjør du først?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Legger direkte trykk på såret og holder trykket, og hever om mulig skadestedet' },
			{ id: 'b', tekst: 'Skyller såret grundig i sjøvann først' },
			{ id: 'c', tekst: 'Legger på en løs kompress og venter på hjelp' },
			{ id: 'd', tekst: 'Setter på strikk ovenfor såret med en gang' }
		],
		riktig: 'a',
		forklaring:
			'Kraftig ytre blødning stanses med direkte, vedvarende trykk på såret. Slipp ikke opp for å kikke. Hev skadestedet hvis det er mulig, og hold pasienten varm. Varsle på kanal 16 eller 120 – blodtap gir raskt sjokk, og i båt er du langt fra hjelp.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.m', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-007',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Forskrift om begrenset fart ved passering av badende',
		kategori: 'lover',
		vanskelighet: 2,
		sporsmal: 'Hva gjelder ved oppmerkede badeområder?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Det er forbudt å ferdes og ankre innenfor blåsene, og du må ned i 5 knop nærmere enn 50 meter fra badende'
			},
			{ id: 'b', tekst: 'Du kan passere gjennom området i inntil 5 knop' },
			{ id: 'c', tekst: 'Reglene gjelder bare i juli' },
			{ id: 'd', tekst: 'Det er ingen egne regler for badeområder' }
		],
		riktig: 'a',
		forklaring:
			'Motor- og seilfartøy har forbud mot ferdsel og ankring innenfor blåsene som markerer et offentlig badeområde. I tillegg gjelder den generelle regelen om høyst 5 knop nærmere enn 50 meter fra steder der bading pågår. Folk i vannet er nesten usynlige fra en båt.',
		kilde: { verk: 'Forskrift om fartsgrenser på sjøen', hjemmel: '§ 3', lenke: FARTSGRENSER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-011',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: 'Trafikkseparasjonssystem',
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal: 'Du må krysse et trafikkseparasjonssystem med fritidsbåt. Hvordan gjør du det?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Så nær rett vinkel på trafikkretningen som mulig, og uten å hindre fartøy som følger systemet'
			},
			{ id: 'b', tekst: 'På skrå, slik at du bruker kortest mulig tid i feltet' },
			{ id: 'c', tekst: 'Ved å følge trafikkretningen til du er over' },
			{ id: 'd', tekst: 'Fritidsbåter kan ikke krysse i det hele tatt' }
		],
		riktig: 'a',
		forklaring:
			'Kryssing skal skje så nær rett vinkel på trafikkretningen som praktisk mulig, slik at du er kortest mulig i feltet og er lett å tolke for de store. Fartøy under 20 meter og seilfartøy skal ikke hindre maskindrevne fartøy som følger trafikkfeltet.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 10', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},

	// ─── Emne 3: seilasregler ved sjømerker (pensumpunkt 1.3.a) ─────────────
	{
		id: 'na-010',
		emne: 3,
		pensumpunkt: '1.3.a',
		underpunkt: 'Kardinalmerker',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Hva er hovedforskjellen på et kardinalmerke og et lateralmerke?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Kardinalmerket viser i hvilken himmelretning du finner trygt vann; lateralmerket viser hvilken side av leia du skal holde deg på'
			},
			{ id: 'b', tekst: 'Kardinalmerker står bare i innseilinger, lateralmerker bare på åpent hav' },
			{ id: 'c', tekst: 'Kardinalmerker er alltid lysende, lateralmerker aldri' },
			{ id: 'd', tekst: 'Det er ingen praktisk forskjell' }
		],
		riktig: 'a',
		forklaring:
			'Kardinalmerker er absolutte: gult og svart forteller at trygt vann ligger nord, øst, sør eller vest for merket, uansett hvilken vei du kommer fra. Lateralmerker er relative: rødt og grønt gir bare mening når du vet hvilken vei merkingens hovedretning går.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'IALA A-systemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-011',
		emne: 3,
		pensumpunkt: '1.3.a',
		underpunkt: 'Lateralmerker',
		kategori: 'sjomerker',
		vanskelighet: 3,
		sporsmal: 'Du går ut leia, altså motsatt vei av merkingens hovedretning. Hvordan skal du forholde deg til lateralmerkene?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Omvendt: nå skal de røde merkene ligge på styrbord side og de grønne på babord'
			},
			{ id: 'b', tekst: 'Likt som innover – rødt på babord' },
			{ id: 'c', tekst: 'Lateralmerker gjelder bare innover leia og kan ignoreres på vei ut' },
			{ id: 'd', tekst: 'Du skal alltid holde deg midt mellom merkene' }
		],
		riktig: 'a',
		forklaring:
			'Lateralmerkene er definert ut fra merkingens hovedretning, som langs norskekysten i hovedsak går nordover og innover fjordene. Går du motsatt vei, snur alt: rødt skal da ligge på styrbord. Derfor må du alltid vite hvilken vei hovedretningen går i det området du er.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Lateralsystemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-012',
		emne: 3,
		pensumpunkt: '1.3.a',
		underpunkt: 'Frittliggende fare',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Hva skiller et merke for frittliggende fare fra et senterleiemerke?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Frittliggende fare står på selve faren og skal gis klaring; senterleiemerket står i trygt vann og kan passeres på begge sider'
			},
			{ id: 'b', tekst: 'De betyr det samme, men brukes i ulike deler av landet' },
			{ id: 'c', tekst: 'Senterleiemerket markerer en grunne' },
			{ id: 'd', tekst: 'Frittliggende fare kan bare passeres på nordsiden' }
		],
		riktig: 'a',
		forklaring:
			'Begge har rødt i seg, og det er lett å blande dem. Frittliggende fare er svart med rødt bånd og to svarte kuler, og står på eller like ved faren – hold klaring. Senterleiemerket har røde og hvite loddrette striper og én rød kule, og markerer trygt farvann, typisk midt i en innseiling.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'IALA A-systemet', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-013',
		emne: 3,
		pensumpunkt: '1.3.a',
		underpunkt: 'Spesialmerker',
		kategori: 'sjomerker',
		vanskelighet: 2,
		sporsmal: 'Hvorfor er et gult spesialmerke ikke et navigasjonsmerke i vanlig forstand?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi det markerer et område med særskilt betydning, ikke hvor det er trygt å seile'
			},
			{ id: 'b', tekst: 'Fordi det bare står i ferskvann' },
			{ id: 'c', tekst: 'Fordi det alltid kan ignoreres' },
			{ id: 'd', tekst: 'Fordi det bare gjelder for yrkesfartøy' }
		],
		riktig: 'a',
		forklaring:
			'Gult merke med gult kryss markerer kabler, rørledninger, oppdrett, badeområder, skytefelt og lignende. Det sier ingenting om dybde eller hvilken side du skal passere – men det kan følge restriksjoner med området, for eksempel ankringsforbud over kabel.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Spesialmerke', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-014',
		emne: 3,
		pensumpunkt: '1.3.a',
		underpunkt: 'Senterleiemerke',
		kategori: 'sjomerker',
		vanskelighet: 3,
		sporsmal: 'Du ser et senterleiemerke rett forut på vei inn mot en havn. Hva gjør du?',
		illustrasjon: {
			navn: 'sjomerke',
			props: { merke: 'senterleie', tittel: 'Senterleiemerke' }
		},
		alternativer: [
			{
				id: 'a',
				tekst: 'Passerer på den siden som passer kursen din – det er trygt farvann rundt merket'
			},
			{ id: 'b', tekst: 'Holder merket på babord side' },
			{ id: 'c', tekst: 'Snur, fordi merket varsler om en fare' },
			{ id: 'd', tekst: 'Passerer nord for merket' }
		],
		riktig: 'a',
		forklaring:
			'Senterleiemerket, også kalt midtfarvannsmerke, står der det er trygt vann rundt – ofte i innseilingen eller ved starten av en led. Det kan passeres på begge sider. I praksis holder de fleste styrbord om merket, slik at møtende trafikk får plass.',
		kilde: { verk: 'IALA A / Kystverket', hjemmel: 'Senterleiemerke', lenke: KYSTVERKET_MERKER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-012',
		emne: 4,
		pensumpunkt: '1.4.3',
		underpunkt: 'Sjøveisregel 43 og 44',
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal: 'Hva krever regel 43 av små fartøy som nærmer seg annen trafikk?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Å manøvrere med forsiktighet, gå med redusert fart, om nødvendig stoppe, og holde godt av veien'
			},
			{ id: 'b', tekst: 'Å gi tre korte støt og holde kursen' },
			{ id: 'c', tekst: 'Å øke farten for å komme klar' },
			{ id: 'd', tekst: 'Ingenting – regel 43 gjelder bare fartøy over 20 meter' }
		],
		riktig: 'a',
		forklaring:
			'Regel 43 pålegger små fartøy – robåter, småbåter og seilbåter som bare fører hvite lys – å opptre forsiktig, sette ned farten, om nødvendig stoppe, og holde godt av veien. Regel 44 er den beslektede: lystfartøy og åpne båter skal mest mulig holde av veien for større fartøy, ferger og nyttetrafikk.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 43 og 44', lenke: NORSKE_FARVANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-013',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: 'Vikeplikt mellom motorbåter',
		kategori: 'vikeplikt',
		vanskelighet: 2,
		sporsmal: 'To maskindrevne fartøy møtes. Hvilken av disse situasjonene gir IKKE gjensidig plikt til å dreie til styrbord?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Når det ene fartøyet innhenter det andre bakfra' },
			{ id: 'b', tekst: 'Når de møtes tilnærmet rett forut på motsatte kurser' },
			{ id: 'c', tekst: 'Når de møtes rødt lys mot rødt lys' },
			{ id: 'd', tekst: 'Når de går rett mot hverandre i en trang led' }
		],
		riktig: 'a',
		forklaring:
			'Ved møtende kurser skal begge dreie til styrbord. Ved innhenting gjelder en annen regel: den innhentende skal holde av veien, og den innhentede skal holde kurs og fart. Innhentingsregelen går foran de andre vikepliktsreglene.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 13 og regel 14', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'vi-014',
		emne: 2,
		pensumpunkt: '1.2.a',
		underpunkt: 'Vikeplikt mellom motorbåt og seilbåt',
		kategori: 'vikeplikt',
		vanskelighet: 3,
		sporsmal: 'I hvilket tilfelle skal en seilbåt holde av veien for en motorbåt?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Når seilbåten innhenter motorbåten, eller når motorbåten er begrenset av sin dypgående i en trang lei'
			},
			{ id: 'b', tekst: 'Aldri – seilbåt har alltid forkjørsrett' },
			{ id: 'c', tekst: 'Bare når seilbåten er over 12 meter' },
			{ id: 'd', tekst: 'Bare om natten' }
		],
		riktig: 'a',
		forklaring:
			'Hovedregelen er at maskindrevet fartøy viker for seilfartøy, men den har unntak. Innhentingsregelen går foran, så en seilbåt som tar igjen en motorbåt skal vike. I tillegg skal fartøy under 20 meter og seilfartøy ikke hindre fartøy som bare kan navigere trygt innenfor en trang lei.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 9, 13 og 18', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-015',
		emne: 3,
		pensumpunkt: '1.3.e',
		underpunkt: 'GPS',
		kategori: 'navigasjon',
		vanskelighet: 2,
		sporsmal: 'Hva forteller GPS-en deg egentlig?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Hvor du er – ikke om det er trygt der. Dybder og farer må du lese i kartet'
			},
			{ id: 'b', tekst: 'Både posisjon og om det er dypt nok der du er' },
			{ id: 'c', tekst: 'Hvilken kurs du har vikeplikt for' },
			{ id: 'd', tekst: 'Nøyaktig posisjon også når antennen er dekket til' }
		],
		riktig: 'a',
		forklaring:
			'GPS gir posisjon, fart over grunn og kurs over grunn. Den vet ingenting om skjær, strøm eller trafikk. Posisjonen er dessuten bare like nyttig som kartet den vises i – er kartdatumet eller sjømålingene gamle, kan en riktig posisjon likevel se feil ut i kartet.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.e', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-016',
		emne: 3,
		pensumpunkt: '1.3.e',
		underpunkt: 'Elektroniske kart',
		kategori: 'navigasjon',
		vanskelighet: 3,
		sporsmal: 'Hva er en typisk fallgruve ved elektroniske kart på plotter?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'At du zoomer så langt inn eller ut at viktige detaljer ikke vises, og at kartdataene kan være utdaterte'
			},
			{ id: 'b', tekst: 'At de aldri viser dybder' },
			{ id: 'c', tekst: 'At de bare virker med mobildekning' },
			{ id: 'd', tekst: 'At de ikke kan vise egen posisjon' }
		],
		riktig: 'a',
		forklaring:
			'Zoomnivået avgjør hva som tegnes opp: zoomer du for langt ut, forsvinner staker og grunner fra skjermen selv om de er der. Kartdata må også oppdateres – nye grunner og flyttede merker kommer ikke av seg selv. Sjekk alltid mot papirkart eller offisielle kartdata når du planlegger en tur i ukjent farvann.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.e', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},

	// ─── Siste dekning: utstyr, fart, holdninger og lovverk ─────────────────
	{
		id: 'si-010',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Lydsignalapparat',
		kategori: 'sikkerhetsutstyr',
		vanskelighet: 2,
		sporsmal: 'Hvorfor bør du ha et lydsignalapparat om bord, selv i en liten båt?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'For å kunne gi manøver- og varselsignal, og for å gjøre deg hørt i tåke eller når noen ikke ser deg'
			},
			{ id: 'b', tekst: 'Fordi det erstatter lanternene om natten' },
			{ id: 'c', tekst: 'Fordi det kreves for å få båtførerbevis' },
			{ id: 'd', tekst: 'For å skremme bort fugl fra båten' }
		],
		riktig: 'a',
		forklaring:
			'Sjøveisreglene bygger på at fartøy kan gi lydsignaler – både manøversignaler, tåkesignaler og ikke minst tvilsignalet på fem korte støt. En billig tåkelur eller signalhorn er ofte det eneste som når fram når en større båt ikke har sett deg.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.a', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-011',
		emne: 1,
		pensumpunkt: '1.1.a',
		underpunkt: 'Fastmonterte slukkeanlegg (motorrom)',
		kategori: 'brann',
		vanskelighet: 3,
		sporsmal: 'Det begynner å brenne i motorrommet, og båten har fastmontert slukkeanlegg. Hva er viktigst?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Å stoppe motoren og la luken være lukket, slik at slukkemiddelet får virke uten at ny luft slipper inn'
			},
			{ id: 'b', tekst: 'Å åpne luken straks for å se hvor det brenner' },
			{ id: 'c', tekst: 'Å øke turtallet så vifta blåser ut røyken' },
			{ id: 'd', tekst: 'Å helle sjøvann ned i motorrommet' }
		],
		riktig: 'a',
		forklaring:
			'Et fastmontert anlegg fyller motorrommet med slukkemiddel og kveler brannen. Åpner du luken, slipper du inn oksygen og brannen blusser opp igjen – og du risikerer en stikkflamme i ansiktet. Stopp motoren, hold luken lukket, og vær klar til å forlate båten.',
		kilde: { verk: 'Sjøfartsdirektoratet', hjemmel: 'Forebygging av båtbrann', lenke: SDIR_BRANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-012',
		emne: 1,
		pensumpunkt: '1.1.b',
		underpunkt: 'Betydning av oksygen',
		kategori: 'brann',
		vanskelighet: 2,
		sporsmal: 'Hva er de tre tingene en brann trenger for å brenne?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Brennbart materiale, oksygen og varme' },
			{ id: 'b', tekst: 'Bensin, gnist og vind' },
			{ id: 'c', tekst: 'Varme, røyk og trykk' },
			{ id: 'd', tekst: 'Oksygen, vann og elektrisitet' }
		],
		riktig: 'a',
		forklaring:
			'Branntrekanten er brennbart materiale, oksygen og varme. Fjerner du én av dem, slokner brannen. Derfor virker et brannteppe – det stenger ute oksygenet – og derfor skal du ikke åpne en luke inn til en brann og slippe inn ny luft.',
		kilde: { verk: 'Sjøfartsdirektoratet', hjemmel: 'Forebygging av båtbrann', lenke: SDIR_BRANN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'si-013',
		emne: 1,
		pensumpunkt: '1.1.c',
		underpunkt: 'Kystradiostasjonenes telefonnummer: 120',
		kategori: 'nodsituasjoner',
		vanskelighet: 2,
		sporsmal: 'Du har ikke VHF om bord, men mobildekning. Hvem ringer du ved fare på sjøen?',
		illustrasjon: null,
		alternativer: [
			{ id: 'a', tekst: 'Kystradioen på 120, som koordinerer sjøredningen' },
			{ id: 'b', tekst: '110, som er brann' },
			{ id: 'c', tekst: 'Nærmeste havnekontor' },
			{ id: 'd', tekst: 'Forsikringsselskapet' }
		],
		riktig: 'a',
		forklaring:
			'120 går til kystradioen, som har direkte linje til hovedredningssentralene og kan varsle redningsskøyte, helikopter og fartøy i nærheten. 113 fungerer også, men kystradioen er spesialisert på sjø. Husk at mobilen bare når én mottaker – VHF når alle båter rundt deg.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.c', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-018',
		emne: 1,
		pensumpunkt: '1.1.i',
		underpunkt: 'Drivstoffsystem, kjøleoljesystem',
		kategori: 'brann',
		vanskelighet: 2,
		sporsmal: 'Hva bør du sjekke jevnlig i drivstoffsystemet?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Slanger, klemmer og koblinger for lekkasje og sprekker, og vann eller smuss i filteret'
			},
			{ id: 'b', tekst: 'Bare at det er drivstoff på tanken' },
			{ id: 'c', tekst: 'Oktantallet på bensinen' },
			{ id: 'd', tekst: 'Fargen på tanken' }
		],
		riktig: 'a',
		forklaring:
			'Slanger tørker ut og sprekker, klemmer ruster, og kondens gir vann i tanken. En drivstofflekkasje i motorrommet er både den vanligste årsaken til båtbrann og til motorstopp i verst tenkelige øyeblikk. Sjekk før sesongen og se etter fukt og lukt underveis.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.i', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'fo-004',
		emne: 1,
		pensumpunkt: '1.1.m',
		underpunkt: 'Skader etter kollisjon eller fall i høy fart',
		kategori: 'forstehjelp',
		vanskelighet: 3,
		sporsmal: 'Etter en kollisjon i høy fart er en person tilsynelatende uskadd, men klager over vondt i nakken. Hva gjør du?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Holder personen mest mulig i ro, støtter nakken og varsler hjelp – indre skader kan komme til syne først etter en stund'
			},
			{ id: 'b', tekst: 'Ber personen bevege på nakken for å sjekke om noe er brukket' },
			{ id: 'c', tekst: 'Lar personen legge seg og sover det av' },
			{ id: 'd', tekst: 'Gir smertestillende og fortsetter turen' }
		],
		riktig: 'a',
		forklaring:
			'Høyenergiskader gir ofte skjulte skader i nakke, rygg og indre organer. Symptomene kan komme gradvis. Hold personen i ro, støtt hode og nakke, hindre nedkjøling og få profesjonell vurdering. Å teste bevegelighet i en mulig nakkeskade kan gjøre skaden verre.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.m', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-019',
		emne: 1,
		pensumpunkt: '1.1.p',
		underpunkt: 'Innsnevret syn, tunnelsyn',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hva skjer med synet ditt når farten øker?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Synsfeltet snevres inn – du ser stadig mindre til sidene og oppdager ting senere'
			},
			{ id: 'b', tekst: 'Synsfeltet blir bredere fordi du er mer årvåken' },
			{ id: 'c', tekst: 'Fargesynet blir bedre' },
			{ id: 'd', tekst: 'Farten påvirker ikke synet' }
		],
		riktig: 'a',
		forklaring:
			'I høy fart konsentreres blikket framover, og sidesynet svekkes – det kalles tunnelsyn. Du ser altså mindre akkurat når du har minst tid til å reagere. Kombinert med at plotteren henger etter, er dette hovedgrunnen til at fart er farlig i trangt farvann.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.p', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-020',
		emne: 1,
		pensumpunkt: '1.1.p',
		underpunkt: 'Høyhastighetsnavigasjon',
		kategori: 'sjomannskap',
		vanskelighet: 3,
		sporsmal: 'Hva kjennetegner forsvarlig navigasjon i høy fart?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'At ruten er planlagt på forhånd, at du kjenner farvannet, og at farten settes ned der sikt eller trafikk krever det'
			},
			{ id: 'b', tekst: 'At du følger plotteren tett og justerer kursen fortløpende' },
			{ id: 'c', tekst: 'At du holder samme fart hele veien for å spare drivstoff' },
			{ id: 'd', tekst: 'At du kjører nær land for å ha kort vei inn' }
		],
		riktig: 'a',
		forklaring:
			'I høy fart rekker du ikke å navigere underveis – avgjørelsene må være tatt før du starter. Planlegg ruten, kjenn farene, ha en utkikk til, og sett ned farten ved dårlig sikt, i trange sund og der det er folk. Fart krever mer forberedelse, ikke mindre.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.p', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-021',
		emne: 1,
		pensumpunkt: '1.1.p',
		underpunkt: 'Risiko og konsekvenser',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Hvorfor får en grunnstøting i høy fart så mye større konsekvenser enn i lav fart?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Fordi bevegelsesenergien øker kraftig med farten, så både skadene på båten og på de om bord blir mye større'
			},
			{ id: 'b', tekst: 'Fordi motoren stopper raskere' },
			{ id: 'c', tekst: 'Fordi båten synker saktere' },
			{ id: 'd', tekst: 'Det er ingen vesentlig forskjell' }
		],
		riktig: 'a',
		forklaring:
			'Bevegelsesenergien vokser med kvadratet av farten: dobler du farten, firedobles energien som må tas opp i sammenstøtet. Derfor blir en berøring i sakte fart en skramme, mens den samme grunnen i planingsfart kan knuse skroget og kaste folk ut av båten.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.1.p', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'sj-022',
		emne: 1,
		pensumpunkt: '1.1.q',
		underpunkt: 'Holdninger til sjøs og respekt for andre brukere av farvannet',
		kategori: 'sjomannskap',
		vanskelighet: 2,
		sporsmal: 'Du har formelt sett retten på din side, men den andre båten viker ikke. Hva er riktig holdning?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Å manøvrere selv for å unngå sammenstøt – å ha rett er ingen unnskyldning for en kollisjon'
			},
			{ id: 'b', tekst: 'Å holde kurs og fart uansett, siden han har vikeplikt' },
			{ id: 'c', tekst: 'Å øke farten for å komme forbi først' },
			{ id: 'd', tekst: 'Å gå så nær som mulig for å markere at han tar feil' }
		],
		riktig: 'a',
		forklaring:
			'Sjøveisreglene krever at du gjør alt som trengs for å unngå sammenstøt, også når den andre er den som svikter. Plikten til å holde kurs opphører når det er klart at den andre ikke gjør sitt. God sjømannskap handler om å komme trygt fram, ikke om å få rett.',
		kilde: { verk: 'Sjøveisreglene', hjemmel: 'Regel 2 og regel 17', lenke: SJOVEISREGLENE },
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-008',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Småbåtloven §§ 21, 22, 23, 27, 32, 33, 35 og kapittel 5',
		kategori: 'lover',
		vanskelighet: 2,
		sporsmal: 'Hva krever småbåtloven av den som fører en fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'At båten navigeres aktsomt, slik at det ikke oppstår fare for liv og helse, miljø eller materielle verdier'
			},
			{ id: 'b', tekst: 'At føreren alltid har papirkart om bord' },
			{ id: 'c', tekst: 'At båten er registrert i småbåtregisteret' },
			{ id: 'd', tekst: 'At det føres loggbok for hver tur' }
		],
		riktig: 'a',
		forklaring:
			'Aktsomhetskravet er selve grunnregelen i småbåtloven: en fritidsbåt skal navigeres slik at det ikke oppstår fare for liv og helse, miljø eller materielle verdier. Loven inneholder i tillegg blant annet promillegrensen og påbudet om flyteutstyr.',
		kilde: { verk: 'Småbåtloven', hjemmel: '§ 24', lenke: SMABATLOVEN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-009',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Friluftsloven §§ 1–8',
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal: 'Du vil telte i en vik på en tur. Hva sier friluftsloven?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'I utmark kan du telte inntil to døgn, og ikke nærmere bebodd hus eller hytte enn 150 meter'
			},
			{ id: 'b', tekst: 'Du kan telte hvor som helst så lenge du rydder etter deg' },
			{ id: 'c', tekst: 'Telting krever alltid grunneiers tillatelse' },
			{ id: 'd', tekst: 'Du kan telte inntil en uke, 50 meter fra hus' }
		],
		riktig: 'a',
		forklaring:
			'Allemannsretten gjelder i utmark, ikke i innmark som tun, hage og dyrket mark. Teltet skal ikke settes nærmere bebodd hus eller hytte enn 150 meter, og opphold utover to døgn krever grunneiers samtykke – unntatt i høyfjellet og langt fra bebyggelse.',
		kilde: {
			verk: 'Friluftsloven',
			hjemmel: '§ 9',
			lenke: 'https://lovdata.no/dokument/NL/lov/1957-06-28-16'
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-010',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Motorferdselloven',
		kategori: 'lover',
		vanskelighet: 3,
		sporsmal: 'Hva er hovedregelen for motorferdsel på innsjøer og vassdrag?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Motorferdsel er i utgangspunktet forbudt, men er tillatt på innsjøer større enn 2 kvadratkilometer og i visse elvestrekninger'
			},
			{ id: 'b', tekst: 'Motorferdsel er fritt tillatt på alt ferskvann' },
			{ id: 'c', tekst: 'Motorferdsel er forbudt på alt ferskvann uten unntak' },
			{ id: 'd', tekst: 'Reglene gjelder bare for vannscootere' }
		],
		riktig: 'a',
		forklaring:
			'Motorferdselloven snur utgangspunktet: i utmark og vassdrag er motorferdsel forbudt med mindre loven åpner for det. Unntaket gjelder innsjøer på minst 2 kvadratkilometer, elvestrekninger og mindre innsjøer som inngår i farbart vassdrag. Kommunen kan i tillegg begrense eller forby ferdselen.',
		kilde: {
			verk: 'Motorferdselloven',
			hjemmel: '§ 3 og § 4',
			lenke: 'https://lovdata.no/dokument/NL/lov/1977-06-10-82'
		},
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-011',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Forskrift om fartsbegrensninger i sjøen',
		kategori: 'lover',
		vanskelighet: 2,
		sporsmal: 'Hvem kan fastsette lokale fartsgrenser i sjøen der du ferdes?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Kommunen i sine sjøområder, og Kystverket i hoved- og bileder – så du må sjekke lokale regler'
			},
			{ id: 'b', tekst: 'Bare Sjøfartsdirektoratet, og grensene er like i hele landet' },
			{ id: 'c', tekst: 'Bare politiet, og bare midlertidig' },
			{ id: 'd', tekst: 'Ingen – det finnes bare den nasjonale 5-knopsregelen' }
		],
		riktig: 'a',
		forklaring:
			'Ved siden av den statlige regelen om 5 knop nærmere enn 50 meter fra badende, fastsetter kommunene fartsgrenser i sine sjøområder og Kystverket i hoved- og bileder. Grensene varierer fra sted til sted, så sjekk kommunens kart eller oppslag før du gir gass i ukjent farvann.',
		kilde: { verk: 'Forskrift om fartsgrenser på sjøen', hjemmel: '§ 2 og § 3', lenke: FARTSGRENSER },
		kontrollert: '2026-09-07'
	},
	{
		id: 'lo-012',
		emne: 2,
		pensumpunkt: '1.2.h',
		underpunkt: 'Forskrift om flyteutstyr om bord på fritidsfartøy',
		kategori: 'lover',
		vanskelighet: 2,
		sporsmal: 'Hvor mye flyteutstyr skal det være om bord i en fritidsbåt?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Egnet flyteutstyr til alle om bord, tilpasset den enkeltes vekt og størrelse'
			},
			{ id: 'b', tekst: 'Minst to vester, uansett hvor mange som er om bord' },
			{ id: 'c', tekst: 'Bare til barn under 16 år' },
			{ id: 'd', tekst: 'Bare når du går utenfor skjærgården' }
		],
		riktig: 'a',
		forklaring:
			'Det skal alltid finnes egnet flyteutstyr til hver enkelt om bord, og det må passe personens vekt. En voksenvest holder ikke et barn flytende riktig. I båter under 8 meter skal utstyret i tillegg brukes av alle som oppholder seg utendørs mens båten er i fart.',
		kilde: { verk: 'Småbåtloven', hjemmel: '§ 23 og § 23 a', lenke: SMABATLOVEN },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-017',
		emne: 3,
		pensumpunkt: '1.3.g',
		underpunkt: null,
		kategori: 'navigasjon',
		vanskelighet: 3,
		sporsmal: 'GPS-en viser posisjon N 59° 54,5\' Ø 010° 43,8\'. Hvordan finner du dette punktet i sjøkartet?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Måler bredden av på skalaen langs siden og lengden av på skalaen langs topp og bunn, og finner skjæringspunktet'
			},
			{ id: 'b', tekst: 'Måler begge verdiene på breddeskalaen langs siden' },
			{ id: 'c', tekst: 'Måler begge verdiene på lengdeskalaen langs bunnen' },
			{ id: 'd', tekst: 'Bruker kartets målestokk til å regne om til meter først' }
		],
		riktig: 'a',
		forklaring:
			'Bredden (N) leser du av på skalaen langs sidene, lengden (Ø) på skalaen langs topp og bunn. Der de to linjene krysser hverandre, er du. Merk at minuttene er oppgitt med desimaler, ikke sekunder – og kontroller at kartdatumet i GPS-en er det samme som i kartet, ellers kan posisjonen bomme med flere hundre meter.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.g', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	},
	{
		id: 'na-018',
		emne: 3,
		pensumpunkt: '1.3.h',
		underpunkt: null,
		kategori: 'navigasjon',
		vanskelighet: 3,
		sporsmal: 'Du vil vite hvor du er ved hjelp av landemerker. Hva er den enkleste pålitelige metoden?',
		illustrasjon: null,
		alternativer: [
			{
				id: 'a',
				tekst: 'Ta kompasspeiling mot to kjente landemerker og tegne peilelinjene i kartet – der de krysser, er du'
			},
			{ id: 'b', tekst: 'Peile ett landemerke og gjette avstanden' },
			{ id: 'c', tekst: 'Se hvilket landemerke som er nærmest' },
			{ id: 'd', tekst: 'Måle høyden på fjellet med linjal mot kartet' }
		],
		riktig: 'a',
		forklaring:
			'To peilinger gir et kryss som fastslår posisjonen din. Tre peilinger er bedre – da får du en liten trekant som viser hvor nøyaktig du har vært. Velg landemerker som ligger godt fra hverandre i retning; peiler du to punkter som ligger nesten i samme retning, blir krysset upresist.',
		kilde: { verk: 'Pensum til båtførerprøven', hjemmel: 'Punkt 1.3.h', lenke: SDIR_BEVIS },
		kontrollert: '2026-09-07'
	}
];

export const alleKategorier = (): string[] => [...new Set(SPORSMAL.map((s) => s.kategori))];
