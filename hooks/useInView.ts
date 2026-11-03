import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect warns/no-ops on the server; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Returns a ref and a boolean that flips to true once the element enters the
 * viewport.
 *
 * Progressive enhancement: the initial value is ALWAYS true, so the prerendered
 * HTML (what crawlers and no-JS visitors get) is fully visible, and the first
 * client render matches it exactly (required for hydration). After mount, on
 * desktop only, below-the-fold sections are hidden again and revealed by an
 * IntersectionObserver as they scroll into view — before the browser paints, so
 * there is no flash. On mobile (<768 px) or with prefers-reduced-motion nothing
 * is ever hidden.
 */
export function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useIsoLayoutEffect(() => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    // Already in the viewport on mount — keep it visible, no observer needed.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setInView(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
