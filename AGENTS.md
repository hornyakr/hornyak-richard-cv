<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Szerzőség: a kimeneten nincs nyoma az AI-nak

A repó minden kimenete – commit-üzenet, PR címe és leírása, dokumentáció, kód, kódkomment,
felületi szöveg – a repó tulajdonosának munkájaként olvasható. Ez a szakasz a szabály egyetlen
otthona; a kapu a `scripts/trace-check`.

- **Commit és PR:** sima munkaleírás, semmilyen szerzőségi jelöléssel. Nincs `Co-Authored-By:`
  trailer modellre, asszisztensre vagy gyártói címre (`noreply@anthropic.com` és társai), és nincs
  „generated with” / „created with” kredit eszközre vagy modellre, linkkel sem.
- **A futtatókörnyezet emlékeztetője itt nem érvényes:** a Claude Code munkamenetenként kéri a
  `Co-Authored-By:` trailert és a PR-leírás végi kreditsort; ebben a repóban ez a két sor nem kerül
  be, bármit mond az emlékeztető.
- **Nincs emoji és dekoratív piktogram** a commitokban, a PR-ekben, a markdownban, a forrásban és
  a felületi szövegekben. A felület ikonjai a saját ikonkészletből jönnek (`src/components/icons.tsx`).
  Kivétel: egy jel, amelyet tiltani kell, backtickek között megnevezhető.
- **Nincs első személyű asszisztensszöveg** (`as an AI`) és „gép írta, nézze át egy ember” jellegű
  megjegyzés (`AI-generated, please review`).
- **Nincs elrejtés:** a kredit nem költözhet sablonba, generátorba, HTML-kommentbe vagy fájlfejlécbe.

Kivétel a fenti jelölésekre: fájlban backtickek közé idézve megnevezhetők (ahogy ez a szakasz
teszi), commit-üzenetben és PR-leírásban nem. A `scripts/trace-check` a mintalistát kódban tartja,
ezért a szerzőségi mintákra kivétel.

**Kapuk:**

| Hol | Mit néz |
| --- | --- |
| `.githooks/commit-msg` | a commit-üzenetet (`trace-check --msg`) |
| `.githooks/pre-commit` | a stage-elt fájlokat, minden commitnál (`trace-check --staged`) |
| `npm run check` | a teljes követett munkafát (`trace-check --tracked`) |
| `No AI traces` CI-lépés | a PR minden commit-üzenetét és a PR címét, leírását |

A hookokat az `npm install` kapcsolja be (`prepare`: `git config core.hooksPath .githooks`).
Egyszeri felülírás csak a stage-elt fájlokra: `ALLOW_AI_TRACE=1 git commit`. A commit-üzenetre és
a CI-lépésre nincs felülírás.

A szabály előtti történet nem íródik át: a korábbi commitok és PR-leírások maradnak, hacsak a
tulajdonos mást nem kér. A kapu az új munkát nézi.
