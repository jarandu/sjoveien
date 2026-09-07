/**
 * Domenetypene for spørsmålsbanken.
 *
 * Disse speiler reglene `scripts/valider.mjs` håndhever. Poenget med å
 * skrive dem ut er at feil som før først dukket opp når validatoren kjørte
 * – feil emne, ukjent kategori, manglende kilde – nå fanges i editoren.
 */

/** Sjøfartsdirektoratets fire emner. */
export type Emne = 1 | 2 | 3 | 4;

/** Vanskelighetsgrad, jf. NIVAER i data/kategorier.ts. */
export type Niva = 1 | 2 | 3;

/** Id-ene til kategoriene i data/kategorier.ts. */
export type KategoriId =
	| 'sjomerker'
	| 'kartsymboler'
	| 'vikeplikt'
	| 'lanterner'
	| 'nodsituasjoner'
	| 'lover'
	| 'lydsignaler'
	| 'navigasjon'
	| 'beregning'
	| 'sikkerhetsutstyr'
	| 'brann'
	| 'forstehjelp'
	| 'sjomannskap'
	| 'vaer';

export interface Kategori {
	id: KategoriId;
	navn: string;
	emne: Emne;
}

export interface NivaBeskrivelse {
	nr: Niva;
	navn: string;
	beskrivelse: string;
}

/** Ett punkt i pensumlisten, f.eks. 1.4.3, med kulepunktene under. */
export interface Pensumpunkt {
	tittel: string;
	under: string[];
}

/** Samme punkt, men flatet ut med kode og emne – se PUNKTER i pensum.ts. */
export interface FlatPensumpunkt extends Pensumpunkt {
	kode: string;
	emne: Emne;
}

export interface EmneDefinisjon {
	nr: Emne;
	navn: string;
	kort: string;
	krav: string;
	punkter: Record<string, Pensumpunkt>;
}

/** Primærkilden regelen står i. `lenke` er null når kilden ikke er på nett. */
export interface Kilde {
	verk: string;
	hjemmel: string;
	lenke: string | null;
}

export interface Alternativ {
	id: string;
	tekst: string;
}

/** Referanse til en illustrasjon i illustrasjoner/index.ts. */
export interface Illustrasjonsreferanse {
	navn: string;
	props: Record<string, unknown>;
}

export interface Sporsmal {
	id: string;
	emne: Emne;
	/** F.eks. "1.4.3". Må finnes i pensumlisten. */
	pensumpunkt: string;
	/** Valgfritt kulepunkt under pensumpunktet, ordrett fra pensumlisten. */
	underpunkt?: string | null;
	kategori: KategoriId;
	vanskelighet: Niva;
	sporsmal: string;
	illustrasjon: Illustrasjonsreferanse | null;
	alternativer: Alternativ[];
	/** Id-en til det riktige alternativet. */
	riktig: string;
	forklaring: string;
	kilde: Kilde;
	/** ISO-dato for når regelen sist ble kontrollert mot kilden. */
	kontrollert: string;
}

/** Filter brukt av quiz.ts. null betyr «ikke begrens på dette». */
export interface Filter {
	kategori?: KategoriId | string | null;
	emne?: Emne | number | null;
	punkt?: string | null;
	underpunkt?: string | null;
	vanskelighet?: Niva | number | null;
}

/** Ett besvart spørsmål i en økt. */
export interface Besvarelse {
	sporsmal: Sporsmal;
	valgt: string | null;
}

/** Resultatet av en rettet økt eller prøve. */
export interface Resultat {
	totalt: number;
	riktige: number;
	prosent: number;
	emne4Totalt: number;
	emne4Riktige: number;
	prosentEmne4: number;
	bestatt: boolean;
}
