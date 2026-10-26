# Hornyák Richárd – önéletrajz (landing page)

Egyoldalas, statikusan generált önéletrajz-oldal: **Technical Business Analyst | Web- és low-code fejlesztő**.

## Technológia

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, `ensureStatic = "navigation"` – a teljes oldal build időben generálódik)
- TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS 4 (CSS-változókra épülő tokenek, világos és sötét téma)
- [Motion](https://motion.dev) (`LazyMotion` + `m.*`): „dynamic island” fejezetnavigáció, görgetésvezérelt fejezetváltások, rögzített vízszintes projektsáv, idővonal-kitöltés, mágneses gombok, felpörgő számok
- Canvas 2D: egérkövető, kattintásra hullámzó pontháló a háttérben (függőség nélkül)
- Natív CSS scroll-driven animációk (`animation-timeline: view()`) a szekciók megjelenéséhez
- [Vercel Web Analytics](https://vercel.com/docs/analytics) (`@vercel/analytics`): süti nélküli látogatásmérés
- ESLint (`eslint-config-next` + `eslint-config-prettier`), Prettier (`prettier-plugin-tailwindcss`)

Minden animáció tiszteletben tartja a `prefers-reduced-motion` beállítást (CSS media query és `MotionConfig reducedMotion="user"`).

## Felépítés

```
src/
├── app/
│   ├── (hu)/                 # magyar gyökér-layout: /  (lang="hu")
│   │   ├── layout.tsx, page.tsx, opengraph-image.tsx
│   ├── (en)/en/              # angol gyökér-layout: /en  (lang="en")
│   │   ├── layout.tsx, page.tsx, opengraph-image.tsx
│   ├── global-not-found.tsx  # közös 404 (két gyökér-layout mellett)
│   ├── icon.svg, robots.ts, sitemap.ts
│   └── globals.css           # dizájntokenek, animációk
├── components/               # nyelvfüggetlen szekció- és UI-komponensek
├── content/
│   ├── types.ts              # a tartalom típusa
│   ├── hu.ts, en.ts          # a teljes tartalom nyelvenként (felületi szövegekkel együtt)
│   └── index.ts              # nyelvek, nyelvváltó adatai
└── lib/                      # metaadat, hreflang, OG-kép, segédhookok
public/
├── Hornyak_Richard_CV_Technical_Business_Analyst.pdf
└── Hornyak_Richard_CV_Technical_Business_Analyst_EN.pdf
```

A szöveges tartalom kizárólag a `src/content/hu.ts` és `src/content/en.ts` fájlokban van; a két fájl ugyanazt a `CV` típust valósítja meg, így a fordítás nem maradhat hiányos.

### Többnyelvűség

- A magyar oldal a `/`, az angol a `/en` útvonalon érhető el; mindkettő statikusan generálódik, átirányítás és middleware nélkül.
- Két gyökér-layout (route groupok), így a `<html lang>` nyelvenként helyes.
- `hreflang`-alternatívák (`hu`, `en`, `x-default`), nyelvenkénti canonical, Open Graph-locale (`hu_HU`, `en_GB`) és megosztási kép.
- A fejléc nyelvváltója ugyanarra a fejezetre visz a másik nyelven (a horgonyok nyelvenként eltérnek).

## Futtatás helyben

Node.js 20.9 vagy újabb szükséges.

```bash
npm ci
npm run dev
```

Az oldal a http://localhost:3000 címen érhető el.

| Parancs                | Leírás                                         |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | fejlesztői szerver                             |
| `npm run build`        | éles build (statikus generálás)                |
| `npm run start`        | az éles build kiszolgálása                     |
| `npm run lint`         | ESLint                                         |
| `npm run typecheck`    | route-típusok generálása és `tsc --noEmit`     |
| `npm run format`       | Prettier formázás                              |
| `npm run format:check` | Prettier ellenőrzés                            |
| `npm run check`        | lint + typecheck + formázás-ellenőrzés + build |

## Telepítés Vercelre

1. Pushold a repót GitHubra.
2. A [Vercel](https://vercel.com/new) felületén válaszd az **Add New → Project** lehetőséget, és importáld a repót. A keretrendszert (Next.js) a Vercel automatikusan felismeri; további beállítás nem kell.
3. Opcionálisan állítsd be a `NEXT_PUBLIC_SITE_URL` környezeti változót a végleges domainre (pl. `https://hornyakrichard.hu`). Ha nincs megadva, a canonical URL, a sitemap és az Open Graph a Vercel production-domainjét (`VERCEL_PROJECT_PRODUCTION_URL`) használja.
4. **Deploy.** Minden további push a `main` ágra automatikusan új élesítést indít.

Parancssorból:

```bash
npx vercel        # előnézeti deploy
npx vercel --prod # éles deploy
```

## Adatvédelem

A látogatásmérés a Vercel Web Analytics-szel történik, sütik és személyes azonosítók nélkül. A telefonszám szándékosan nem jelenik meg az oldal szövegében; a letölthető PDF-önéletrajz tartalmazza. A Winzard és az AI Workbench privát repó, ezért csak a leírásuk jelenik meg, link nélkül.
