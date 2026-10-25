import { HomePage } from "@/components/home-page";

// A teljes oldal build időben generálódik; kérésidejű renderelés nem kerülhet bele.
export const ensureStatic = "navigation";

export default function Page() {
  return <HomePage locale="en" />;
}
