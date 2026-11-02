"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/next";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import type { ConsentCopy } from "@/content/privacy/types";
import {
  readConsent,
  subscribeConsent,
  subscribeConsentOpen,
  writeConsent,
  type Consent,
} from "@/lib/analytics-consent";

// Visszavonás után a már betöltött szkript sem küld több eseményt.
const beforeSend: BeforeSend = (event) => (readConsent() === "granted" ? event : null);

const button =
  "inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-line-strong bg-surface px-5 py-2 text-sm font-semibold text-ink-heading transition-colors hover:border-accent hover:text-accent";

/**
 * Látogatottságmérés hozzájárulással: a Vercel Web Analytics csak elfogadás után töltődik be.
 * A sáv nem modális, a két gomb egyformán hangsúlyos, és a lábléc gombjával újranyitható.
 */
export function AnalyticsConsent({
  copy,
  privacyHref,
}: {
  copy: ConsentCopy;
  privacyHref: string;
}) {
  // A szerveren és hidratáláskor `undefined`: ekkor még sem a sáv, sem a mérés nem jelenik meg.
  const consent = useSyncExternalStore<Consent | null | undefined>(
    subscribeConsent,
    readConsent,
    () => undefined,
  );
  const [reopened, setReopened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(
    () =>
      subscribeConsentOpen(() => {
        returnFocusRef.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setReopened(true);
      }),
    [],
  );

  // Újranyitáskor a fókusz a sávra kerül, hogy billentyűzettel azonnal elérhető legyen.
  useEffect(() => {
    if (reopened) panelRef.current?.focus();
  }, [reopened]);

  function choose(next: Consent) {
    writeConsent(next);
    if (reopened) {
      setReopened(false);
      returnFocusRef.current?.focus();
    }
  }

  const showBanner = consent === null || (consent !== undefined && reopened);

  return (
    <>
      {consent === "granted" && <Analytics beforeSend={beforeSend} />}
      {showBanner && (
        <div
          ref={panelRef}
          role="region"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="card fixed inset-x-4 bottom-4 z-50 max-w-md p-5 shadow-[0_18px_50px_-24px_rgb(0_0_0/0.35)] outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-auto"
        >
          <h2 id={titleId} className="font-display text-base font-semibold text-ink-heading">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm text-ink">{copy.body}</p>
          <a
            href={privacyHref}
            className="mt-2 inline-block text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
          >
            {copy.privacyLink}
          </a>
          <div className="mt-4 flex gap-3">
            <button type="button" className={button} onClick={() => choose("granted")}>
              {copy.accept}
            </button>
            <button type="button" className={button} onClick={() => choose("denied")}>
              {copy.decline}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
