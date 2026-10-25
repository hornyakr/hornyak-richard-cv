export const THEME_STORAGE_KEY = "theme";

/**
 * Az első festés előtt fut, így nincs villanás téma váltásakor.
 * Sorrend: elmentett választás → rendszerbeállítás.
 */
const script = `(() => {
  try {
    const stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = stored === "dark" || stored === "light" ? stored : system;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
