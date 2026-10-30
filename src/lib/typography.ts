/**
 * Tipográfiai finomítás a megjelenített szövegekhez: a kötőjel ne törjön ott, ahol a sor végén
 * vagy elején egy csonka darab maradna („workflow-” / „k”, „API-” / „integrációk”).
 *
 * A kötőjel után szóösszekötőt (U+2060 WORD JOINER) teszünk: ez láthatatlan, nem kell hozzá
 * külön betűjel (a nem törő kötőjellel, U+2011, szemben, amely sok betűtípusból hiányzik), és a
 * Unicode sortörési szabálya szerint se előtte, se utána nem törhet a sor.
 */

const WORD_JOINER = "⁠";

/** Rövid toldalék a kötőjel után: „workflow-k”, „API-n”, „SQL-lel”, „Zrt.-nél”. */
const shortSuffix = /(?<=[\p{L}\p{N}.])-(?=\p{Ll}{1,4}(?![\p{L}\p{N}]))/gu;

/** Rövid rövidítés vagy egybetűs előtag a kötőjel előtt: „API-integráció”, „AI-vezérelt”, „e-mail”. */
const shortPrefix = /(?<=(?:^|[^\p{L}\p{N}])(?:\p{Lu}{2,4}|\p{L}))-(?=\p{L})/gu;

export function keepHyphenatedTogether(text: string): string {
  return text.replace(shortSuffix, `-${WORD_JOINER}`).replace(shortPrefix, `-${WORD_JOINER}`);
}

/** A szóösszekötők nélküli szöveg (metaadathoz, strukturált adathoz, megosztási képhez). */
export const plainText = (text: string) => text.replaceAll(WORD_JOINER, "");

/**
 * Kihagyott mezők: azonosítók, címek, nyelvi kódok, a keresőknek szánt kulcsszavak, valamint a
 * név és a szerepkör, amelyek az oldal címébe és a megosztási képre is kerülnek.
 */
const untouchedKeys = new Set([
  "id",
  "name",
  "role",
  "roleParts",
  "href",
  "path",
  "paths",
  "emailSubject",
  "email",
  "fileName",
  "locale",
  "htmlLang",
  "ogLocale",
  "languageCode",
  "keywords",
]);

/** Egy tartalomobjektum összes megjelenített szövegére alkalmazza a `keepHyphenatedTogether`-t. */
export function typeset<T>(value: T): T {
  if (typeof value === "string") return keepHyphenatedTogether(value) as T;
  if (Array.isArray(value)) return value.map((item) => typeset(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        untouchedKeys.has(key) ? item : typeset(item),
      ]),
    ) as T;
  }
  return value;
}
