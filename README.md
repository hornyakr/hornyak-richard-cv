# Hornyák Richárd – önéletrajz (landing page)

Egyoldalas, statikusan generált önéletrajz-oldal: **Technical Business Analyst | Web- és low-code fejlesztő**.

## Technológia

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, `ensureStatic = "navigation"` – a teljes oldal build időben generálódik)
- TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS 4 (CSS-változókra épülő tokenek, világos és sötét téma)
- [Motion](https://motion.dev) (`LazyMotion` + `m.*`): idővonal-kitöltés, aktív menüpont, témaváltó, munkafolyamat-kártya
- Natív CSS scroll-driven animációk (`animation-timeline: view()`) a szekciók megjelenéséhez
- ESLint (`eslint-config-next` + `eslint-config-prettier`), Prettier (`prettier-plugin-tailwindcss`)

Minden animáció tiszteletben tartja a `prefers-reduced-motion` beállítást (CSS media query és `MotionConfig reducedMotion="user"`).

## Felépítés

```
src/
├── app/
│   ├── layout.tsx            # metaadatok, Open Graph, betűtípusok, téma
│   ├── page.tsx              # szekciók, JSON-LD (schema.org Person)
│   ├── opengraph-image.tsx   # generált OG-kép
│   ├── icon.svg, robots.ts, sitemap.ts
│   └── globals.css           # dizájntokenek, animációk
├── components/               # szekció- és UI-komponensek
├── content/cv.ts             # az oldal teljes tartalma, egyetlen típusos forrásból
└── lib/site.ts               # URL, cím, navigáció
public/
└── Hornyak_Richard_CV_Technical_Business_Analyst.pdf
```

A szöveges tartalom kizárólag a `src/content/cv.ts` fájlban van; a komponensek innen renderelnek.

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

A telefonszám szándékosan nem jelenik meg az oldal szövegében; a letölthető PDF-önéletrajz tartalmazza. A Winzard és az AI Workbench privát repó, ezért csak a leírásuk jelenik meg, link nélkül.
