/**
 * Captures Meta / UTM attribution data on first landing and keeps it for the
 * session so it survives multi-step form navigation and in-page anchors.
 */

export interface Attribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  fbclid: string | null;
  landingUrl: string | null;
  referrer: string | null;
}

const STORAGE_KEY = "mindshift_attribution";

const EMPTY: Attribution = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmContent: null,
  utmTerm: null,
  fbclid: null,
  landingUrl: null,
  referrer: null,
};

const clean = (value: string | null): string | null => {
  if (!value) return null;
  const trimmed = value.trim().slice(0, 500);
  return trimmed.length > 0 ? trimmed : null;
};

/**
 * Reads attribution from the URL and stores it. Values already stored from an
 * earlier page view are preserved unless the current URL carries new ones.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;

  const params = new URLSearchParams(window.location.search);

  const fromUrl: Attribution = {
    utmSource: clean(params.get("utm_source")),
    utmMedium: clean(params.get("utm_medium")),
    utmCampaign: clean(params.get("utm_campaign")),
    utmContent: clean(params.get("utm_content")),
    utmTerm: clean(params.get("utm_term")),
    fbclid: clean(params.get("fbclid")),
    landingUrl: clean(window.location.href.slice(0, 2000)),
    referrer: clean(document.referrer.slice(0, 2000)),
  };

  const hasNew = Boolean(
    fromUrl.utmSource ||
      fromUrl.utmMedium ||
      fromUrl.utmCampaign ||
      fromUrl.utmContent ||
      fromUrl.utmTerm ||
      fromUrl.fbclid,
  );

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored && !hasNew) {
      return { ...EMPTY, ...(JSON.parse(stored) as Attribution) };
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // sessionStorage may be unavailable (private mode) — attribution is best effort.
  }

  return fromUrl;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return { ...EMPTY, ...(JSON.parse(stored) as Attribution) };
  } catch {
    // ignore
  }
  return captureAttribution();
}
