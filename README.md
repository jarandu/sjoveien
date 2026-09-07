# Sjøveien

Øvingsapp for båtførerprøven. SvelteKit, ingen innlogging, all fremdrift i nettleseren.

Ikke tilknyttet Sjøfartsdirektoratet eller Norsk Test.

## Kom i gang

```bash
npm install
npm run dev
```

`npm run build` kjører validatoren først og stopper hvis spørsmålsbanken har feil.

## Deploy til Vercel

Prosjektet bruker `@sveltejs/adapter-vercel` og alle sider prerendres, så resultatet
blir statiske filer på Vercels CDN. Ingen serverless-funksjoner i praksis, ingen env-variabler.

1. `git init && git add -A && git commit -m "Første versjon"`
2. Push til et tomt GitHub-repo
3. Vercel → Add New → Project → importer repoet

Vercel detekterer SvelteKit selv. Byggekommando `npm run build`, ingen output-mappe å sette.

Alternativt, uten GitHub:

```bash
npx vercel        # forhåndsvisning
npx vercel --prod # produksjon
```

## Innhold og faktasjekk

Spørsmålene ligger i `src/lib/data/sporsmal.js`. Hvert spørsmål har:

| felt | hva det er |
| --- | --- |
| `emne` | 1–4, Sjøfartsdirektoratets egen inndeling |
| `pensumpunkt` | f.eks. `1.4.3`, punktet spørsmålet dekker |
| `underpunkt` | valgfritt kulepunkt under pensumpunktet, ordrett fra pensumlisten |
| `kilde` | `{ verk, hjemmel, lenke }` — primærkilden regelen står i |
| `kontrollert` | dato regelen sist ble kontrollert mot kilden |
| `forklaring` | vises etter svar, forklarer *hvorfor* |

`npm run valider` sjekker at:

- alle id-er er unike
- hvert spørsmål har nøyaktig ett riktig svar
- `emne` og `pensumpunkt` finnes i den offisielle pensumlisten
- `pensumpunkt` faktisk hører hjemme i emnet spørsmålet er merket med
- `underpunkt` er et av pensumlistens egne kulepunkter under det punktet
- alle spørsmål har kilde og kontrolldato
- illustrasjonen som refereres faktisk finnes

Den skriver også ut hvilke pensumpunkter som ennå ikke har oppgaver, og advarer om
kilder uten lenke. Advarsler stopper ikke bygget; feil gjør det.

Alle spørsmål er formulert fra regelverket. Ingenting er hentet fra Norsk Tests
oppgavebank eller fra kursmateriell.

## Illustrasjoner

`src/lib/illustrasjoner/` – ren SVG, tegnet i kode. Ingen genererte bilder.

Stilkonsistensen er strukturell: `stil.js` eier alle farger, strektykkelser og
proporsjoner, `Scene.svelte` eier lerret og bakgrunn, og ingen komponent har lov til å
definere egne. Paletten er hentet fra norske sjøkart. En ny illustrasjon blir automatisk
lik de andre.

`/tegninger` viser hele biblioteket i alle varianter — nyttig når du tegner nye.

## Struktur

```
src/lib/pensum.js          offisiell emneinndeling + prøvens format
src/lib/data/sporsmal.js   spørsmålsbanken
src/lib/quiz.js            trekking av sett, retting, eksamensregler
src/lib/lagring.svelte.js  fremdrift i localStorage
src/routes/ov              øving per emne eller pensumpunkt, umiddelbar retting
src/routes/eksamen         50 spørsmål, 60 minutter, begge beståttkravene
```

`pensum.js` speiler pensumlisten på tre nivåer: emne → pensumpunkt →
underpunkt. Forsiden bygger kortene direkte på den strukturen, så nye
pensumpunkter dukker opp av seg selv når de får oppgaver. `/ov` tar
`?emne=`, `?punkt=`, `?kategori=` og `?niva=` som filter.

Lesebredden (`--spalte`) og den vide bredden (`--vid`) er egne tokens:
oppgavesider holder seg smale, mens forsiden og tegningssiden bruker hele
skjermen.
