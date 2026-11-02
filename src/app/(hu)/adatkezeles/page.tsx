import { PrivacyPage } from "@/components/privacy-page";
import { buildPrivacyMetadata } from "@/lib/site";

// A teljes oldal build időben generálódik; kérésidejű renderelés nem kerülhet bele.
export const ensureStatic = "navigation";

export const metadata = buildPrivacyMetadata("hu");

export default function Page() {
  return <PrivacyPage locale="hu" />;
}
