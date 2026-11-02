import type { PrivacyCopy } from "@/content/privacy/types";

export const privacyHu: PrivacyCopy = {
  locale: "hu",
  path: "/adatkezeles",
  metaTitle: "Adatkezelési tájékoztató – Hornyák Richárd",
  metaDescription:
    "Milyen adatot kezel az oldal, milyen célból és jogalapon, kik a címzettek, és milyen jogai vannak.",
  eyebrow: "Adatvédelem",
  title: "Adatkezelési tájékoztató",
  updated: "Hatályos: 2026. november 2.",
  intro:
    "Ez a tájékoztató az Európai Unió általános adatvédelmi rendelete (GDPR) 13. cikke alapján írja le, milyen személyes adatot kezelek, amikor Ön ezt a weboldalt használja, vagy e-mailben megkeres. Az oldal nem használ sütit.",
  sections: [
    {
      id: "adatkezelo",
      title: "Az adatkezelő",
      paragraphs: [
        "Hornyák Richárd magánszemély. Adatvédelmi kérdésben is a hornyak.richard94@gmail.com címen érhető el. Adatvédelmi tisztviselőt nem neveztem ki, mert erre nem vagyok köteles.",
      ],
    },
    {
      id: "kiszolgalas",
      title: "1. Az oldal kiszolgálása",
      paragraphs: [
        "Az oldalt a Vercel Inc. (Amerikai Egyesült Államok) szolgálja ki. Amikor Ön megnyit egy oldalt, a böngészője elküldi a Vercel szervereinek az IP-címét, a böngésző és az operációs rendszer adatait (user agent), a kért címet, a hivatkozó oldalt és az időpontot. Ezek nélkül az oldal nem jeleníthető meg.",
        "Cél: az oldal kiszolgálása, a hibák és a visszaélések kezelése. Jogalap: a GDPR 6. cikk (1) bekezdés f) pontja; jogos érdekem, hogy az oldal biztonságosan és megbízhatóan működjön. Megőrzés: a Vercel szervernaplóiban, a Vercel által meghatározott rövid ideig. Az adatokat nem kapcsolom össze más adattal, és nem azonosítok belőlük senkit.",
      ],
    },
    {
      id: "meres",
      title: "2. Látogatottságmérés (csak hozzájárulással)",
      paragraphs: [
        "Ha Ön hozzájárul, a Vercel Web Analytics összesített statisztikát készít az oldal látogatottságáról. Oldalmegtekintésenként ezt rögzíti: a megtekintett címet, a hivatkozó oldalt, a böngészőt, az operációs rendszert, az eszköz típusát, és az IP-címből meghatározott országot. A Vercel a látogatót a kérésből képzett, 24 óra után törlődő azonosítóval különbözteti meg; az IP-címet nem tárolja, és sütit nem használ.",
        "Jogalap: az Ön hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont; az elektronikus hírközlésről szóló 2003. évi C. törvény 155. § (4) bekezdése). Hozzájárulás nélkül a mérés nem töltődik be. A hozzájárulását bármikor visszavonhatja az oldal alján lévő „Mérési beállítások” gombbal; a visszavonás nem érinti a korábbi mérés jogszerűségét. Megőrzés: a statisztika összesítve, a Vercel fiókom megőrzési ideje szerint marad meg.",
      ],
    },
    {
      id: "eszkoz",
      title: "3. Az Ön eszközén tárolt beállítások",
      paragraphs: [
        "Az oldal sütit nem használ. A böngésző helyi tárhelyén (localStorage) legfeljebb két beállítás jöhet létre, és egyik sem kerül hozzám vagy harmadik félhez:",
      ],
      items: [
        "theme: a választott világos vagy sötét téma; csak akkor jön létre, ha Ön átvált a témaváltó gombbal.",
        "analytics-consent: a látogatottságmérésről hozott döntése (elfogadta vagy elutasította), hogy ne kérdezzem újra minden látogatáskor.",
      ],
    },
    {
      id: "kapcsolat",
      title: "4. Kapcsolatfelvétel e-mailben",
      paragraphs: [
        "Ha Ön e-mailt ír, a levélben megadott adatokat (név, e-mail-cím, a levél tartalma) kezelem. Cél: a megkeresés megválaszolása, és ha abból munka vagy megbízás lesz, annak előkészítése. Jogalap: szerződés előkészítésénél a GDPR 6. cikk (1) bekezdés b) pontja, egyébként az f) pontja (jogos érdekem a megkeresések megválaszolása).",
        "Megőrzés: a megkeresés lezárásától számított legfeljebb egy évig; ha szerződés jön létre, a szerződésre vonatkozó megőrzési idő szerint. A leveleket a Google LLC (Amerikai Egyesült Államok) Gmail-szolgáltatásában tárolom.",
      ],
    },
    {
      id: "cimzettek",
      title: "5. Címzettek és adattovábbítás",
      paragraphs: [
        "Az adatokat nem adom el, és hirdetési célra nem használom. Címzettek: a Vercel Inc. (tárhely és látogatottságmérés, adatfeldolgozóként) és a Google LLC (e-mail). Mindkettő az Amerikai Egyesült Államokban székel; a továbbítás alapja az Európai Bizottság EU–USA adatvédelmi keretrendszerről szóló megfelelőségi határozata, illetve a Bizottság általános adatvédelmi kikötései. Az adatkezelésükről a saját tájékoztatójuk szól: vercel.com/legal/privacy-policy és policies.google.com/privacy.",
        "A CV letöltése és a külső hivatkozások (például a GitHub vagy a projektek oldalai) nem indítanak adatgyűjtést ezen az oldalon. Egy külső oldalon már annak üzemeltetője kezeli az adatokat.",
      ],
    },
    {
      id: "jogok",
      title: "6. Az Ön jogai",
      paragraphs: [
        "Kérheti, hogy tájékoztassam a kezelt adatairól, és hogy azokat helyesbítsem, töröljem, vagy kezelésüket korlátozzam. Kérheti az adatai géppel olvasható átadását, és a jogos érdeken alapuló adatkezelés ellen tiltakozhat. A hozzájárulását bármikor visszavonhatja. Kérésére legkésőbb egy hónapon belül válaszolok.",
        "Az adatok megadása nem kötelező; e-mail nélkül azonban nem tudok válaszolni. Automatizált döntéshozatal és profilalkotás nincs.",
      ],
    },
    {
      id: "jogorvoslat",
      title: "7. Panasz és jogorvoslat",
      paragraphs: [
        "Ha úgy érzi, hogy megsértettem az adatvédelmi jogait, kérem, először írjon nekem. Panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; postacím: 1363 Budapest, Pf. 9.; ugyfelszolgalat@naih.hu; naih.hu), és bírósághoz is fordulhat; a pert a lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is megindíthatja.",
      ],
    },
  ],
  backToCv: "Vissza az önéletrajzhoz",
  footerLink: "Adatkezelési tájékoztató",
  consent: {
    title: "Látogatottságmérés",
    body: "Az oldal nem használ sütit. Ha hozzájárul, a Vercel Web Analytics névtelen statisztikát készít arról, melyik oldalt nézik meg, honnan érkeznek a látogatók, milyen böngészővel és eszközzel, melyik országból. Döntését bármikor megváltoztathatja az oldal alján, a „Mérési beállítások” gombbal.",
    privacyLink: "Részletek az adatkezelési tájékoztatóban",
    accept: "Elfogadom",
    decline: "Elutasítom",
    settings: "Mérési beállítások",
  },
};
