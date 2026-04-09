/**
 * Facebook Pixel Event Tracking Helper
 * Pixel ID: 4451272048442169
 *
 * Standard Events used:
 * - PageView       → auto on load (in index.html)
 * - ViewContent    → user scrolls to key sections (features, comparison, pricing)
 * - Lead           → user submits the lead form
 * - Contact        → user clicks Telegram / WhatsApp / Phone
 * - InitiateCheckout → user clicks main CTA "Buy" buttons
 * - Schedule       → user views installment/payment section
 *
 * All events include:
 *   content_name, content_category, language (ru | uz), currency, value
 */

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

type Lang = "ru" | "uz";

const PIXEL_DEBUG = true;

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
    if (PIXEL_DEBUG) {
      console.log("[FB Pixel]", ...args);
    }
  } else {
    if (PIXEL_DEBUG) {
      console.warn("[FB Pixel] fbq not loaded yet, queuing:", ...args);
    }
    // Retry after a short delay in case fbevents.js hasn't loaded yet
    if (typeof window !== "undefined") {
      setTimeout(() => {
        if (typeof window.fbq === "function") {
          window.fbq(...args);
          if (PIXEL_DEBUG) {
            console.log("[FB Pixel] (delayed)", ...args);
          }
        }
      }, 2000);
    }
  }
}

// ── Standard Events ─────────────────────────────────────────────────────────

/** User views a key content section (features, comparison, reviews) */
export function trackViewContent(sectionName: string, lang: Lang) {
  fbq("track", "ViewContent", {
    content_name: sectionName,
    content_category: "landing_section",
    content_type: "product",
    content_ids: ["midea-alba-12k"],
    currency: "USD",
    value: 360,
    language: lang,
  });
}

/** User submits the lead form */
export function trackLead(lang: Lang, formData?: { name?: string }) {
  fbq("track", "Lead", {
    content_name: "Midea ALBA Lead Form",
    content_category: "lead_form",
    currency: "USD",
    value: 360,
    language: lang,
    ...(formData?.name ? { lead_name: formData.name } : {}),
  });
}

/** User clicks a contact button (Telegram, WhatsApp, Phone, Instagram) */
export function trackContact(channel: string, lang: Lang) {
  fbq("track", "Contact", {
    content_name: `Contact via ${channel}`,
    content_category: "contact",
    content_type: channel.toLowerCase(),
    language: lang,
  });
}

/** User clicks a main CTA "Buy" button */
export function trackInitiateCheckout(buttonLocation: string, lang: Lang) {
  fbq("track", "InitiateCheckout", {
    content_name: "Midea ALBA 12K BTU",
    content_category: buttonLocation,
    content_ids: ["midea-alba-12k"],
    currency: "USD",
    value: 360,
    num_items: 1,
    language: lang,
  });
}

/** User views the installment/pricing section */
export function trackSchedule(lang: Lang) {
  fbq("track", "Schedule", {
    content_name: "Installment Plan View",
    content_category: "pricing",
    currency: "USD",
    value: 30,
    language: lang,
  });
}

/** User scrolls to a specific section — custom event for funnel analysis */
export function trackCustom(eventName: string, params: Record<string, unknown> = {}) {
  fbq("trackCustom", eventName, params);
}

/** Track scroll depth milestones */
export function trackScrollDepth(percent: number, lang: Lang) {
  fbq("trackCustom", "ScrollDepth", {
    scroll_percent: percent,
    language: lang,
    content_name: "Midea ALBA Landing",
  });
}
