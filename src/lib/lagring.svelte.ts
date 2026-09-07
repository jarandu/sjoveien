import { browser } from '$app/environment';
import type { Resultat } from './typer.js';

/** Hva vi husker om ett spørsmål. */
interface Svarstatistikk {
	riktig: number;
	feil: number;
	sist: string | null;
	sisteVarRiktig?: boolean;
}

/** En lagret eksamen: resultatet pluss når den ble tatt. */
type LagretEksamen = Resultat & { dato: string };

interface Status {
	svar: Record<string, Svarstatistikk>;
	eksamener: LagretEksamen[];
}

const NOKKEL = 'sjoveien.fremdrift.v1';

/**
 * All fremdrift ligger lokalt i nettleseren. Ingen innlogging, ingen server.
 * Formen er bevisst enkel, slik at den senere kan synkes mot en backend
 * uten at resten av appen må skrives om.
 */
function tomStatus(): Status {
	return { svar: {}, eksamener: [] };
}

function lesInn(): Status {
	if (!browser) return tomStatus();
	try {
		const rå = localStorage.getItem(NOKKEL);
		return rå ? { ...tomStatus(), ...JSON.parse(rå) } : tomStatus();
	} catch {
		return tomStatus();
	}
}

class Fremdrift {
	#data: Status = $state(tomStatus());

	constructor() {
		this.#data = lesInn();
	}

	#lagre(): void {
		if (!browser) return;
		try {
			localStorage.setItem(NOKKEL, JSON.stringify(this.#data));
		} catch {
			// Full eller avslått lagring skal ikke velte økten.
		}
	}

	get svar(): Record<string, Svarstatistikk> {
		return this.#data.svar;
	}

	get eksamener(): LagretEksamen[] {
		return this.#data.eksamener;
	}

	registrer(sporsmalId: string, riktig: boolean): void {
		const f = this.#data.svar[sporsmalId] ?? { riktig: 0, feil: 0, sist: null };
		if (riktig) f.riktig += 1;
		else f.feil += 1;
		f.sist = new Date().toISOString();
		f.sisteVarRiktig = riktig;
		this.#data.svar[sporsmalId] = f;
		this.#lagre();
	}

	registrerEksamen(resultat: Resultat): void {
		this.#data.eksamener = [
			{ ...resultat, dato: new Date().toISOString() },
			...this.#data.eksamener
		].slice(0, 20);
		this.#lagre();
	}

	/** Spørsmål du har svart feil på sist gang du så dem. */
	get feilliste(): string[] {
		return Object.entries(this.#data.svar)
			.filter(([, f]) => f.sisteVarRiktig === false)
			.map(([id]) => id);
	}

	get antallBesvart(): number {
		return Object.keys(this.#data.svar).length;
	}

	nullstill(): void {
		this.#data = tomStatus();
		this.#lagre();
	}
}

export const fremdrift = new Fremdrift();
