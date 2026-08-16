/**
 * Meta Pixel hooks for the /mindshift-apply campaign page.
 *
 * No Pixel ID is hardcoded here. Once the Pixel base code is added to
 * index.html (or a tag manager), these helpers start reporting automatically.
 * Until then every call is a safe no-op.
 *
 * Events used by this funnel:
 *  - PageView        fired on landing page mount
 *  - ViewContent     fired when the visitor reaches the application section
 *  - Lead            fired when an application is submitted
 *  - QualifiedLead   fired when the application passes qualification (custom event)
 *  - Schedule        HOOK ONLY — fire from the Calendly event listener once the
 *                    real booking link is installed (see trackScheduleHook below)
 *  - Purchase        HOOK ONLY — fire server-side/after Stripe checkout when
 *                    payments are wired up (see trackPurchaseHook below)
 */

type FbqFn = (...args: unknown[]) => void;

const getFbq = (): FbqFn | null => {
  if (typeof window === "undefined") return null;
  const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
  return typeof fbq === "function" ? fbq : null;
};

export function trackStandardEvent(event: string, params?: Record<string, unknown>) {
  getFbq()?.("track", event, params);
}

export function trackCustomEvent(event: string, params?: Record<string, unknown>) {
  getFbq()?.("trackCustom", event, params);
}

export const trackPageView = () => trackStandardEvent("PageView");

export const trackViewContent = () =>
  trackStandardEvent("ViewContent", {
    content_name: "MindShift Application",
    content_category: "coaching",
  });

export const trackLead = () =>
  trackStandardEvent("Lead", { content_name: "MindShift Application" });

export const trackQualifiedLead = () =>
  trackCustomEvent("QualifiedLead", { content_name: "MindShift Application" });

/**
 * HOOK — call this from the Calendly `calendly.event_scheduled` message listener
 * once the real booking link is installed. Not fired today: no booking exists yet.
 */
export const trackScheduleHook = () => trackStandardEvent("Schedule");

/**
 * HOOK — call this after a successful Stripe payment when checkout is added.
 * Not fired today: payments are not wired up.
 */
export const trackPurchaseHook = (value: number, currency = "USD") =>
  trackStandardEvent("Purchase", { value, currency });
