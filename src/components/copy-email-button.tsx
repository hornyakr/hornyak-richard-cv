"use client";

import { useEffect, useState } from "react";

import { useContent } from "@/components/content-provider";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function CopyEmailButton({ email }: { email: string }) {
  const { cv } = useContent();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // A vágólap nem elérhető: a mailto link továbbra is működik.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-medium text-ink-heading transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
      <span aria-live="polite">{copied ? cv.ui.copied : cv.ui.copyEmail}</span>
    </button>
  );
}
