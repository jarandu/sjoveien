import Sjomerke from './Sjomerke.svelte';
import Lanterne from './Lanterne.svelte';
import Vikeplikt from './Vikeplikt.svelte';
import Kartsymbol from './Kartsymbol.svelte';
import Lydsignal from './Lydsignal.svelte';

/**
 * Spørsmål refererer til illustrasjoner med en streng, ikke med en import.
 * Da holder dataene seg rene, og valideringsskriptet kan sjekke at hver
 * referanse faktisk finnes her.
 */
export const ILLUSTRASJONER = {
	sjomerke: Sjomerke,
	lanterne: Lanterne,
	vikeplikt: Vikeplikt,
	kartsymbol: Kartsymbol,
	lydsignal: Lydsignal
};

export const finnesIllustrasjon = (navn) => Object.hasOwn(ILLUSTRASJONER, navn);
