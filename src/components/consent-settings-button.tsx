"use client";

import { openConsentSettings } from "@/lib/analytics-consent";

/** Újranyitja a látogatottságmérés hozzájárulási sávját. */
export function ConsentSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {label}
    </button>
  );
}
