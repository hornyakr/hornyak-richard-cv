"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { LanguageOption } from "@/content";
import type { CV } from "@/content/types";

type ContentContextValue = {
  cv: CV;
  languages: LanguageOption[];
};

const ContentContext = createContext<ContentContextValue | null>(null);

/** Az aktuális nyelv tartalmát adja tovább a kliens komponenseknek. */
export function ContentProvider({
  value,
  children,
}: {
  value: ContentContextValue;
  children: ReactNode;
}) {
  return <ContentContext value={value}>{children}</ContentContext>;
}

export function useContent(): ContentContextValue {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent: hiányzó ContentProvider");
  return value;
}

/** `{név}` helyőrzők kitöltése a felületi szövegekben. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
