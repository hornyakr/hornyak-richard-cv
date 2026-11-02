export const CONSENT_STORAGE_KEY = "analytics-consent";

export type Consent = "granted" | "denied";

const CHANGE_EVENT = "analytics-consent-change";
const OPEN_EVENT = "analytics-consent-open";

// Ha a tárhely nem elérhető (pl. privát mód), a döntés csak erre a látogatásra él.
let fallback: Consent | null = null;

/** Az elmentett döntés; `null`, ha a látogató még nem döntött. */
export function readConsent(): Consent | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : fallback;
  } catch {
    return fallback;
  }
}

export function writeConsent(consent: Consent) {
  fallback = consent;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // A döntés a memóriában marad.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Döntésváltozás figyelése: ezen a lapon és (a `storage` eseménnyel) más lapokon is. */
export function subscribeConsent(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** A hozzájárulási sáv újranyitása (a lábléc „Mérési beállítások” gombja). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeConsentOpen(onOpen: () => void) {
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => window.removeEventListener(OPEN_EVENT, onOpen);
}
