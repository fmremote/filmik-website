declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type AnalyticsPayload = Record<string, unknown>;

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}

export function trackPageView(pathname: string) {
  trackEvent("page_view", {
    page_path: pathname,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}
