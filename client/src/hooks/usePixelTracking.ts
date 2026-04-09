/**
 * usePixelTracking — React hook for automatic scroll-based Facebook Pixel events
 * Tracks ViewContent when sections become visible + scroll depth milestones
 */
import { useEffect, useRef } from "react";
import { trackViewContent, trackScrollDepth, trackSchedule } from "@/lib/fbpixel";

type Lang = "ru" | "uz";

interface TrackedSection {
  id: string;
  name: string;
  /** Fire ViewContent when this section enters viewport */
  trackView?: boolean;
  /** Fire Schedule event (for pricing section) */
  trackSchedule?: boolean;
}

const SECTIONS: TrackedSection[] = [
  { id: "pains", name: "Pain Points", trackView: true },
  { id: "features-section", name: "6 Reasons / Features", trackView: true },
  { id: "comparison", name: "Comparison Table", trackView: true },
  { id: "reviews-section", name: "Customer Reviews", trackView: true },
  { id: "lead-form", name: "Pricing & Lead Form", trackView: true, trackSchedule: true },
  { id: "faq-section", name: "FAQ", trackView: true },
];

const SCROLL_MILESTONES = [25, 50, 75, 100];

export function usePixelTracking(lang: Lang) {
  const firedSections = useRef(new Set<string>());
  const firedScrollDepths = useRef(new Set<number>());

  useEffect(() => {
    // ── Section visibility tracking via IntersectionObserver ──
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !firedSections.current.has(section.id)) {
              firedSections.current.add(section.id);

              if (section.trackView) {
                trackViewContent(section.name, lang);
              }
              if (section.trackSchedule) {
                trackSchedule(lang);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // ── Scroll depth tracking ──
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      SCROLL_MILESTONES.forEach((milestone) => {
        if (percent >= milestone && !firedScrollDepths.current.has(milestone)) {
          firedScrollDepths.current.add(milestone);
          trackScrollDepth(milestone, lang);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lang]);
}
