import { browser } from '$app/environment';

const NOKKEL = 'sjoveien.fremdrift.v1';

/**
 * All fremdrift ligger lokalt i nettleseren. Ingen innlogging, ingen server.
 * Formen er bevisst enkel, slik at den senere kan synkes mot en backend
 * uten at resten av appen må skrives om.
 */
function tomStatus() {
	return { svar: {}, eksamener: [] };
}

function lesInn() {
	if (!browser) return tomStatus();
	try {
		const rå = localStorage.getItem(NOKKEL);
		return rå ? { ...tomStatus(), ...JSON.parse(rå) } : tomStatus();
	} catch {
		return tomStatus();
	}
}

class Fremdrift {
	#data = $state(tomStatus());

	constructor() {
		this.#data = lesInn();
	}

	#lagre() {
		if (!browser) return;
		try {
			localStorage.setItem(NOKKEL, JSON.stringify(this.#data));
		} catch {
			// Full eller avslått lagring skal ikke velte økten.
		}
	}

	get svar() {
		return this.#data.svar;
	}

	get eksamener() {
		return this.#data.eksamener;
	}

	registrer(sporsmalId, riktig) {
		const f = this.#data.svar[sporsmalId] ?? { riktig: 0, feil: 0, sist: null };
		if (riktig) f.riktig += 1;
		else f.feil += 1;
		f.sist = new Date().toISOString();
		f.sisteVarRiktig = riktig;
		this.#data.svar[sporsmalId] = f;
		this.#lagre();
	}

	registrerEksamen(resultat) {
		this.#data.eksamener = [
			{ ...resultat, dato: new Date().toISOString() },
			...this.#data.eksamener
		].slice(0, 20);
		this.#lagre();
	}

	/** Spørsmål du har svart feil på sist gang du så dem. */
	get feilliste() {
		return Object.entries(this.#data.svar)
			.filter(([, f]) => f.sisteVarRiktig === false)
			.map(([id]) => id);
	}

	get antallBesvart() {
		return Object.keys(this.#data.svar).length;
	}

	nullstill() {
		this.#data = tomStatus();
		this.#lagre();
	}
}

export const fremdrift = new Fremdrift();
