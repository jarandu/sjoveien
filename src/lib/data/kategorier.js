/**
 * Kategorier er finere inndelt enn de fire pensumemnene, slik at man kan
 * terpe på ett tema om gangen. Hver kategori peker tilbake på emnet den
 * hører hjemme i, så eksamensfordelingen fortsatt blir riktig.
 */
export const KATEGORIER = [
	{ id: 'sjomerker', navn: 'Sjømerker', emne: 4 },
	{ id: 'kartsymboler', navn: 'Kart og symboler', emne: 4 },
	{ id: 'vikeplikt', navn: 'Vikeplikt', emne: 4 },
	{ id: 'lanterner', navn: 'Lanterner og flagg', emne: 4 },
	{ id: 'nodsituasjoner', navn: 'Nødsituasjoner', emne: 4 },
	{ id: 'lover', navn: 'Lover og regler', emne: 2 },
	{ id: 'lydsignaler', navn: 'Lyd- og nødsignaler', emne: 2 },
	{ id: 'navigasjon', navn: 'Navigasjon og kompass', emne: 3 },
	{ id: 'beregning', navn: 'Fart og distanse', emne: 3 },
	{ id: 'sikkerhetsutstyr', navn: 'Sikkerhetsutstyr', emne: 1 },
	{ id: 'brann', navn: 'Brann og motor', emne: 1 },
	{ id: 'forstehjelp', navn: 'Førstehjelp', emne: 1 },
	{ id: 'sjomannskap', navn: 'Godt sjømannskap', emne: 1 },
	{ id: 'vaer', navn: 'Vær og sjøforhold', emne: 1 }
];

export const NIVAER = [
	{ nr: 1, navn: 'Grunnleggende', beskrivelse: 'Kan læres utenat. Kommer nesten alltid på prøven.' },
	{ nr: 2, navn: 'Middels', beskrivelse: 'Krever at du forstår regelen, ikke bare husker den.' },
	{ nr: 3, navn: 'Krevende', beskrivelse: 'Unntak, sammensatte situasjoner og regnestykker.' }
];

export const kategori = (id) => KATEGORIER.find((k) => k.id === id);
