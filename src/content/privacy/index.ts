import { privacyEn } from "@/content/privacy/en";
import { privacyHu } from "@/content/privacy/hu";
import type { PrivacyCopy } from "@/content/privacy/types";
import type { Locale } from "@/content/types";

export const privacy: Record<Locale, PrivacyCopy> = { hu: privacyHu, en: privacyEn };
